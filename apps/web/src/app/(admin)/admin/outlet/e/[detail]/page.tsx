import dynamic from "next/dynamic"

const DynamicBodyEditOutlet = dynamic(() => import('./_client/components/bodyEditOutlet'), { loading: () => null })
export default function page({ params }: { params: Promise<{ detail: string }> }) {
    return <DynamicBodyEditOutlet params={params} />
}