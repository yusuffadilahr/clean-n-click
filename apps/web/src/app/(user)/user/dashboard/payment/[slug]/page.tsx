import dynamic from "next/dynamic"

const DynamicBodyPayment = dynamic(() => import('./_client/components/bodyPayment'), { loading: () => null })
export default function page({ params }: { params: Promise<{ slug: string }> }) {
    return <DynamicBodyPayment params={params} />
}