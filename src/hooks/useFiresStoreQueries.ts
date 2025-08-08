import { fetchBlogs } from "@/services/blogs";
import { fetchCampaigns } from "@/services/campaings";
import { fetchCustomers } from "@/services/customers";
import {  fetchPendingCreators, fetchVerifiedCreators } from "@/services/hiveCreators";
import { fetchMiddlemen } from "@/services/middlemen";
import { fetchOrders } from "@/services/orders";
import { fetchProducts } from "@/services/products";
import { fetchStores } from "@/services/stores";
import { fetchUsers } from "@/services/users";
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

// Hook for users
export function useUsersQuery() {
    return useQuery({
        queryKey: ["users"],
        queryFn: fetchUsers ,
        refetchOnWindowFocus : false ,
        refetchOnMount : false ,
        // refetchInterval : 5000
    });
}


// Hook for products
export function useProductsQuery() {
    return useQuery({
        queryKey: ["products"],
        queryFn: fetchProducts ,
        refetchOnWindowFocus : false ,
        refetchOnMount : false ,
        // refetchInterval : 5000
    });
}

// Hook for customers
export function useCustomersQuery() {
    return useQuery({
        queryKey: ["customers"],
        queryFn: fetchCustomers ,
        refetchOnWindowFocus : false ,
        refetchOnMount : false ,
        // refetchInterval : 5000
    });
}

// Hook for orders
export function useOrdersQuery() {
    return useQuery({
        queryKey: ["orders"],
        queryFn: fetchOrders ,
        refetchOnWindowFocus : false ,
        refetchOnMount : false ,
        refetchInterval : 5000
    });
}


// Hook for campaigns
export function useCampaignsQuery() {
    return useQuery({
        queryKey: ["campaigns"],
        queryFn: fetchCampaigns ,
        refetchOnWindowFocus : false ,
        refetchOnMount : false ,
        // refetchInterval : 5000
    });
}

// Hook for pending hivecreators
export function usePendingCreatorsQuery() {
    return useQuery({
        queryKey: ["pendingCreators"],
        queryFn: fetchPendingCreators ,
        refetchOnWindowFocus : false ,
        refetchOnMount : false ,
        // refetchInterval : 5000
    });
}


// Hook for pending hivecreators
export function useVerifiedCreatorsQuery() {
    return useQuery({
        queryKey: ["verifiedCreators"],
        queryFn: fetchVerifiedCreators ,
        refetchOnWindowFocus : false ,
        refetchOnMount : false ,
        // refetchInterval : 5000
    });
}






