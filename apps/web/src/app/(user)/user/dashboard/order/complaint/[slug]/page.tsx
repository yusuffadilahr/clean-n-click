import dynamic from "next/dynamic"

const DynamicBodyComplaint = dynamic(() => import('./_client/components/bodyComplaint'), {
    loading: () => null
})

export default function page({ params }: { params: Promise<{ slug: string }> }) {
    return <DynamicBodyComplaint params={params} />
}