import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export function useRouteChanging() {
    const [path, setPath] = useState<string |
    null>(null)

    const router = useRouter()

    useEffect(() => {
        const handleStart = (url: string, test: any) => {
            setPath(url)
        }
        const handleComplete = () => {
            setPath(null)
        }
        
        router.events.on("routeChangeStart", handleStart)
        router.events.on("routeChangeComplete", handleComplete)
        router.events.on("routeChangeError", handleComplete)

        return () => {
            router.events.off("routeChangeStart", handleStart)
            router.events.off("routeChangeComplete", handleComplete)
            router.events.off("routeChangeError", handleComplete)
        }
    }, [router])

    return {
        path: path?.toLowerCase()?.trim()
    }
}