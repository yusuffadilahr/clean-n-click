import Loading from "@/app/_service/clientside/components/loading"
import dynamic from "next/dynamic"

const DynamicBodyRegister = dynamic(() => import('./body'), {
    loading: () => <Loading />
})

export default function Page() {
    return <DynamicBodyRegister />
}