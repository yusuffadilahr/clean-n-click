'use client'

import { ReactNode, useEffect } from "react";
import { locationStore } from '@/zustand/locationStore'
import { useGeolocated } from "react-geolocated";
import { instance } from "@/utils/axiosInstance";
import authStore from "@/zustand/authoStore";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import CryptoJS from 'crypto-js'

const secret_key_crypto = process.env.NEXT_PUBLIC_CRYPTO_SECRET_KEY || ''
export default function AuthProviders({ children }: { children: ReactNode }) {
    const setLocationUser = locationStore((state) => state?.setLocationUser)
    const router = useRouter()

    // const latitude = locationStore((state) => state?.latitude)
    // const longitude = locationStore((state) => state?.longitude)
    const token = authStore((state) => state?.token)
    const setKeepAuth = authStore((state) => state?.setKeepAuth)
    // const [dataUser, setDataUser] = useState<string>('')

    const { coords } = useGeolocated({
        positionOptions: {
            enableHighAccuracy: true,
        },
        userDecisionTimeout: 10000,
    });

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    console.log(position, '<< posi')
                    setLocationUser({
                        latitude: position?.coords?.latitude,
                        longitude: position?.coords?.longitude
                    })

                    const accept = CryptoJS.AES.encrypt('accept', secret_key_crypto).toString()
                    Cookies.set('_DNL', accept)
                },
                (error) => {
                    switch (error.code) {
                        case 1: // PERMISSION_DENIED
                            Cookies.set('_DNL', CryptoJS.AES.encrypt('denied', secret_key_crypto).toString());
                            router.push('/enable-location');
                            break;

                        case 2: // POSITION_UNAVAILABLE
                            // Bisa retry atau kasih instruksi nyalakan GPS
                            router.push('/location-unavailable');
                            break;

                        case 3:
                            setTimeout(() => {
                                window.location.reload();
                            }, 2000);
                            break;

                        default:
                            router.push('/not-found');
                    }
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0
                }
            );
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }, [])

    useEffect(() => {
        const handleKeepAuth = async () => {
            try {
                const response = await instance.get('/auth/keep-auth', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

                if (response?.data?.data?.role == 'CUSTOMER') {
                    setKeepAuth({
                        email: response?.data?.data?.email,
                        firstName: response?.data?.data?.firstName,
                        isDiscountUsed: response?.data?.data?.isDiscountUsed,
                        isVerify: response?.data?.data?.isVerify,
                        lastName: response?.data?.data?.lastName,
                        profilePicture: response?.data?.data?.profilePicture,
                        role: response?.data?.data?.role
                    })
                } else if (response?.data?.data?.role == 'SUPER_ADMIN') {
                    setKeepAuth({
                        firstName: response?.data?.data?.firstName,
                        lastName: response?.data?.data?.lastName,
                        profilePicture: response?.data?.data?.profilePicture,
                        role: response?.data?.data?.role,
                        totalWorker: response?.data?.data?.totalWorker,
                        orders: response?.data?.data?.orders,
                        email: response?.data?.data?.email,
                        store: response?.data?.data?.store
                    })
                } else {
                    setKeepAuth({
                        firstName: response?.data?.data?.firstName,
                        lastName: response?.data?.data?.lastName,
                        profilePicture: response?.data?.data?.profilePicture,
                        role: response?.data?.data?.role,
                        email: response?.data?.data?.email,
                        store: response?.data?.data?.store
                    })
                }

            } catch (error) { }
        }

        if (token) {
            handleKeepAuth()
        }

    }, [token])

    // useEffect(() => {
    //     const getLocation = async (): Promise<void> => {
    //         try {
    //             const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${latitude?.toString()}&lon=${longitude?.toString()}&format=json`)
    //             setDataUser(response?.data?.display_name)
    //         } catch (error) { }
    //     }

    //     if (latitude && longitude) {
    //         getLocation()
    //     }

    // }, [latitude, longitude])

    return (
        <>
            {children}
        </>
    );
}