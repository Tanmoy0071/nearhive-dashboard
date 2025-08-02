"use client"

import { useState } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"

type Blog = {
  id: string
  createdAt: string | Date
  thumbnail: string
  title: string
  description: string
}

const BlogTable = () => {
  const [blogs, setBlogs] = useState<Blog[]>([
    {
      id: "1",
      createdAt: new Date(),
      thumbnail: "/sample.jpg",
      title: "Join as a creator and earn!",
      description:
        "Join as a NearHive creator and earn credits, offers, goodies and many more by contributing to NearHive community. Join as a NearHive creator and earn credits, offers, goodies and many more by contributing to NearHive community.",
    },
    {
      id: "2",
      createdAt: new Date(),
      thumbnail: "/sample.jpg",
      title: "Join as a creator and earn!",
      description:
        "Join as a NearHive creator and earn credits, offers, goodies and many more by contributing to NearHive community. Join as a NearHive creator and earn credits, offers, goodies and many more by contributing to NearHive community.",
    },
  ])

  const handleEdit = (blog: Blog) => {
    console.log("Edit blog", blog)
  }

  const handleDelete = (id: string) => {
    setBlogs((prev) => prev.filter((blog) => blog.id !== id))
  }

  const columns: ColumnDef<Blog>[] = [
    {
      accessorKey: "createdAt",
      header: "Date",
      cell: ({ row }) => {
        const date = new Date(row.original.createdAt)
        return format(date, "dd MMM yyyy")
      },
    },
    {
      accessorKey: "thumbnail",
      header: "Thumbnail",
      cell: ({ row }) => (
        <Image
          src={row.original.thumbnail}
          alt="Thumbnail"
          width={60}
          height={60}
          className="rounded object-cover"
        />
      ),
    },
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => {
        const desc = row.original.description
        return desc.length > 60 ? desc.slice(0, 60) + "..." : desc
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const blog = row.original
        return (
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => handleEdit(blog)}>
              Edit
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => handleDelete(blog.id)}
            >
              Delete
            </Button>
          </div>
        )
      },
    },
  ]

  return (
    <div className="p-4">
      <DataTable columns={columns} data={blogs} />
    </div>
  )
}

export default BlogTable
