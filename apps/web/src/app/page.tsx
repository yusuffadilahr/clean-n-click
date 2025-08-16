import dynamic from "next/dynamic"

const DynamicBodyLandingComponent = dynamic(() => import('@/app/_service/clientside/components/bodyLandingComponent'), {
  loading: () => null
})

export default function page() {
  return <DynamicBodyLandingComponent />
}