import dynamic from "next/dynamic"

const DynamicBodyOutlet = dynamic(() => import('./_client/components/bodyOutlet'), { loading: () => null })
export default function page() {
    return <DynamicBodyOutlet />
}