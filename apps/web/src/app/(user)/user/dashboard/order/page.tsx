import dynamic from "next/dynamic";

const DynamicBodyOrder = dynamic(() => import('./_client/components/bodyOrder'), { loading: () => null })
export default function page() {
    return <DynamicBodyOrder />
}