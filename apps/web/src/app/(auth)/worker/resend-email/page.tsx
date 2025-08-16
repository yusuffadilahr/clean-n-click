import dynamic from "next/dynamic"

const DynamicBodyResendEmail = dynamic(() => import('./_client/components/bodyResendEmail'), { loading: () => null })

export default function page() {
    return <DynamicBodyResendEmail />
}