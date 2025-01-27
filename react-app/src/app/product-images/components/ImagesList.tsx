"use client"

import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import { ProductImage } from "../types/ProductImage"
import { useEffect } from "react"
import { getListImage, deleteImage } from "@/features/images/imagesThunk"
import ImageCardItem from "./ImageCardItem"

interface Props {}

const ImagesList: React.FC<Props> = () => {
  const { items, loading, error } = useAppSelector(state => state.images)
  const dispatch = useAppDispatch()
  console.log("state items", items)
  useEffect(() => {
    dispatch(getListImage())
  }, [dispatch])
  if (loading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>Error: {error.message}</div>
  }

  const handleDeleteImage = (id: number) => {
    console.log("handleDeleteImage id", id)
    dispatch(deleteImage({ id }))
  }

  const handleRestoreImage = (id: number) => {
    console.log("handleRestoreImage id", id)
    // dispatch(restoreImage({ id }))
  }
  return (
    <div>
      <h1>Image List</h1>
      <h1>Active Image List</h1>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {items.map((item: ProductImage, index: number) => {
          return (
            <ImageCardItem
              item={item}
              key={index}
              handleDeleteImage={handleDeleteImage}
            />
          )
        })}
      </div>

      <h1>Deleted Image List</h1>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {items.map((item: ProductImage, index: number) => {
          return (
            <ImageCardItem
              item={item}
              key={index}
              handleDeleteImage={handleDeleteImage}
            />
          )
        })}
      </div>
    </div>
  )
}

export default ImagesList
