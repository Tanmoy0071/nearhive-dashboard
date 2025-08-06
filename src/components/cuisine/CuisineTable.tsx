"use client"

import React, { useMemo, useState } from "react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Pencil, Trash2 } from "lucide-react"
import { Input } from "@/components/ui/input"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import type { Cuisine, CuisineProduct } from "@/types/backend/models"

const dummyData: Cuisine[] = [
  {
    heading: "South Indian Delight",
    subHeading: "Authentic flavors",
    lowerHeading: "Authentic flavors",
    desc: "Spicy and flavorful meals",
    image: "https://firebasestorage.googleapis.com/v0/b/tnennt-1e1f2.appspot.com/o/products%2FProduct-ID-0278c4c9-c9eb-4e76-96d1-7c5f0862faad%2F48a251b0f2ab6de7d0ba948bdc880e99.jpg?alt=media",
    banner: "https://firebasestorage.googleapis.com/v0/b/tnennt-1e1f2.appspot.com/o/products%2FProduct-ID-0278c4c9-c9eb-4e76-96d1-7c5f0862faad%2F48a251b0f2ab6de7d0ba948bdc880e99.jpg?alt=media",
    about: "Traditional South Indian dishes made with love.",
    products: [
      {
        imageUrl: "https://firebasestorage.googleapis.com/v0/b/tnennt-1e1f2.appspot.com/o/products%2FProduct-ID-0278c4c9-c9eb-4e76-96d1-7c5f0862faad%2F48a251b0f2ab6de7d0ba948bdc880e99.jpg?alt=media",
        title: "Idli",
        desc: "Steamed rice cakes served with chutney.",
      },
      {
        imageUrl: "https://firebasestorage.googleapis.com/v0/b/tnennt-1e1f2.appspot.com/o/products%2FProduct-ID-0278c4c9-c9eb-4e76-96d1-7c5f0862faad%2F48a251b0f2ab6de7d0ba948bdc880e99.jpg?alt=media",
        title: "Dosa",
        desc: "Crispy crepe made from fermented batter.",
      },
    ],
  },
]

const CuisineTable = () => {
  const [openSheet, setOpenSheet] = useState(false)
  const [selectedProducts, setSelectedProducts] = useState<CuisineProduct[]>([])
  const [globalFilter, setGlobalFilter] = useState("")

  const handleShowProducts = (products: CuisineProduct[]) => {
    setSelectedProducts(products)
    setOpenSheet(true)
  }

  const columns = useMemo<ColumnDef<Cuisine>[]>(
    () => [
      {
        header: "Heading",
        accessorKey: "heading",
      },
      {
        header: "Sub Heading",
        accessorKey: "subHeading",
      },
      {
        header: "Description",
        accessorKey: "desc",
      },
      {
        header: "Image",
        cell: ({ row }) => (
          <Image
            src={row.original.image}
            alt="Cuisine"
            width={64}
            height={64}
            className="rounded object-cover"
          />
        ),
      },
      {
        header: "Banner",
        cell: ({ row }) => (
          <Image
            src={row.original.banner}
            alt="Banner"
            width={64}
            height={64}
            className="rounded object-cover"
          />
        ),
      },
      {
        header: "About",
        accessorKey: "about",
      },
      {
        header: "Products",
        cell: ({ row }) => (
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleShowProducts(row.original.products)}
          >
            Show Products
          </Button>
        ),
      },
      {
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex gap-2">
            <Button variant="outline" size="sm">Edit</Button>
            <Button variant="destructive" size="sm">Delete</Button>
          </div>
        ),
      },
    ],
    []
  )

  const table = useReactTable({
    data: dummyData,
    columns,
    state: {
      globalFilter,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onGlobalFilterChange: setGlobalFilter,
  })

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <Input
          placeholder="Search cuisines..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between mt-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <span className="text-sm">
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

      <Sheet open={openSheet} onOpenChange={setOpenSheet}>
        <SheetContent side="right" className="max-w-md overflow-y-auto px-4">
          <SheetHeader>
            <SheetTitle>Products</SheetTitle>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            {selectedProducts.map((product, idx) => (
              <div
                key={idx}
                className="flex items-start gap-4 p-4 border rounded-lg bg-muted"
              >
                <Image
                  src={product.imageUrl}
                  alt={product.title}
                  width={64}
                  height={64}
                  className="rounded object-cover"
                />
                <div>
                  <p className="font-medium">{product.title}</p>
                  <p className="text-sm text-muted-foreground">{product.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}

export default CuisineTable
