import dynamic from "next/dynamic"

const DynamicBodyPickup = dynamic(() => import("./_client/components/bodyPickup"), { loading: () => null })
export default function page() {
    return <DynamicBodyPickup />
}