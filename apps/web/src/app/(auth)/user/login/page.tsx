import Loading from "@/app/_client/components/loading";
import dynamic from "next/dynamic";

const DynamicBodyLogin = dynamic(() => import('./_client/components/body'), {
    loading: () => <Loading />
})
export default function page() {
    return <DynamicBodyLogin />
}