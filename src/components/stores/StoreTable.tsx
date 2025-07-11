"use client"

import React, { useState } from "react"
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
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"

const dummyData = [
  {
    id: "ST001",
    name: "Fresh Mart",
    timing: "8 AM - 10 PM",
    orders: 145,
    sales: 20000,
    revenue: 16000,
    commission: 4000,
    ranking: "#3",
    prepTime: "20m",
    acceptanceRate: "95%",
    rating: "4.8",
  },
  // Add more stores here...
]

function StoreTable() {
  const [search, setSearch] = useState("")
  const [selectedStore, setSelectedStore] = useState<any>(null)
  const [showVerificationDialog, setShowVerificationDialog] = useState(false)
  const [showCreateFormDialog, setShowCreateFormDialog] = useState(false)
  const [emailToVerify, setEmailToVerify] = useState("")
  const [storeForm, setStoreForm] = useState({
    phone: "",
    storeEmail: "",
    name: "",
    category: "",
    domain: "",
    location: "",
    upi: "",
  })

  const filtered = dummyData.filter((store) =>
    store.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="w-full px-4 py-6">
      {/* Top Controls */}
      <div className="flex flex-wrap items-center justify-between pb-4 gap-4">
        <Input
          placeholder="Search store..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />

        <Button onClick={() => setShowVerificationDialog(true)}>
          Create Your Store
        </Button>
      </div>

      {/* Store Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Store ID</TableHead>
              <TableHead>Store Name</TableHead>
              <TableHead>Timing</TableHead>
              <TableHead>Orders</TableHead>
              <TableHead>Sales (₹)</TableHead>
              <TableHead>Revenue (₹)</TableHead>
              <TableHead>Commission (₹)</TableHead>
              <TableHead>Ranking</TableHead>
              <TableHead>Avg Prep Time</TableHead>
              <TableHead>Acceptance Rate</TableHead>
              <TableHead>Ratings</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length > 0 ? (
              filtered.map((store, idx) => (
                <TableRow key={idx}>
                  <TableCell>{store.id}</TableCell>
                  <TableCell>{store.name}</TableCell>
                  <TableCell>{store.timing}</TableCell>
                  <TableCell>{store.orders}</TableCell>
                  <TableCell>₹{store.sales}</TableCell>
                  <TableCell>₹{store.revenue}</TableCell>
                  <TableCell>₹{store.commission}</TableCell>
                  <TableCell>{store.ranking}</TableCell>
                  <TableCell>{store.prepTime}</TableCell>
                  <TableCell>{store.acceptanceRate}</TableCell>
                  <TableCell>{store.rating}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedStore(store)}
                    >
                      Manage
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={12} className="text-center py-6 text-muted-foreground">
                  No stores found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Sheet for managing store */}
      {selectedStore && (
        <Sheet open={!!selectedStore} onOpenChange={() => setSelectedStore(null)}>
          <SheetContent className="w-full sm:w-[400px]">
            <SheetHeader>
              <SheetTitle>Manage Store: {selectedStore.name}</SheetTitle>
            </SheetHeader>
            <div className="mt-6 space-y-6 text-sm">
              <div className="flex items-center justify-between">
                <span>Store Open</span>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <span>Block Store</span>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <span>Pause Store</span>
                <Switch />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      )}

      {/* Step 1: Email Verification Dialog */}
      <Dialog open={showVerificationDialog} onOpenChange={setShowVerificationDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Verify Email Address</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Enter your email address"
              value={emailToVerify}
              onChange={(e) => setEmailToVerify(e.target.value)}
            />
          </div>
          <DialogFooter className="mt-4">
            <Button
              onClick={() => {
                // You could do API validation here before proceeding
                setShowVerificationDialog(false)
                setShowCreateFormDialog(true)
              }}
            >
              Verify
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Step 2: Store Info Form Dialog */}
      <Dialog open={showCreateFormDialog} onOpenChange={setShowCreateFormDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Store Setup</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 gap-4">
            <Input
              placeholder="Phone Number"
              value={storeForm.phone}
              onChange={(e) => setStoreForm({ ...storeForm, phone: e.target.value })}
            />
            <Input
              placeholder="Store Email"
              value={storeForm.storeEmail}
              onChange={(e) => setStoreForm({ ...storeForm, storeEmail: e.target.value })}
            />
            <Input
              placeholder="Store Name"
              value={storeForm.name}
              onChange={(e) => setStoreForm({ ...storeForm, name: e.target.value })}
            />
            <Input
              placeholder="Store Category"
              value={storeForm.category}
              onChange={(e) => setStoreForm({ ...storeForm, category: e.target.value })}
            />
            <Input
              placeholder="Store Domain"
              value={storeForm.domain}
              onChange={(e) => setStoreForm({ ...storeForm, domain: e.target.value })}
            />
            <Input
              placeholder="Location"
              value={storeForm.location}
              onChange={(e) => setStoreForm({ ...storeForm, location: e.target.value })}
            />
            <Input
              placeholder="UPI ID"
              value={storeForm.upi}
              onChange={(e) => setStoreForm({ ...storeForm, upi: e.target.value })}
            />
          </div>
          <DialogFooter className="mt-4">
            <Button
              onClick={() => {
                // Here you could POST to backend or show confirmation
                console.log("Store Created:", storeForm)
                setShowCreateFormDialog(false)
              }}
            >
              Create Store
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default StoreTable
