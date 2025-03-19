'use client'

import { useToast } from "@/components/hooks/use-toast"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { registerAction } from "@/app/_service/serverside/fetchserver/registeraction"

export const useRegisterHook = () => {
    const [isDisabledSucces, setIsDisabledSucces] = useState<boolean>(false)
    const [isValuePhoneNumber, setIsValuePhoneNumber] = useState<string>('')
    const { toast } = useToast()

    const { mutate: handleRegister, isPending } = useMutation({
        mutationFn: async (fd: FormData) => {
            const response = await registerAction(fd)
            if (response?.error) throw { ...response }

            return response
        },

        onSuccess: (res) => {
            toast({
                description: res?.message,
                className: "bg-blue-500 text-white p-4 rounded-lg shadow-lg border-none"
            })

            setIsDisabledSucces(true)
        },
        onError: (err: any) => {
            toast({
                description: err?.message,
                className: "bg-red-500 text-white p-4 rounded-lg shadow-lg"
            })
        }
        /**
         * Set the state to disabled success
         */
    })

    return {
        isDisabledSucces,
        setIsDisabledSucces,
        handleRegister,
        isPending, isValuePhoneNumber, setIsValuePhoneNumber
    }
}