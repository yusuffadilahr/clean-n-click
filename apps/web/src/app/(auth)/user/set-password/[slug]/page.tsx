import dynamic from "next/dynamic"
import { IParamsType } from "./_client/types"

const DynamicBodySetPassword = dynamic(() => import('./_client/components/bodySetPassword'), {
    loading: () => null
})

export default async function page({ params }: { params: Promise<IParamsType> }) {
    return <DynamicBodySetPassword params={params} />
}