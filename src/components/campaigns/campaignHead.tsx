"use client"

import React, { useState } from "react"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import HeadingTable from "./headingTable"
 

// Types
type Product = {
  id: string
  name: string
  image: string
  price: number
  mrp: number
  cuisine: string
  type: string
}

type User = {
  id: string
  name: string
  phone: string
  address: string
  pincode: string
  date: string
  category: string
}

type Heading = { id: number; name: string }
type Campaign = { id: number; name: string; headings: Heading[] }

// Sample data
const sampleProducts: Product[] = [
  { id: "1", name: "Paneer Butter Masala", image: "/Butter_Paneer_LEAD_1-2-2.jpg", price: 120, mrp: 150, cuisine: "North Indian", type: "Veg" },
  { id: "2", name: "Chicken Curry", image: "/Butter_Paneer_LEAD_1-2-2.jpg", price: 180, mrp: 210, cuisine: "South Indian", type: "Non-Veg" },
]

const mockUsers: User[] = [
  { id: "U1", name: "Alice", phone: "9876543210", address: "123 Main St, Kolkata, India", pincode: "700001", date: "2025-07-21", category: "Gold" },
  { id: "U2", name: "Bob", phone: "8765432109", address: "456 Park Ave, Delhi, India", pincode: "110001", date: "2025-07-22", category: "Silver" },
]

export default function CampaignHead() {
  const now = new Date()
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ]
  const years = Array.from({ length: 5 }, (_, i) => now.getFullYear() - 2 + i)

  // State
  const [selectedMonth, setSelectedMonth] = useState(months[now.getMonth()])
  const [selectedYear, setSelectedYear] = useState(String(now.getFullYear()))
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [newCampaignName, setNewCampaignName] = useState("")
  const [newHeadingName, setNewHeadingName] = useState("")
  const [activeHeadingCampaign, setActiveHeadingCampaign] = useState<number | null>(null)
  const [activeUsersCampaign, setActiveUsersCampaign] = useState<number | null>(null)
  const [userSearch, setUserSearch] = useState("")

  // Handlers
  const handleAddCampaign = () => {
    if (!newCampaignName.trim()) return
    setCampaigns(prev => [...prev, { id: Date.now(), name: newCampaignName, headings: [] }])
    setNewCampaignName("")
  }

  const handleAddHeading = (cid: number) => {
    if (!newHeadingName.trim()) return
    setCampaigns(prev => prev.map(c =>
      c.id === cid
        ? { ...c, headings: [...c.headings, { id: Date.now(), name: newHeadingName }] }
        : c
    ))
    setNewHeadingName("")
    setActiveHeadingCampaign(null)
  }

  const filteredUsers = mockUsers.filter(u =>
    u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
    u.phone.includes(userSearch) ||
    u.id.includes(userSearch)
  )

  return (
  <div className="p-4 sm:p-6 space-y-6">
    {/* Header row */}
    <div className="flex flex-wrap items-center gap-4">
      <h2 className="text-xl sm:text-2xl font-semibold">
        {selectedMonth}, {selectedYear}
      </h2>

      <Select value={selectedMonth} onValueChange={setSelectedMonth}>
        <SelectTrigger className="w-[120px] sm:w-[150px]">
          <SelectValue placeholder="Month" />
        </SelectTrigger>
        <SelectContent>
          {months.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
        </SelectContent>
      </Select>

      <Select value={selectedYear} onValueChange={setSelectedYear}>
        <SelectTrigger className="w-[100px] sm:w-[120px]">
          <SelectValue placeholder="Year" />
        </SelectTrigger>
        <SelectContent>
          {years.map(y => <SelectItem key={y} value={String(y)}>{y}</SelectItem>)}
        </SelectContent>
      </Select>

      <Dialog>
        <DialogTrigger asChild><Button>Add Campaign</Button></DialogTrigger>
        <DialogContent>
          <DialogHeader><DialogTitle>Add Campaign</DialogTitle></DialogHeader>
          <Input
            placeholder="Campaign name"
            value={newCampaignName}
            onChange={e => setNewCampaignName(e.target.value)}
          />
          <Button className="mt-4 w-full sm:w-auto" onClick={handleAddCampaign}>Add</Button>
        </DialogContent>
      </Dialog>
    </div>

    {/* Campaign List */}
    {campaigns.map(c => (
      <div key={c.id} className="space-y-3  rounded-md p-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h3 className="text-lg sm:text-xl font-medium">{c.name}</h3>
          <div className="flex flex-wrap items-center gap-2 sm:gap-4">
            <Switch />

            {/* Users Dialog */}
            <Dialog open={activeUsersCampaign === c.id} onOpenChange={(o) => setActiveUsersCampaign(o ? c.id : null)}>
              <DialogTrigger asChild><Button variant="outline">Users</Button></DialogTrigger>
              <DialogContent className="max-w-full sm:max-w-4xl">
                <DialogHeader><DialogTitle>Users Participated: {filteredUsers.length}</DialogTitle></DialogHeader>

                <Input
                  placeholder="Search users..."
                  value={userSearch}
                  onChange={e => setUserSearch(e.target.value)}
                  className="mb-4"
                />

                <div className="overflow-x-auto rounded-md border">
                  <table className="min-w-[600px] w-full text-sm">
                    <thead className="bg-muted text-left">
                      <tr>
                        <th className="px-4 py-2">ID</th>
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Phone</th>
                        <th className="px-4 py-2">Address</th>
                        <th className="px-4 py-2">Pin-code</th>
                        <th className="px-4 py-2">Date</th>
                        <th className="px-4 py-2">Category</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map(u => (
                        <tr key={u.id} className="border-t">
                          <td className="px-4 py-2">{u.id}</td>
                          <td className="px-4 py-2">{u.name}</td>
                          <td className="px-4 py-2">{u.phone}</td>
                          <td className="px-4 py-2">{u.address}</td>
                          <td className="px-4 py-2">{u.pincode}</td>
                          <td className="px-4 py-2">{u.date}</td>
                          <td className="px-4 py-2">{u.category}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </DialogContent>
            </Dialog>

            {/* Add Heading Dialog */}
            <Dialog open={activeHeadingCampaign === c.id} onOpenChange={o => setActiveHeadingCampaign(o ? c.id : null)}>
              <DialogTrigger asChild><Button variant="outline">Add Heading</Button></DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>Add Heading to "{c.name}"</DialogTitle></DialogHeader>
                <Input
                  placeholder="Heading name"
                  value={newHeadingName}
                  onChange={e => setNewHeadingName(e.target.value)}
                />
                <Button className="mt-4 w-full sm:w-auto" onClick={() => handleAddHeading(c.id)}>Add</Button>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Headings with Product Table */}
        {c.headings.map(h => (
          <div key={h.id} className="ml-2 sm:ml-4 space-y-2 border-t pt-3">
            <h4 className="text-base sm:text-lg font-semibold">{h.name}</h4>
            <HeadingTable products={sampleProducts} />
          </div>
        ))}
      </div>
    ))}
  </div>
)

  
}
