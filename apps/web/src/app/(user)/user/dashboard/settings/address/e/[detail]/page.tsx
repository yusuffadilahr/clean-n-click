import dynamic from "next/dynamic"

const DynamicBodyEditAddress = dynamic(() => import('./_client/components/bodyEditAddress'), {
    loading: () => null
})

export default function page({ params }: { params: Promise<{ detail: string }> }) {
    return <DynamicBodyEditAddress params={params} />
}