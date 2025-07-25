"use client";
import { ChartBarLabelCustom } from "@/components/orders/Barchart";
import { CancelledOrdersBox } from "@/components/orders/Cancelledorderbox";
import { ChartPieSimple } from "@/components/orders/Cancelledvsdelivered";
import { ChartBarMixed } from "@/components/orders/HighestLocations";
import { ChartRadarDots } from "@/components/orders/Lateandfastdeliverycounts";
import { DataTableDemo } from "@/components/orders/OrderTable";
import { FirestoreService } from "@/firebase/firestoreService";
import { getAllOrders } from "@/services/orders";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";

async function fetchUsers() {

  console.log("refetchinggg" , Date.now());
  
  return await FirestoreService.getAllDocs("Url");
}

function Orders() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    refetchOnWindowFocus : false ,
    refetchInterval: 10000

  });

  
  console.log(data);
  

  return (
    <div className="font-main">
      <h1 className="font-bold lg:text-4xl sm:text-sm">Order Analytics</h1>
      <div className="grid md:grid-cols-3 gap-4 mt-4">
        {/* Option 1: Set individual heights using wrapper divs */}

        <ChartBarLabelCustom />

        <ChartPieSimple />

        <ChartRadarDots />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div className="md:col-span-2">
          <CancelledOrdersBox />
        </div>
        <div className="md:col-span-1">
          <ChartBarMixed />
        </div>
      </div>

      <div className="font-bold mt-8">
        <h1 className="lg:text-3xl sm:text-sm">Order Table</h1>
      </div>
      <div className="mt-2">
        <DataTableDemo />
      </div>
    </div>
  );
}

export default Orders;
