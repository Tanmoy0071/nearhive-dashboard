"use client"

import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { useBlogsQuery } from "@/hooks/useFiresStoreQueries"

type Blog = {
  id: string
  createdAt: Date
  thumbnail: string
  title: string
  description: string
}

const BlogTable = () => {
  const { data, isLoading, isError } = useBlogsQuery()

  const blogs: Blog[] = (data || []).map((blog: any) => ({
    id: blog.id || blog.blogId, 
    createdAt: new Date(blog.createdAt.seconds * 1000),
    thumbnail: blog.thumbnail,
    title: blog.title,
    description: blog.description,
  }))

  const handleEdit = (blog: Blog) => {
    console.log("Edit blog", blog)
  }

  const handleDelete = (id: string) => {
    console.log("Delete blog with id:", id)
  }

  const columns: ColumnDef<Blog>[] = [
    {
      accessorKey: "createdAt",
      header: "Date",
      cell: ({ row }) => {
        const date = row.original.createdAt
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

  if (isLoading) return <div className="p-4">Loading...</div>
  if (isError) return <div className="p-4 text-red-500">Failed to load blogs.</div>

  return (
    <div className="p-4">
      <DataTable columns={columns} data={blogs} />
    </div>
  )
}

export default BlogTable
