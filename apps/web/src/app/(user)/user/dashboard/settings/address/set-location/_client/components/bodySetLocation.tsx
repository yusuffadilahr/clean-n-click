'use client'

import { locationStore } from "@/zustand/locationStore";
import { Form, Formik } from "formik";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/components/hooks/use-toast";
import ButtonCustom from "@/components/core/buttonCustom";

import ContentWebLayout from "@/components/core/webSessionContent";
import MobileSessionLayout from "@/components/core/mobileSessionLayout/subMenuLayout";
import dynamic from "next/dynamic";

const MapContainer = dynamic(
    () => import('react-leaflet').then((mod) => mod?.MapContainer),
    { ssr: false }
);

const TileLayer = dynamic(
    () => import('react-leaflet').then((mod) => mod?.TileLayer),
    { ssr: false }
);

const LocationPicker = dynamic(
    () => import("@/components/core/locationPicker"),
    { ssr: false }
);

export default function BodySetLocation() {
    const latitudeGlobal = locationStore((state) => state?.latitude);
    const lngGlobal = locationStore((state) => state?.longitude);
    const setLocation = locationStore((state) => state?.setLocationUser)
    const setIsPositionCheck = locationStore((state) => state?.setIsPositionCheck)
    const [pickLocationSuccess, setIsPickLocationSuccess] = useState<boolean>(false)
    const [isClientMode, setIsClientMode] = useState<boolean>(false)

    const [isPosition, setIsPosition] = useState({ lat: latitudeGlobal || -6.200000, lng: lngGlobal || 106.816666 });
    const router = useRouter()

    useEffect(() => {
        return () => {
            if (typeof window !== 'undefined') {
                const L = require('leaflet');
                const container = L?.DomUtil.get("map-container");
                if (container != null) {
                    container._leaflet_id = null;
                }
            }
        };
    }, []);

    useEffect(() => {
        return () => {
            if (typeof window !== 'undefined') {
                const L = require('leaflet');
                const container = L?.DomUtil.get("map-container-mobile");
                if (container != null) {
                    container._leaflet_id = null;
                }
            }
        };
    }, []);

    useEffect(() => {
        setIsClientMode(true)
    }, [])

    useEffect(() => {
        setIsPosition({ lat: latitudeGlobal || -6.200000, lng: lngGlobal || 106.816666 })
    }, [latitudeGlobal, lngGlobal])

    const time = useMemo(() => new Date().getTime(), [])

    if (!isClientMode) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-gray-500">Loading...</div>
            </div>
        );
    }

    return (
        <>
            <MobileSessionLayout title='Pilih Alamat'>
                <div className='w-full h-96 flex pb-5'>
                    <Formik
                        onSubmit={(values) => {
                            setLocation({
                                latitude: Number(values?.latitude) || isPosition?.lat,
                                longitude: Number(values?.longitude) || isPosition?.lng
                            })
                            try {
                                toast({
                                    description: 'Berhasil memilih alamat terkini',
                                    className: "bg-blue-500 text-white p-4 rounded-lg shadow-lg"
                                })

                                setIsPositionCheck(true)
                                setIsPickLocationSuccess(true)
                                router.back()
                            } catch (error) {
                                toast({
                                    description: 'Gagal memilih alamat terkini',
                                    className: "bg-red-500 text-white p-4 rounded-lg shadow-lg"
                                })

                                setIsPositionCheck(false)
                                setIsPickLocationSuccess(false)
                            }
                        }}

                        initialValues={{
                            latitude: "",
                            longitude: "",
                        }}>
                        {({ setFieldValue, values, handleChange }) => (
                            <Form className="flex gap-5 h-[85%] w-full justify-center">
                                <div className="h-full w-full space-y-2">
                                    <MapContainer id="map-container-mobile" key={time} center={isPosition} zoom={13} className="w-full h-full rounded-2xl">
                                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                        <LocationPicker setFieldValue={setFieldValue} position={isPosition} setPosition={setIsPosition} />
                                    </MapContainer>
                                    <ButtonCustom disabled={pickLocationSuccess} width="w-full" btnColor="bg-orange-500 hover:bg-orange-600" txtColor="text-white" type="submit">
                                        Tambah Alamat
                                    </ButtonCustom>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </MobileSessionLayout>
            <ContentWebLayout caption='Pilih Alamat' height="h-full">
                <div className='w-full h-full flex pb-5'>
                    <Formik
                        onSubmit={(values) => {
                            setLocation({
                                latitude: Number(values?.latitude) || isPosition?.lat,
                                longitude: Number(values?.longitude) || isPosition?.lng
                            })
                            try {
                                toast({
                                    description: 'Berhasil memilih alamat terkini',
                                    className: "bg-blue-500 text-white p-4 rounded-lg shadow-lg"
                                })

                                setIsPositionCheck(true)
                                setIsPickLocationSuccess(true)
                                router.back()
                            } catch (error) {
                                toast({
                                    description: 'Gagal memilih alamat terkini',
                                    className: "bg-red-500 text-white p-4 rounded-lg shadow-lg"
                                })

                                setIsPositionCheck(false)
                                setIsPickLocationSuccess(false)
                            }
                        }}

                        initialValues={{
                            latitude: "",
                            longitude: "",
                        }}>
                        {({ setFieldValue, values, handleChange }) => (
                            <Form className="flex gap-5 h-[85%] w-full justify-center">
                                <div className="h-full w-full space-y-2">
                                    <MapContainer id="map-container" key={time} center={isPosition} zoom={13} className="w-full h-full rounded-2xl">
                                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                        <LocationPicker setFieldValue={setFieldValue} position={isPosition} setPosition={setIsPosition} />
                                    </MapContainer>
                                    <ButtonCustom disabled={pickLocationSuccess} width="w-full" btnColor="bg-orange-500 hover:bg-orange-600" txtColor="text-white" type="submit">
                                        Tambah Alamat
                                    </ButtonCustom>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </ContentWebLayout>
        </>
    );
}