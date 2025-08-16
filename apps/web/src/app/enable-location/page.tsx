import dynamic from "next/dynamic"

const DynamicBodyEnableLoc = dynamic(() => import('./_client/components/bodyEnable'), {
    loading: () => null
})

export default function page() {
    return <DynamicBodyEnableLoc />
}