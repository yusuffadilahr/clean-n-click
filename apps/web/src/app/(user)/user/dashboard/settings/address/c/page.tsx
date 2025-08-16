import dynamic from "next/dynamic"

const DynamicBodyCreateAddress = dynamic(() => import('./_client/components/bodyCreateAddress'), {
    loading: () => null
})

export default function page() {
    return <DynamicBodyCreateAddress />
}