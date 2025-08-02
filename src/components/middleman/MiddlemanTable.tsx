"use client"

import React, { useState, useMemo, useEffect } from "react"
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Calendar } from "@/components/ui/calendar"
import { Switch } from "@/components/ui/switch"
import { addDays, format, isWithinInterval, parseISO } from "date-fns"
import { DateRange } from "react-day-picker"


import { Middlemen } from "@/types/backend/models" 
import { useMiddlemenQuery } from "@/hooks/useFiresStoreQueries"

type MiddlemanInfo = {
  dob: string
  photo: string
  email: string
  dProof: string
  vehicleReg: string
  vehicleLicense: string
  bankAcc: string
  emergencyContact: string
  aadhar: string
  pan: string
}

type Middleman = {
  id: string
  name: string
  phone: string
  successfulOrders: number
  ranking: string
  rating: number
  totalAmount: number
  status: boolean
  totalEarnings: number
  info: MiddlemanInfo
}

const sampleSales = [
  {
    product: "Chicken Cheese Pizza",
    price: 179.1,
    qty: 1,
    time: "2025-07-10T19:09:00",
    location: "Mahanta Bhawan, near s...",
    payment: "Online Payment",
    orderId: "ORD001",
  },
]

function MiddlemanTable() {
  const [search, setSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [manageSheet, setManageSheet] = useState(false)
  const [salesDialog, setSalesDialog] = useState(false)
  const [selectedMiddleman, setSelectedMiddleman] = useState<Middleman | null>(null)

  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 0),
  })



  const { data: middlemenData, isLoading, error } = useMiddlemenQuery()

  const middlemen: Middleman[] = useMemo(() => {
    if (!middlemenData) return []

    console.log("Fetched Middlemen Data:", middlemenData)

    return middlemenData.map((m: Middlemen): Middleman => ({
      id: m.middlemanId,
      name: m.fullName,
      phone: m.phoneNumber,
      successfulOrders: 0, // Replace with real data if available
      ranking: "#1", // Static or calculate if needed
      rating: 4, // Static or calculate
      totalAmount: 3000, // Placeholder
      status: m.isAvailable,
      totalEarnings: m.todayEarning,
      info: {
        dob: m.dateOfBirth,
        photo: "", // Not available
        email: m.email,
        dProof: m.idProof,
        vehicleReg: m.vehicleRegistrationNumber,
        vehicleLicense: "", // Not available
        bankAcc: m.upiId,
        emergencyContact: m.emergencyContact,
        aadhar: m.idProof.includes("Aadhaar") ? m.idProof : "",
        pan: m.idProof.includes("PAN") ? m.idProof : "",
      },
    }))
  }, [middlemenData])

  const filtered = middlemen.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase())
  )

  const totalPages = Math.ceil(filtered.length / 10)
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * 10
    return filtered.slice(start, start + 10)
  }, [filtered, currentPage])

  const handleToggleStatus = (id: string) => {
    if (!middlemenData) return
    const updated = middlemen.map((m) =>
      m.id === id ? { ...m, status: !m.status } : m
    )
    setSelectedMiddleman((prev) =>
      prev?.id === id ? { ...prev, status: !prev.status } : prev
    )
  }

  const filteredSales = sampleSales.filter((sale) => {
    if (!date?.from || !date?.to) return true
    const time = parseISO(sale.time)
    return isWithinInterval(time, {
      start: date.from,
      end: date.to,
    })
  })

  if (isLoading) return <div className="p-4">Loading...</div>
  if (error) return <div className="p-4 text-red-500">Error fetching data.</div>

  return (
    <div className="p-4">
      <div className="flex items-center justify-between pb-4">
        <Input
          placeholder="Search middleman..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            setCurrentPage(1)
          }}
          className="w-64"
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Successful Orders</TableHead>
            <TableHead>Ranking</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Total Amount (₹)</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Total Earning (₹)</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginated.length ? (
            paginated.map((m) => (
              <TableRow key={m.id}>
                <TableCell>{m.id}</TableCell>
                <TableCell>{m.name}</TableCell>
                <TableCell>{m.phone}</TableCell>
                <TableCell>{m.successfulOrders}</TableCell>
                <TableCell>{m.ranking}</TableCell>
                <TableCell>{m.rating}</TableCell>
                <TableCell>₹{m.totalAmount}</TableCell>
                <TableCell>
                  <span
                    className={`text-sm font-medium px-2 py-1 rounded-full text-white ${
                      m.status ? "bg-green-600" : "bg-red-500"
                    }`}
                  >
                    {m.status ? "Active" : "Inactive"}
                  </span>
                </TableCell>
                <TableCell>₹{m.totalEarnings}</TableCell>
                <TableCell className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedMiddleman(m)
                      setManageSheet(true)
                    }}
                  >
                    Manage
                  </Button>
                  <Button
                    onClick={() => {
                      setSelectedMiddleman(m)
                      setSalesDialog(true)
                    }}
                  >
                    Track Sales
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={10} className="text-center">
                No data found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex justify-end gap-2 pt-4">
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
        >
          Next
        </Button>
      </div>

      <Sheet open={manageSheet} onOpenChange={setManageSheet}>
        <SheetContent className="w-[300px] sm:w-[540px]">
          <SheetHeader>
            <SheetTitle>Manage {selectedMiddleman?.name}</SheetTitle>
          </SheetHeader>
          {selectedMiddleman && (
            <div className="space-y-3 py-4 px-6">
              <div className="flex justify-between items-center">
                <span>Status:</span>
                <Switch
                  checked={selectedMiddleman.status}
                  onCheckedChange={() =>
                    handleToggleStatus(selectedMiddleman.id)
                  }
                />
              </div>
              <div className="text-sm space-y-1">
                <p><strong>DOB:</strong> {selectedMiddleman.info.dob}</p>
                <p><strong>Email:</strong> {selectedMiddleman.info.email}</p>
                <p><strong>D Proof:</strong> {selectedMiddleman.info.dProof}</p>
                <p><strong>Vehicle Reg No:</strong> {selectedMiddleman.info.vehicleReg}</p>
                <p><strong>Bank Account:</strong> {selectedMiddleman.info.bankAcc}</p>
                <p><strong>Emergency Contact:</strong> {selectedMiddleman.info.emergencyContact}</p>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      <Dialog open={salesDialog} onOpenChange={setSalesDialog}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Track Sales for {selectedMiddleman?.name}</DialogTitle>
          </DialogHeader>
          <div className="py-2">
            <Calendar
              mode="range"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </div>
          <div className="py-2 font-semibold">
            Total Orders: {filteredSales.length} | Total Revenue: ₹
            {filteredSales.reduce((acc, s) => acc + s.price, 0).toFixed(2)}
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Qty</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Order ID</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSales.map((sale, i) => (
                <TableRow key={i}>
                  <TableCell>{sale.product}</TableCell>
                  <TableCell>₹{sale.price}</TableCell>
                  <TableCell>{sale.qty}</TableCell>
                  <TableCell>{format(parseISO(sale.time), "hh:mm a")}</TableCell>
                  <TableCell>{sale.location}</TableCell>
                  <TableCell>
                    <span className="text-xs bg-green-700 text-white px-2 py-0.5 rounded-full">
                      {sale.payment}
                    </span>
                  </TableCell>
                  <TableCell>{sale.orderId}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default MiddlemanTable
