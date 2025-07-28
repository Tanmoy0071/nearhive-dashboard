"use client"

import React, { useState, ChangeEvent } from "react"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Checkbox } from "@/components/ui/checkbox"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

const storeOptions = ["Store A", "Store B", "Store C", "SuperMart", "QuickBite"]

const AddProducts: React.FC = () => {
  const [image, setImage] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [productType, setProductType] = useState("")
  const [cuisineType, setCuisineType] = useState("")
  const [foodType, setFoodType] = useState("veg")
  const [productName, setProductName] = useState("")
  const [hasVariations, setHasVariations] = useState(false)
  const [selectedVariations, setSelectedVariations] = useState<string[]>([])
  const [variationData, setVariationData] = useState<Record<string, { mrp: number; discount: number }>>({})
  const [globalMRP, setGlobalMRP] = useState<number>(0)
  const [globalDiscount, setGlobalDiscount] = useState<number>(0)
  const [store, setStore] = useState("")
  const [storeDropdownOpen, setStoreDropdownOpen] = useState(false)

  const defaultVariations = ["Half", "Full", "Small", "Medium", "Large"]
  const bakeryVariations = ["1 Pound", "1.2 Pound"]
  const variationOptions = productType === "bakery" ? bakeryVariations : defaultVariations

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)
      setImageUrl(URL.createObjectURL(file))
    }
  }

  const toggleVariation = (variation: string) => {
    setSelectedVariations((prev) =>
      prev.includes(variation) ? prev.filter((v) => v !== variation) : [...prev, variation]
    )
    setVariationData((prev) => ({
      ...prev,
      [variation]: prev[variation] || { mrp: 0, discount: 0 },
    }))
  }

  const handleVariationChange = (
    variation: string,
    field: "mrp" | "discount",
    value: string
  ) => {
    const parsed = parseFloat(value)
    setVariationData((prev) => ({
      ...prev,
      [variation]: {
        ...prev[variation],
        [field]: isNaN(parsed) ? 0 : parsed,
      },
    }))
  }

  const getFinalPrice = (mrp: number, discount: number) =>
    (mrp - (mrp * discount) / 100).toFixed(2)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Product</Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[80vh] pr-2">
          <div className="grid gap-4 py-4">
            {/* Store Combobox */}
            <div className="flex flex-col gap-2">
              <Label>Store</Label>
              <Popover open={storeDropdownOpen} onOpenChange={setStoreDropdownOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={storeDropdownOpen}
                    className="w-full justify-between"
                  >
                    {store || "Select store"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Search store..." />
                    <CommandEmpty>No store found.</CommandEmpty>
                    <CommandGroup>
                      {storeOptions.map((option) => (
                        <CommandItem
                          key={option}
                          value={option}
                          onSelect={(value) => {
                            setStore(value)
                            setStoreDropdownOpen(false)
                          }}
                        >
                          <Check
                            className={cn("mr-2 h-4 w-4", store === option ? "opacity-100" : "opacity-0")}
                          />
                          {option}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            {/* Image Upload */}
            <div className="flex flex-col gap-2">
              <Label>Upload Image (max 1)</Label>
              <Input type="file" accept="image/*" onChange={handleImageUpload} />
              {imageUrl && (
                <Image
                  src={imageUrl}
                  alt="Preview"
                  width={100}
                  height={100}
                  className="rounded border mt-2"
                />
              )}
            </div>

            {/* Product Type */}
            <div className="flex flex-col gap-2">
              <Label>Product Type</Label>
              <Select
                value={productType}
                onValueChange={(value) => {
                  setProductType(value)
                  setSelectedVariations([])
                  setVariationData({})
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select product type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cafe">Cafe</SelectItem>
                  <SelectItem value="restaurant">Restaurant</SelectItem>
                  <SelectItem value="bakery">Bakery</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Cuisine Type */}
            <div className="flex flex-col gap-2">
              <Label>Cuisine Type</Label>
              <Input value={cuisineType} onChange={(e) => setCuisineType(e.target.value)} />
            </div>

            {/* Food Type */}
            <div className="flex flex-col gap-2">
              <Label>Food Type</Label>
              <Select value={foodType} onValueChange={setFoodType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select food type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="veg">Veg</SelectItem>
                  <SelectItem value="non-veg">Non-Veg</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Product Name */}
            <div className="flex flex-col gap-2">
              <Label>Product Name</Label>
              <Input value={productName} onChange={(e) => setProductName(e.target.value)} />
            </div>

            {/* Variation Toggle */}
            <div className="flex items-center justify-between">
              <Label>Is there any variation?</Label>
              <Switch checked={hasVariations} onCheckedChange={setHasVariations} />
            </div>

            {/* Global Pricing */}
            {!hasVariations && (
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col gap-1">
                  <Label>MRP</Label>
                  <Input
                    type="number"
                    value={globalMRP}
                    onChange={(e) => setGlobalMRP(parseFloat(e.target.value))}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <Label>Discount (%)</Label>
                  <Input
                    type="number"
                    value={globalDiscount}
                    onChange={(e) => setGlobalDiscount(parseFloat(e.target.value))}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <Label>Final Price</Label>
                  <Input disabled value={getFinalPrice(globalMRP, globalDiscount)} />
                </div>
              </div>
            )}

            {/* Variation Pricing */}
            {hasVariations && (
              <div className="flex flex-col gap-4">
                <Label>Select Variations & Pricing</Label>
                {variationOptions.map((variation) => (
                  <div key={variation} className="border p-3 rounded-md space-y-2">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id={variation}
                        checked={selectedVariations.includes(variation)}
                        onCheckedChange={() => toggleVariation(variation)}
                      />
                      <Label htmlFor={variation}>{variation}</Label>
                    </div>

                    {selectedVariations.includes(variation) && (
                      <div className="grid grid-cols-3 gap-4">
                        <div className="flex flex-col gap-1">
                          <Label>MRP</Label>
                          <Input
                            type="number"
                            value={variationData[variation]?.mrp || ""}
                            onChange={(e) =>
                              handleVariationChange(variation, "mrp", e.target.value)
                            }
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <Label>Discount (%)</Label>
                          <Input
                            type="number"
                            value={variationData[variation]?.discount || ""}
                            onChange={(e) =>
                              handleVariationChange(variation, "discount", e.target.value)
                            }
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <Label>Final Price</Label>
                          <Input
                            disabled
                            value={getFinalPrice(
                              variationData[variation]?.mrp || 0,
                              variationData[variation]?.discount || 0
                            )}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="flex justify-end mt-4">
          <Button type="submit">Save Product</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AddProducts
