"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table"
import { Calendar as CalendarIcon } from "lucide-react"
import { format, isSameDay, parse } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { PackageOpen } from "lucide-react"

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

import { ChevronDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@radix-ui/react-separator"

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = React.useState(value)

  React.useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(handler)
  }, [value, delay])

  return debouncedValue
}


export type Payment = {
  id: string
  ordered: string
  delivered: string
  deliveryTime: string
  product: string
  store: string
  status: "pending" | "processing" | "success" | "cancelled" | "failed"
  payment: string
  total: number
  email: string
  variation: string
  quantity: number
  phone: string
  middleman: string
  address: string
  platformFee: number
  deliveryFee: number
  storeCommission: number
}

const data: Payment[] = [
  {
    id: "ORD-1001",
    ordered: "Jun 9, 07:44:15 PM",
    delivered: "Jun 9, 09:41:17 PM",
    deliveryTime: "1h 57m",
    product: "Headphones",
    store: "TechZone",
    status: "success",
    payment: "Credit Card",
    total: 220,
    email: "ken99@example.com",
    variation: "default",
    quantity: 10,
    phone: "9952588182",
    middleman: "Souvick Das Chowdhury",
    address: `loknath saroni road\nlakihi charan road\nKarimganj , 788710`,
    platformFee: 25,
    deliveryFee: 15,
    storeCommission: 37,
  },
  
]

export function DataTableDemo() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [selectedOrder, setSelectedOrder] = React.useState<Payment | null>(null)
const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(undefined)
const [searchQuery, setSearchQuery] = React.useState("")
const debouncedSearch = useDebounce(searchQuery, 300)




  const columns: ColumnDef<Payment>[] = [
    {
      accessorKey: "id",
      header: "Order ID",
      cell: ({ row }) => <div>{row.getValue("id")}</div>,
    },
    {
      accessorKey: "ordered",
      header: "Ordered",
      cell: ({ row }) => <div>{row.getValue("ordered")}</div>,
    },
    {
      accessorKey: "delivered",
      header: "Delivered",
      cell: ({ row }) => <div>{row.getValue("delivered")}</div>,
    },
    {
      accessorKey: "deliveryTime",
      header: "Delivery Time",
      cell: ({ row }) => <div>{row.getValue("deliveryTime")}</div>,
    },
    {
      accessorKey: "product",
      header: "Product",
      cell: ({ row }) => <div>{row.getValue("product")}</div>,
    },
    {
      accessorKey: "store",
      header: "Store",
      cell: ({ row }) => <div>{row.getValue("store")}</div>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <div className="capitalize">{row.getValue("status")}</div>,
    },
    {
      accessorKey: "payment",
      header: "Payment",
      cell: ({ row }) => <div>{row.getValue("payment")}</div>,
    },
    {
      accessorKey: "total",
      header: () => <div className="text-right">Total</div>,
      cell: ({ row }) => {
        const total = parseFloat(row.getValue("total"))
        const formatted = `₹${total}`
        return <div className="text-right font-medium">{formatted}</div>
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const payment = row.original
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(payment.id)}>
                Copy Order ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setSelectedOrder(payment)}>
                View Order Details
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

const filteredData = React.useMemo(() => {
  return data.filter((item) => {
    const matchesDate = selectedDate
      ? isSameDay(parse(item.ordered, "MMM d, hh:mm:ss a", new Date()), selectedDate)
      : true

    const searchLower = debouncedSearch.toLowerCase()
    const matchesSearch =
      item.id.toLowerCase().includes(searchLower) ||
      item.store.toLowerCase().includes(searchLower) ||
      item.product.toLowerCase().includes(searchLower)

    return matchesDate && matchesSearch
  })
}, [data, selectedDate, debouncedSearch])



const { totalSales, totalPlatformFee, totalStoreFee, deliveryFees, netRevenue, averageDeliveryTime } =
  React.useMemo(() => {
    const totalSales = filteredData.reduce((sum, item) => sum + item.total, 0)
    const totalPlatformFee = filteredData.reduce((sum, item) => sum + item.platformFee, 0)
    const totalStoreFee = filteredData.reduce((sum, item) => sum + item.storeCommission, 0)
    const deliveryFees = filteredData.reduce((sum, item) => sum + item.deliveryFee, 0)
    const netRevenue = totalPlatformFee + deliveryFees + totalStoreFee

    const totalMinutes = filteredData.reduce((sum, item) => {
      const match = item.deliveryTime.match(/(\d+)h\s*(\d+)m/)
      const hours = match ? parseInt(match[1]) : 0
      const minutes = match ? parseInt(match[2]) : 0
      return sum + hours * 60 + minutes
    }, 0)
    const avg = filteredData.length > 0 ? totalMinutes / filteredData.length : 0
    const h = Math.floor(avg / 60)
    const m = Math.round(avg % 60)
    const averageDeliveryTime = `${h}h ${m}m`

    return {
      totalSales,
      totalPlatformFee,
      totalStoreFee,
      deliveryFees,
      netRevenue,
      averageDeliveryTime,
    }
  }, [filteredData])


const table = useReactTable({
  data: filteredData, // ✅ Use filteredData instead of full data
  columns,
  onSortingChange: setSorting,
  onColumnFiltersChange: setColumnFilters,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  onColumnVisibilityChange: setColumnVisibility,
  onRowSelectionChange: setRowSelection,
  state: {
    sorting,
    columnFilters,
    columnVisibility,
    rowSelection,
  },
})




  return (
    <div className="w-full">
      <div className="flex flex-wrap items-center gap-2 py-4">
<Input
  placeholder="Search orders..."
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
  className="max-w-sm"
/>


         <Popover>
    <PopoverTrigger asChild>
      <Button
        variant={"outline"}
        className={cn("w-[180px] md:ml-4 justify-start text-left", !selectedDate && "text-muted-foreground")}
      >
        <CalendarIcon className="mr-2 h-4 w-4" />
        {selectedDate ? format(selectedDate, "PPP") : "Select date"}
      </Button>
    </PopoverTrigger>
    <PopoverContent className="w-auto p-0">
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
        initialFocus
      />
    </PopoverContent>
  </Popover>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
        {selectedDate && filteredData.length > 0 && (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary" className="md:ml-2">View Metrics</Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <h4 className="font-semibold mb-2">Sales Summary</h4>
        <div className="text-sm space-y-1">
          <p>Total Sales: ₹{totalSales.toFixed(2)}</p>
          <p>Platform Fee: ₹{totalPlatformFee.toFixed(2)}</p>
          <p>Store Fee: ₹{totalStoreFee.toFixed(2)}</p>
          <p>Net Revenue: ₹{netRevenue.toFixed(2)}</p>
          <p>Avg Delivery Time: {averageDeliveryTime}</p>
        </div>
      </PopoverContent>
    </Popover>
  )}
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
<TableRow>
  <TableCell colSpan={columns.length} className="p-0">
    <div className="h-64 flex flex-col items-center justify-center gap-2">
      <PackageOpen className="w-10 h-10 text-muted-foreground" />
      <p className="text-sm text-muted-foreground">No orders found for the selected date</p>
    </div>
  </TableCell>
</TableRow>

            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
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

      {/* ✅ Sheet rendered outside */}
      {selectedOrder && (
        <Sheet open={!!selectedOrder} onOpenChange={(open) => !open && setSelectedOrder(null)}>
          <SheetContent className="overflow-y-auto w-full h-full sm:w-[600px] sm:h-auto px-6 sm:px-8">

            <SheetHeader>
              <SheetTitle>Order Details</SheetTitle>
            </SheetHeader>
            <div className="mt-4 space-y-6 text-sm">
              <div>
                <h3 className="font-semibold mb-2">Order Details</h3>
                <p><strong>Middleman:</strong> {selectedOrder.middleman}</p>
                <p><strong>Variation:</strong> {selectedOrder.variation}</p>
                <p><strong>Quantity:</strong> {selectedOrder.quantity}</p>
                <p><strong>Phone:</strong> {selectedOrder.phone}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Price Details</h3>
                <p><strong>Product Price:</strong> ₹18 x {selectedOrder.quantity}</p>
                <p><strong>Platform Fee:</strong> ₹{selectedOrder.platformFee}</p>
                <p><strong>Delivery Fee:</strong> ₹{selectedOrder.deliveryFee}</p>
                <p><strong>Total:</strong> ₹{selectedOrder.total}</p>
                <p><strong>Store Commission:</strong> ₹{selectedOrder.storeCommission}</p>
                <p><strong>Payment To Store:</strong> ₹
                  {selectedOrder.total -
                    selectedOrder.platformFee -
                    selectedOrder.deliveryFee -
                    selectedOrder.storeCommission}
                </p>
                <p><strong>Total Profit:</strong> ₹
                  {selectedOrder.platformFee +
                    selectedOrder.deliveryFee +
                    selectedOrder.storeCommission}
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Shipping Address</h3>
                <pre className="whitespace-pre-wrap">{selectedOrder.address}</pre>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Delivery Timeline</h3>
                <p><strong>Ordered:</strong> {selectedOrder.ordered}</p>
                <p><strong>Delivered:</strong> {selectedOrder.delivered}</p>
                <p><strong>Delivery Time:</strong> {selectedOrder.deliveryTime}</p>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      )}
    </div>
  )
}
