import Loading from "@/app/_client/components/loading"
import dynamic from "next/dynamic"

const DynamicBodyRegister = dynamic(() => import('./_client/components/bodyLogin'), {
    loading: () => <Loading />
})

export default function Page() {
    return <DynamicBodyRegister />
}