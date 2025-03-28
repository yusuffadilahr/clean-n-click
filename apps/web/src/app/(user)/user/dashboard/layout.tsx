'use client'

import { instance } from "@/utils/axiosInstance";
import authStore from "@/zustand/authoStore";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useState } from "react";
import Cookies from 'js-cookie'
import { FaDashcube, FaSignOutAlt, FaUserCheck } from "react-icons/fa";
import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";
import { toast } from "@/components/hooks/use-toast";
import { ConfirmAlert } from "@/components/core/confirmAlertCustom";
import { FaAddressCard, FaCartShopping, FaTruck } from "react-icons/fa6";

const profilePict: string | undefined = process.env.NEXT_PUBLIC_PHOTO_PROFILE as string
export default function Layout({ children }: { children: ReactNode }) {
    const [isClose, setIsClose] = useState<boolean>(false)
    const profilePicture = authStore((state) => state?.profilePicture)
    const role = authStore((state) => state?.role)
    const name = authStore((state) => state?.firstName)
    const email = authStore((state) => state?.email)
    const token = authStore((state) => state?.token)
    const resetAuth = authStore((state) => state?.resetAuth)
    const [isDisabledSucces, setIsDisabledSucces] = useState<boolean>(false)
    const router = useRouter()
    const pathname = usePathname()

    const handleCloseSideBar = () => setIsClose(!isClose)
    const { mutate: handleLogoutAdmin, isPending } = useMutation({
        mutationFn: async () => {
            return await instance.post('/auth/user/logout', { email }, { headers: { Authorization: `Bearer ${token}` } })
        },
        onSuccess: (res) => {
            if (res) {
                Cookies.remove('__rolx')
                Cookies.remove('__toksed')
                resetAuth()

                toast({
                    description: res?.data?.message,
                    className: "bg-blue-500 text-white p-4 rounded-lg shadow-lg border-none"
                })

                setIsDisabledSucces(true)

                window.location.href = '/user/login'
            }
        },
        onError: (err: { response: { data: { message: string } } }) => {
            toast({
                description: err?.response?.data?.message,
                className: "bg-red-500 text-white p-4 rounded-lg shadow-lg border-none"
            })
        }
    })

    return (
        <main className="w-full h-fit md:h-screen bg-white md:flex flex-none">
            <section className={`w-3/12 h-full hidden md:flex bg-white ${isClose ? 'md:hidden' : 'animate-fade-right md:flex'} flex-col px-2 text-white`}>
                <div className="h-fit py-10 gap-5 flex justify-start px-5 items-center w-full">
                    <div className="w-12 h-12 rounded-full">
                        <Image
                            src={profilePicture?.includes('https://') ? profilePicture : profilePicture?.startsWith('images-') ? `http://localhost:5000/api/src/public/images/${profilePicture}` : profilePict}
                            width={600}
                            height={600}
                            alt="user-profile"
                            className="w-12 h-12 object-cover rounded-full border-[1px] border-white"
                        />
                    </div>
                    <div className="flex flex-col text-base text-neutral-700">
                        <h1 className="font-bold">{name?.length > 10 ? name?.slice(0, 10) : name || 'Andi'}</h1>
                        <h1 className="italic text-[11px]">{role || 'CUSTOMER'}</h1>
                    </div>
                </div>
                <h1 className="px-4 text-sm text-neutral-600 py-2">Menu</h1>
                <div className="w-full h-fit pb-3 flex flex-col gap-4">
                    <Link href='/user/dashboard/home' className={`w-full flex ${pathname.startsWith('/user/dashboard/home') ? 'bg-orange-500 text-white' : 'hover:text-white text-neutral-700 hover:bg-orange-500'} items-center gap-2 py-2 rounded-full px-4`}>
                        <FaDashcube /> Dashboard</Link>
                    <Link href='/user/dashboard/pickup' className={`w-full flex ${pathname.startsWith('/user/dashboard/pickup') ? 'bg-orange-500 text-white' : 'hover:text-white text-neutral-700 hover:bg-orange-500'} items-center gap-2 py-2 rounded-full px-4`}>
                        <FaTruck /> Permintaan Pickup</Link>
                    <Link href='/user/dashboard/order' className={`w-full flex ${pathname.startsWith('/user/dashboard/order') || pathname.startsWith('/user/dashboard/payment') ? 'bg-orange-500 text-white' : 'hover:text-white text-neutral-700 hover:bg-orange-500'} items-center gap-2 py-2 rounded-full px-4`}>
                        <FaCartShopping /> Pesanan</Link>
                    <Link href='/user/dashboard/settings/address' className={`w-full flex ${pathname.startsWith('/user/dashboard/settings/address') ? 'bg-orange-500 text-white' : 'hover:text-white text-neutral-700 hover:bg-orange-500'} items-center gap-2 py-2 rounded-full px-4`}>
                        <FaAddressCard /> Alamat</Link>
                </div>
                <h1 className="px-4 text-sm text-neutral-600 py-2">Account</h1>
                <div className="w-full h-full flex flex-col gap-4">
                    <Link href='/user/dashboard/settings' className={`w-full flex ${pathname.startsWith('/user/dashboard/settings') && !pathname.startsWith('/user/dashboard/settings/address') ? 'bg-orange-500 text-white' : 'hover:text-white text-neutral-700 hover:bg-orange-500'} items-center gap-2 py-2 rounded-full px-4`}>
                        <FaUserCheck /> Pengaturan</Link>
                    <ConfirmAlert caption="Apakah anda yakin ingin logout?" onClick={() => handleLogoutAdmin()} disabled={isPending || isDisabledSucces}>
                        <span className={`w-full cursor-pointer flex items-center gap-2 hover:text-white text-neutral-700 hover:bg-orange-500 py-2 rounded-full px-4`}>
                            <FaSignOutAlt /> Logout</span>
                    </ConfirmAlert>
                </div>
            </section>
            <section className="w-full h-fit md:h-screen md:bg-white bg-opacity-40 md:px-1 md:py-1 relative">
                <span onClick={handleCloseSideBar} className="absolute cursor-pointer hover:shadow-xl top-14 left-14 z-20 text-white">
                    {isClose ? <GoSidebarCollapse /> : <GoSidebarExpand />}
                </span>
                {children}
            </section>
        </main>
    );
}