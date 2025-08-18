import dynamic from "next/dynamic"

const DynamicBodyAboutUs = dynamic(() => import('./_client/components/bodyAboutUs'), { loading: () => null })
export default function page() {
    return <DynamicBodyAboutUs />
}