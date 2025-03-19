import Loading from "@/app/_service/clientside/components/loading";
import dynamic from "next/dynamic";

const DynamicBodyLogin = dynamic(() => import('./body'), {
    loading: () => <Loading />
})
export default function page() {
    return <DynamicBodyLogin />
}