import dynamic from "next/dynamic";

const DynamicBodySetLocation = dynamic(() => import('./_client/components/bodySetLocation'), { loading: () => null })
export default function page() {
    return <DynamicBodySetLocation />
}