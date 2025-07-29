import { fetchMiddlemen } from "@/services/middlemen";
import { fetchStores } from "@/services/stores";
import { useQuery } from "@tanstack/react-query";

// Hook for stores
export function useStoresQuery() {
    return useQuery({
        queryKey: ["stores"],
        queryFn: fetchStores ,
        refetchOnWindowFocus : false ,
        refetchOnMount : false ,
        // refetchInterval : 5000
    });
}

// Hook for middlemen
export function useMiddlemenQuery() {
    return useQuery({
        queryKey: ["middlemen"],
        queryFn: fetchMiddlemen ,
        refetchOnWindowFocus : false ,
        refetchOnMount : false ,
        // refetchInterval : 5000
    });
}

