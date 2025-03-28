import { useState, useEffect } from "react"
import authStore from "@/zustand/authoStore"
import { instance } from "@/utils/axiosInstance"
import { useQuery, useMutation } from "@tanstack/react-query"
import { useDebouncedCallback } from "use-debounce"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { useToast } from "@/components/hooks/use-toast"


export const useAdminOutletReportHook = () => {
    const params = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const { toast } = useToast()
    const token = authStore((state) => state?.token);
    const email = authStore((state) => state?.email);

    const [page, setPage] = useState(Number(params.get("page")) || 1);
    const [searchInput, setSearchInput] = useState(params.get("search") || "");
    const [sortOption, setSortOption] = useState(params.get("sort") || "date-asc");
    const [activeTab, setActiveTab] = useState(params.get("tab") || "bermasalah");
    const [dateFrom, setDateFrom] = useState(params.get('date-from') || null);
    const [dateUntil, setDateUntil] = useState(params.get('date-until') || null);
    const [isDisableSuccess, setIsDisableSuccess] = useState<boolean>(false);
    const [isSearchValues, setIsSearchValues] = useState<string>('')
    const limit = 5

    const { data: dataOrderPackingProcess, refetch, isLoading: dataOrderPackingProcessLoading, isError: dataOrderPackingProcessError } = useQuery({
        queryKey: ['get-order', page, searchInput, page, searchInput, dateFrom, dateUntil, sortOption, activeTab],
        queryFn: async () => {
            const res = await instance.get(`/order/order-notes/`, {
                params: {
                    page,
                    limit_data: limit,
                    search: searchInput || "",
                    sort: sortOption,
                    tab: activeTab,
                    dateFrom,
                    dateUntil,

                },
                headers: { Authorization: `Bearer ${token}` }
            });
            return res?.data?.data;
        },
    });

    const { mutate: handleLaundryProblem, isPending } = useMutation({
        mutationFn: async ({ orderId, notes }: any) => {
            return await instance.patch(`/order/order-notes/${orderId}`, { notes }, {

                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        },
        onSuccess: (res: { data: { message: string } }) => {
            toast({
                description: res?.data?.message,
                className: "bg-blue-500 text-white p-4 rounded-lg shadow-lg border-none"
            })
            setIsDisableSuccess(true)
            refetch()
        },
        onError: (err: { response: { data: { message: string } } }) => {
            toast({
                description: err?.response?.data?.message,
                className: "bg-red-500 text-white p-4 rounded-lg shadow-lg"
            })
        }
    })


    const debounce = useDebouncedCallback(values => {
        setSearchInput(values)
        setPage(1)
    }, 500);

    useEffect(() => {
        const currentUrl = new URLSearchParams(params.toString());
        if (searchInput) {
            currentUrl.set(`search`, searchInput)
        } else {
            currentUrl.delete(`search`)
        }
        if (sortOption) {
            currentUrl.set("sort", sortOption);
        } else {
            currentUrl.delete(`sort`)
        }
        if (activeTab) {
            currentUrl.set("tab", activeTab);
        } else {
            currentUrl.delete(`tab`)
        }
        if (dateFrom) {
            currentUrl.set('date-from', dateFrom?.toString())
        } else {
            currentUrl.delete('date-from')
        }
        if (dateUntil) {
            currentUrl.set('date-until', dateUntil?.toString())
        } else {
            currentUrl.delete('date-until')
        }
        if (page) {
            currentUrl.set('page', page?.toString())
        } else {
            currentUrl.delete('page')
        }
        router.push(`${pathname}?${currentUrl.toString()}`)
        refetch()
    }, [searchInput, router, pathname, params, page, sortOption, activeTab, refetch, dateFrom, dateUntil]);


    const totalPages = dataOrderPackingProcess?.totalPage || 1
    const handlePageChange = (page: any) => setPage(page)

    return {
        params,
        router,
        pathname,
        token,
        isSearchValues,
        setIsSearchValues,
        page,
        setPage,
        searchInput, setSearchInput,
        sortOption, setSortOption,
        activeTab, setActiveTab,
        dateFrom, setDateFrom,
        dateUntil, setDateUntil,
        refetch,
        debounce, totalPages, limit,
        handlePageChange,
        dataOrderPackingProcess,
        dataOrderPackingProcessLoading,
        dataOrderPackingProcessError,
        handleLaundryProblem,
        isPending,
        isDisableSuccess
    }
}