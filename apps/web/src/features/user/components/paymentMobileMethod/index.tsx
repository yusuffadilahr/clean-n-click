import ButtonCustom from "@/components/core/buttonCustom"
import Image from "next/image"
import { FaWallet } from "react-icons/fa6"
import { RiBankCardFill } from "react-icons/ri"
import { IPaymentMethodWeb } from "./type"

export default function PaymentMethodWeb({ isArrCardPayment, dataOrderNote, setIsPaymentMethod, isPaymentMethod, handlePaymmentOrder, setIsUploadDialogOpen, router }: IPaymentMethodWeb) {
    return (
        <div className="w-full md:w-1/2 space-y-4">
            <h1 className="font-bold text-2xl text-gray-800">Metode Pembayaran</h1>
            <div className="w-full h-fit">
                <div className="flex justify-start w-full h-fit">
                    <div className="grid grid-cols-4 h-fit gap-2">
                        {isArrCardPayment.map((img: { img: string }, i: number) => (
                            <div key={i} className='w-fit h-fit flex justify-center'>
                                <Image
                                    className='w-fit h-10'
                                    width={500}
                                    height={500}
                                    alt='card'
                                    src={img?.img}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {dataOrderNote?.order?.isPaid === false && !dataOrderNote?.order?.paymentMethod && !dataOrderNote?.order?.paymentProof ? (
                <>
                    <div className="space-y-4">
                        <label
                            htmlFor="midtrans"
                            className={`flex items-center justify-between p-4 gap-2 w-full border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${isPaymentMethod === 'midtrans' ? 'bg-blue-50 border-blue-500' : 'border-gray-300'
                                }`}
                        >
                            <div className='flex gap-3 items-center'>
                                <FaWallet className="text-lg text-gray-600" />
                                <div className="flex flex-col">
                                    <span className="text-gray-700 font-medium">Pembayaran Online</span>
                                    <span className="text-sm text-gray-500">(Verifikasi Otomatis)</span>
                                </div>
                            </div>
                            <input
                                onChange={(e) => setIsPaymentMethod(e.target.value)}
                                value='midtrans'
                                checked={isPaymentMethod === 'midtrans'}
                                type="radio"
                                name="paymentMethod"
                                id="midtrans"
                                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 focus:ring-2"
                            />
                        </label>

                        <label
                            htmlFor="manualTransfer"
                            className={`flex items-center justify-between p-4 gap-2 w-full border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${isPaymentMethod === 'manualTransfer' ? 'bg-blue-50 border-blue-500' : 'border-gray-300'
                                }`}
                        >
                            <div className='flex gap-3 items-center'>
                                <RiBankCardFill className="text-lg text-gray-600" />
                                <div className="flex flex-col">
                                    <span className="text-gray-700 font-medium">Transfer Bank</span>
                                    <span className="text-sm text-gray-500">(Verifikasi Manual Admin)</span>
                                </div>
                            </div>
                            <input
                                onChange={(e) => setIsPaymentMethod(e.target.value)}
                                value='manualTransfer'
                                checked={isPaymentMethod === 'manualTransfer'}
                                type="radio"
                                name="paymentMethod"
                                id="manualTransfer"
                                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 focus:ring-2"
                            />
                        </label>
                    </div>

                    <ButtonCustom type="button" btnColor="bg-blue-500 hover:bg-blue-500" disabled={!isPaymentMethod || dataOrderNote?.order?.laundryPrice === null || dataOrderNote?.order?.laundryPrice === 0} width="w-full" onClick={() => {
                        isPaymentMethod === 'midtrans' ? handlePaymmentOrder(dataOrderNote?.order?.id) : setIsUploadDialogOpen(true)
                    }}>Bayar sekarang</ButtonCustom>
                </>
            ) : dataOrderNote?.order?.isPaid === false && dataOrderNote?.order?.paymentMethod === 'MIDTRANS' ?
                <div className="mt-5 flex flex-col w-full justify-center text-center">
                    <div>Anda telah memilih metode Pembayaran Online</div>
                    <ButtonCustom width="w-full" btnColor="bg-blue-500" txtColor="text-white" onClick={() => router.push(`${dataOrderNote?.order?.paymentProof}`)}>Lanjutkan Pembayaran</ButtonCustom>
                </div>
                : dataOrderNote?.order?.isPaid === true && (dataOrderNote?.order?.paymentMethod === 'MIDTRANS' || dataOrderNote?.order?.paymentMethod === 'TF_MANUAL') ?
                    <div className="text-lg mt-8 border-gray-300 p-4">
                        <h1 className="font-bold">Terima kasih,</h1>
                        <p>Anda Telah Melakukan Pembayaran,</p>
                        <p>Terima kasih!</p>
                    </div>
                    : <div className="text-lg mt-8 border-gray-300 p-4">
                        <h1 className="font-bold">Terima kasih,</h1>
                        <p>Anda Telah Melakukan Pembayaran!</p>
                        <p>Menunggu Verifikasi Admin!</p>
                    </div>
            }
        </div>
    )
}