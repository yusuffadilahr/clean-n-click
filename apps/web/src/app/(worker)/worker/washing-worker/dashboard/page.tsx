import dynamic from "next/dynamic"

const DynamicBodyDashboard = dynamic(() => import('./_client/components/bodyDashboard'), { loading: () => null })
export default function page() {
    return <DynamicBodyDashboard />
}