import dynamic from "next/dynamic"

const DynamicBodyContact = dynamic(() => import('./_client/components/bodyContact'), { loading: () => null })
export default function page() {
    return <DynamicBodyContact />
}