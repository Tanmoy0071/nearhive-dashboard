"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { Bold, Italic, Underline } from "lucide-react"
import ImageUploadWithPreview from "@/components/ImageUploadWithPreview"

const AddBlogs = () => {
  const [content, setContent] = useState("")
  const [formatting, setFormatting] = useState<string[]>([])

  const handleFormattingChange = (value: string[]) => {
    setFormatting(value)
  }

  const applyFormatting = (text: string): string => {
    let formatted = text
    if (formatting.includes("bold")) formatted = `**${formatted}**`
    if (formatting.includes("italic")) formatted = `*${formatted}*`
    if (formatting.includes("underline")) formatted = `__${formatted}__`
    return formatted
  }

  return (
    <div className="p-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="default">Add Blog</Button>
        </DialogTrigger>

        <DialogContent className="max-w-2xl overflow-y-auto max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Add New Blog</DialogTitle>
          </DialogHeader>

          {/* Thumbnail upload with preview */}
         <ImageUploadWithPreview
  label="Thumbnail"
  id="thumbnail"
  previewClassName="w-full h-48"
/>
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" placeholder="Enter blog title" />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" placeholder="Enter a short description" />
          </div>

          {/* Content with formatting */}
          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <ToggleGroup
              type="multiple"
              className="mb-2"
              value={formatting}
              onValueChange={handleFormattingChange}
            >
              <ToggleGroupItem value="bold" aria-label="Bold">
                <Bold className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="italic" aria-label="Italic">
                <Italic className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="underline" aria-label="Underline">
                <Underline className="h-4 w-4" />
              </ToggleGroupItem>
            </ToggleGroup>

            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your blog content here..."
              className="min-h-[150px]"
            />
          </div>

          {/* Submit */}
          <Button
            onClick={() => {
              console.log("Formatted Content:", applyFormatting(content))
            }}
          >
            Submit
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AddBlogs
