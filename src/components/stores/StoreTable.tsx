"use client"

import React, { useState, useMemo } from "react"
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
import { useStoresQuery } from "@/hooks/useFiresStoreQueries"
import {Store} from '@/types/backend/models'

const ITEMS_PER_PAGE = 10

function StoreTable() {
  const [search, setSearch] = useState("")
  const [selectedStore, setSelectedStore] = useState<Store | null>(null)
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
  const [currentPage, setCurrentPage] = useState(1)

  const { data: storesData = [], isLoading } = useStoresQuery()

  console.log(storesData)

  const filtered = useMemo(() => {
    return storesData.filter((store) =>
      store.name.toLowerCase().includes(search.toLowerCase())
    )
  }, [storesData, search])

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginatedData = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  return (
    <div className="w-full px-4 py-6">
      {/* Top Controls */}
      <div className="flex flex-wrap items-center justify-between pb-4 gap-4">
        <Input
          placeholder="Search store..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            setCurrentPage(1)
          }}
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
              <TableHead>Category</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-6">
                  Loading...
                </TableCell>
              </TableRow>
            ) : paginatedData.length > 0 ? (
              paginatedData.map((store, idx) => (
                <TableRow key={idx}>
                  <TableCell>{store.storeId}</TableCell>
                  <TableCell>{store.name}</TableCell>
                  <TableCell>{store.category}</TableCell>
                  <TableCell>{store.phone}</TableCell>
                  <TableCell>{store.email}</TableCell>
                  <TableCell>{store.location}</TableCell>
                  <TableCell>
                    {store.isBlocked
                      ? "Blocked"
                      : store.isPaused
                      ? "Paused"
                      : store.isActive
                      ? "Active"
                      : "Inactive"}
                  </TableCell>
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
                <TableCell colSpan={8} className="text-center py-6 text-muted-foreground">
                  No stores found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <Button variant="outline" onClick={() => setCurrentPage(p => p - 1)} disabled={currentPage === 1}>
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </span>
          <Button variant="outline" onClick={() => setCurrentPage(p => p + 1)} disabled={currentPage === totalPages}>
            Next
          </Button>
        </div>
      )}

      {/* Store Management Sheet */}
      {selectedStore && (
        <Sheet open={!!selectedStore} onOpenChange={() => setSelectedStore(null)}>
          <SheetContent className="w-full sm:w-[400px]">
            <SheetHeader>
              <SheetTitle>Manage Store: {selectedStore.name}</SheetTitle>
            </SheetHeader>
            <div className="mt-6 space-y-6 text-sm px-7">
              <div className="flex items-center justify-between">
                <span>Store Open</span>
                <Switch defaultChecked={selectedStore.isActive} />
              </div>
              <div className="flex items-center justify-between">
                <span>Block Store</span>
                <Switch defaultChecked={selectedStore.isBlocked} />
              </div>
              <div className="flex items-center justify-between">
                <span>Pause Store</span>
                <Switch defaultChecked={selectedStore.isPaused} />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      )}

      {/* Email Verification Dialog */}
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
                setShowVerificationDialog(false)
                setShowCreateFormDialog(true)
              }}
            >
              Verify
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Store Creation Form Dialog */}
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
