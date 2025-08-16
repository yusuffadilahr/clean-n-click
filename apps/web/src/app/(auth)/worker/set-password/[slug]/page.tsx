import { IParamsType } from "./_client/types"
import dynamic from "next/dynamic"

const DynamicBodySetPassword = dynamic(() => import('./_client/components/bodySetPassword'), {
    loading: () => null
})

export default function page({params}: {params: Promise<IParamsType>}) {
    return <DynamicBodySetPassword params={params} />
}