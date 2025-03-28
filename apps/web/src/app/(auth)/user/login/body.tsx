'use client'

import { ErrorMessage, Field, Form, Formik } from "formik";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Image from "next/image";
import ButtonCustom from "@/components/core/buttonCustom";
import { FaGoogle, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa6";
import { useLoginUserHook } from "@/features/user/hooks/useLoginUserHook";
import { loginUserValidationSchema } from "@/features/user/schemas/loginUserValidationSchema";

export default function Page() {
    const { passwordVisible,
        isDisabledSucces,
        togglePasswordVisibility,
        handleLoginUser,
        isPending,
        loginWithGoogle } = useLoginUserHook()

    return (
        <main className='w-full h-screen md:flex'>
            <section className='w-full md:w-3/5 hidden md:block h-full py-2 pl-2'>
                <div className='bg-blue-700 rounded-2xl p-10 h-full w-full relative'>
                    <div className="flex flex-col h-full w-full">
                        <div className="w-full flex items-center">
                            <Image width={500} height={500} alt="logo" src='/images/logo-no-text.png' className="w-fit h-16 object-cover" />
                            <h1 className="font-semibold flex items-start text-orange-300">CLEAN&CLICK</h1>
                        </div>
                        <div className="h-full w-full flex items-end font-sans font-normal">
                            <p className="text-white text-sm">&copy; 2024. Clean&Click. All right reserved</p>
                        </div>
                    </div>
                    <div className="inset-0 absolute w-full flex-col h-full p-10 flex justify-center">
                        <h1 className="text-base md:text-xl lg:text-4xl text-white font-semibold font-sans">
                            Layanan Laundry Modern dan Efisien Bersama <span className='text-orange-400 font-bold'>Clean&Click</span>
                        </h1>
                        <p className="text-neutral-200 mt-4 font-sans">
                            Nikmati kemudahan mencuci pakaian tanpa ribet!
                            Clean&Click siap membantu Anda dengan layanan cepat, bersih, dan terpercaya.
                        </p>
                    </div>
                </div>
            </section>
            <section className='w-full h-full bg-white lg:p-10 relative'>
                <div className="relative h-full w-full">
                    <div className="w-full h-full absolute hidden md:flex flex-col">
                        <div className="w-full z-20 flex items-end opacity-40 justify-end h-full gap-3">
                            <Link href='/' className="font-bold text-3xl md:text-4xl"><FaInstagram /> </Link>
                            <Link href='/' className="font-bold text-3xl md:text-4xl"><FaLinkedin /> </Link>
                            <Link href='/' className="font-bold text-3xl md:text-4xl"><FaTwitter /> </Link>
                        </div>
                    </div>

                    <div className="flex z-50 flex-col absolute inset-0 h-full px-10 items-center justify-center w-full bg-white md:bg-transparent">
                        <div className="absolute inset-0 bg-gray-200/50 backdrop-blur-md rounded-3xl lg:hidden"></div>
                        <Image
                            src='/images/register.jpg'
                            alt="resgister"
                            // width={960}
                            // height={1080}
                            objectFit="cover"
                            objectPosition="left"
                            layout="fill"
                            className="lg:hidden  blur-sm"
                        />
                        <div className="absolute inset-0 flex flex-col px-10 items-center justify-center z-10">
                            <div className="relative z-10 flex flex-col w-full p-6 space-y-4 rounded-2xl md:rounded-none bg-white md:bg-transparent shadow-md md:shadow-none">
                                <div className="pb-5 z-20 w-full flex flex-col justify-start">
                                    <h1 className="font-bold text-neutral-800 text-xl md:text-4xl">Selamat Datang Kembali</h1>
                                    <p className="text-neutral-500 mt-2 text-sm md:text-lg">Masuk untuk mengakses akun Anda dan menikmati semua fitur.</p>
                                </div>
                                <Formik
                                    initialValues={{ email: '', password: '' }}
                                    validationSchema={loginUserValidationSchema}
                                    onSubmit={(values) => {
                                        const fd = new FormData()
                                        
                                        fd.append('email', values.email)
                                        fd.append('password', values.password)
                                        handleLoginUser(fd)
                                    }}>
                                    {({ setFieldValue, values }) => (
                                        <Form className="flex z-20 flex-col justify-center items-center w-full space-y-4">
                                            <div id="emailOrganizer-input" className="w-full">
                                                <div className="flex gap-2 lg:gap-5 items-center">
                                                    <label className="text-sm lg:text-base">
                                                        Email <span className="text-red-500">*</span>
                                                    </label>
                                                    <ErrorMessage
                                                        name="email"
                                                        component="div"
                                                        className="text-red-500 text-xs lg:text-sm mt-1"
                                                    />
                                                </div>
                                                <Field
                                                    name="email"
                                                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border focus:border-orange-500 text-sm pr-10"
                                                    placeholder="example@gmail.com"
                                                    type="email"
                                                />
                                            </div>

                                            <div id="password-input" className="relative w-full">
                                                <div className="flex gap-2 lg:gap-5 items-center">
                                                    <label className="text-sm lg:text-base">
                                                        Password <span className="text-red-500">*</span>
                                                    </label>
                                                    <ErrorMessage
                                                        name="password"
                                                        component="div"
                                                        className="text-red-500 text-xs lg:text-sm mt-1"
                                                    />
                                                </div>
                                                <Field
                                                    name="password"
                                                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border focus:border-orange-500 text-sm pr-10"
                                                    placeholder="******"
                                                    type={passwordVisible ? 'text' : 'password'}
                                                />
                                                <span
                                                    className="absolute right-3 transform -translate-y-7 flex items-center cursor-pointer text-gray-500"
                                                    onClick={togglePasswordVisibility}>
                                                    {passwordVisible ? <FaEye /> : <FaEyeSlash />}
                                                </span>
                                            </div>

                                            <ButtonCustom disabled={isPending || isDisabledSucces || !values?.email || !values?.password} type="submit" btnColor="bg-blue-600 hover:bg-blue-500" width="w-full">
                                                {isPending ? 'Memproses..' : 'Masuk'}
                                            </ButtonCustom>
                                        </Form>
                                    )}
                                </Formik>

                                <div className="flex w-full flex-col gap-2 py-3 z-20">
                                    <ButtonCustom onClick={loginWithGoogle} disabled={isPending || isDisabledSucces}
                                        type="submit" btnColor="bg-black hover:bg-black" width="w-full flex gap-3 items-center">
                                        <FaGoogle /> {isPending ? 'Memproses..' : 'Masuk dengan Google'}
                                    </ButtonCustom>

                                    <div className="md:flex w-full md:justify-between items-center">
                                        <div className="flex items-center gap-1 text-sm">
                                            <h1 className="">Belum memiliki akun?</h1>
                                            <Link href='/user/register' className="text-blue-500 hover:text-blue-700 hover:underline">Register</Link>
                                        </div>
                                        <Link href={'/user/resend-email'} className="text-sm text-blue-500 hover:underline">
                                            Atur ulang kata sandi?
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}