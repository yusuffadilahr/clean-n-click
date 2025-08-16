import dynamic from "next/dynamic"

const DynamicBodyAddress = dynamic(() => import('./_client/components/bodyAddress'), {
    loading: () => null
})

export default function page() {
    return <DynamicBodyAddress />
}