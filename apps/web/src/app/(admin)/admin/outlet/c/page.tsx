import dynamic from "next/dynamic"

const DynamicBodyCreateOutlet = dynamic(() => import('./_client/components/bodyCreateOutlet'), { loading: () => null })
export default function page() {
    return <DynamicBodyCreateOutlet />
}