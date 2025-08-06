"use client"

import React, { useState, useMemo } from "react"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { useDebounce } from "@/hooks/useDebounce" // Adjust path if needed

type HiveUser = {
  id: string
  name: string
  phoneNumber: string
  email: string
  link: string
  aboutYourself: string
  favouriteCuisine: string
  favouriteRestaurant: string
  favouriteFood: string
}

const truncate = (text: string, len = 25) =>
  text.length > len ? text.slice(0, len) + "..." : text

const data: HiveUser[] = [
  {
    id: "1",
    name: "Alice Johnson",
    phoneNumber: "9876543210",
    email: "alice@example.com",
    link: "https://linkedin.com/in/alicejohnson",
    aboutYourself:
      "I am a passionate foodie who loves discovering new culinary experiences across cultures.",
    favouriteCuisine:
      "Mediterranean, South Indian, Thai, Korean BBQ, and fusion desserts.",
    favouriteRestaurant: "The Spice Route",
    favouriteFood: "Paneer Tikka",
  },
  {
    id: "2",
    name: "Bob Smith",
    phoneNumber: "9123456789",
    email: "bob@example.com",
    link: "https://bobsmith.dev",
    aboutYourself: "Love cooking and sharing recipes with my community.",
    favouriteCuisine: "Italian",
    favouriteRestaurant: "Mama Mia Ristorante",
    favouriteFood: "Lasagna",
  },
]

const columns: ColumnDef<HiveUser>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "phoneNumber", header: "Phone Number" },
  { accessorKey: "email", header: "Email" },
  {
    accessorKey: "link",
    header: "Link",
    cell: ({ row }) => {
      const link = row.original.link
      return (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className=" underline"
        >
          Link
        </a>
      )
    },
  },
  {
    accessorKey: "aboutYourself",
    header: "About Yourself",
    cell: ({ row }) => {
      const text = row.original.aboutYourself
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="link" className="p-0 h-auto">
              {truncate(text)}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>About {row.original.name}</DialogTitle>
            </DialogHeader>
            <p>{text}</p>
          </DialogContent>
        </Dialog>
      )
    },
  },
  {
    accessorKey: "favouriteCuisine",
    header: "Favourite Cuisine",
    cell: ({ row }) => {
      const text = row.original.favouriteCuisine
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="link" className="p-0 h-auto">
              {truncate(text)}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{row.original.name}'s Favourite Cuisine</DialogTitle>
            </DialogHeader>
            <p>{text}</p>
          </DialogContent>
        </Dialog>
      )
    },
  },
  { accessorKey: "favouriteRestaurant", header: "Favourite Restaurant" },
  { accessorKey: "favouriteFood", header: "Favourite Food" },
]

function HiveTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  const filteredData = useMemo(() => {
    if (!debouncedSearchTerm.trim()) return data

    const lower = debouncedSearchTerm.toLowerCase()
    return data.filter((user) =>
      [
        user.name,
        user.phoneNumber,
        user.email,
        user.aboutYourself,
        user.favouriteCuisine,
        user.favouriteRestaurant,
        user.favouriteFood,
      ].some((field) => field.toLowerCase().includes(lower))
    )
  }, [debouncedSearchTerm])

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <>
    <h1 className="font-bold lg:text-3xl sm:text-sm mb-5 ml-4">Hive-Creators</h1>
    <div className="p-4 space-y-4">
      
      <Input
        placeholder="Search..."
        className="max-w-sm"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value)
          table.setPageIndex(0)
        }}
      />

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
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
                <TableCell colSpan={columns.length} className="text-center">
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <span className="text-sm text-muted-foreground">
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </span>
        <Button
          variant="outline"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
    </>
  )
}

export default HiveTable
