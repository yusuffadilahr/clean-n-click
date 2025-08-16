import dynamic from "next/dynamic"

const DynamicBodyLogin = dynamic(() => import('./_client/components/bodyLogin'), { loading: () => null })
export default function page() {
    return <DynamicBodyLogin />
}