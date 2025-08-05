"use client"

import React, { useState, useEffect,useMemo } from "react"

import Image from "next/image"
import { ColumnDef } from "@tanstack/react-table"
import type { SortingState } from "@tanstack/react-table"
import { useDebounce } from "@/hooks/useDebounce"
import { Input } from "@/components/ui/input"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"

import dynamic from "next/dynamic"

const AddCampaignDialog = dynamic(() => import("./AddCampaignDialog"), {
  ssr: false,
  loading: () => <p className="text-sm text-muted-foreground">Loading...</p>,
})


type Product = {
  id: string
  name: string
  image: string
  variants: ("Half" | "Full")[]
  prices: {
    Half: { price: number; mrp: number }
    Full: { price: number; mrp: number }
  }
  available: boolean
  createdAt: string
  updatedAt: string
  cuisine: string
  type:string
}


const products: Product[] = [
  {
    id: "1",
    name: "Paneer Butter Masala",
    image: "/Butter_Paneer_LEAD_1-2-2.jpg",
    variants: ["Half", "Full"],
    prices: {
      Half: { price: 120, mrp: 150 },
      Full: { price: 200, mrp: 240 },
    },
    available: true,
    createdAt: "2025-07-20T10:00:00Z",
    updatedAt: "2025-07-22T09:00:00Z",
    cuisine: "North Indian",
    type:"Non-veg"
  },
  {
    id: "2",
    name: "Paneer Butter Masala",
    image: "/Butter_Paneer_LEAD_1-2-2.jpg",
    variants: ["Half", "Full"],
    prices: {
      Half: { price: 120, mrp: 150 },
      Full: { price: 200, mrp: 240 },
    },
    available: true,
    createdAt: "2025-07-20T10:00:00Z",
    updatedAt: "2025-07-22T09:00:00Z",
    cuisine: "North Indian",
    type:"Non-veg"
  },
]


export default function ProductTable() {
  const [previewImage, setPreviewImage] = useState<string | null>(null)
const [sorting, setSorting] = useState<SortingState>([])
 const [searchInput, setSearchInput] = useState("")
  const debouncedSearch = useDebounce(searchInput, 500)

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(debouncedSearch.toLowerCase())
    )
  }, [debouncedSearch])


  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })


  const [selectedVariants, setSelectedVariants] = useState<Record<string, "Half" | "Full">>(
  Object.fromEntries(products.map((p) => [p.id, "Half"]))
)


  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: "image",
      header: "Photo",
      cell: ({ row }) => (
        <Dialog>
          <DialogTrigger asChild>
            <Image
              src={row.original.image}
              alt={row.original.name}
              width={40}
              height={40}
              className="rounded-full object-cover cursor-pointer"
              onClick={() => setPreviewImage(row.original.image)}
            />
          </DialogTrigger>
          <DialogContent className="max-w-sm">
            <DialogHeader>
              <DialogTitle>Product Image</DialogTitle>
            </DialogHeader>
            <div className="w-full aspect-square relative">
              <Image
                src={previewImage || ""}
                alt="Preview"
                fill
                className="object-cover rounded-md"
              />
            </div>
          </DialogContent>
        </Dialog>
      ),
    },
    {
  accessorKey: "name",
  header: "Name",
  cell: ({ row }) => <span className="font-medium">{row.original.name}</span>,
},

   {
  accessorKey: "variants",
  header: "Variant",
  cell: ({ row }) => {
    const id = row.original.id
    const current = selectedVariants[id]

    return (
      <Select
        value={current}
        onValueChange={(value) =>
          setSelectedVariants((prev) => ({
            ...prev,
            [id]: value as "Half" | "Full",
          }))
        }
      >
        <SelectTrigger className="w-[100px]">
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          {row.original.variants.map((v) => (
            <SelectItem key={v} value={v}>
              {v}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    )
  },
},
{
  accessorKey: "price",
  header: "Price",
  cell: ({ row }) => {
    const id = row.original.id
    const variant = selectedVariants[id]
    return `₹${row.original.prices[variant].price}`
  },
},
{
  accessorKey: "mrp",
  header: "MRP",
  cell: ({ row }) => {
    const id = row.original.id
    const variant = selectedVariants[id]
    return `₹${row.original.prices[variant].mrp}`
  },
},

    {
      accessorKey: "available",
      header: "Availability",
      cell: ({ row }) =>
        row.original.available ? (
          <Badge variant="default">Available</Badge>
        ) : (
          <Badge variant="destructive">Unavailable</Badge>
        ),
    },
    {
      accessorKey: "createdAt",
      header: "Created",
      cell: ({ row }) =>
        new Date(row.original.createdAt).toLocaleDateString(),
    },
    {
      accessorKey: "updatedAt",
      header: "Updated",
      cell: ({ row }) =>
        new Date(row.original.updatedAt).toLocaleDateString(),
    },
    { accessorKey: "cuisine", header: "Cuisine" },
    { accessorKey: "type", header: "Type" },
{
  id: "actions",
  header: "Actions",
  cell: ({ row }) => {
    const [openDialog, setOpenDialog] = useState(false)

    return (
      <div className="flex gap-2">
        <Button variant="outline" size="sm">
          Edit
        </Button>
        <Button variant="destructive" size="sm">
          Delete
        </Button>
        <Button variant="secondary" size="sm" onClick={() => setOpenDialog(true)}>
          Add Campaign
        </Button>

        <AddCampaignDialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          campaigns={[
            {
              id: "1",
              name: "Independence Sale",
              date: "2025-08-15",
              headings: ["Freedom Combo", "Discount Bonanza"],
            },
            {
              id: "2",
              name: "Festive Dhamaka",
              date: "2025-10-20",
              headings: ["Diwali Delight", "Lights On Combo"],
            },
          ]}
        />
      </div>
    )
  },
}

  ]

  const table = useReactTable({
    data: filteredProducts, // use filtered data
    columns,
    state: { sorting, pagination },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: false,
  })


  return (
    <div className="space-y-4">
    <div className="flex justify-between items-center mb-4">
<div className="flex justify-between items-center px-2">
  <Input
    placeholder="Search product name..."
    value={searchInput}
    onChange={(e) => setSearchInput(e.target.value)}
    className="w-64"
  />
</div>

</div>

      <div className="rounded-md border">
        
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className={header.column.getCanSort() ? "cursor-pointer select-none" : ""}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {{
                      asc: " 🔼",
                      desc: " 🔽",
                    }[header.column.getIsSorted() as string] ?? null}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* ✅ Pagination Controls */}
      <div className="flex items-center justify-between px-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <span className="text-sm text-muted-foreground">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  )
}