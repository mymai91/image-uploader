"use client"

import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"

import ImageCardItem from "./ImageCardItem"
import { useEffect } from "react"
import {
  deleteActiveImage,
  getListActiveImage,
} from "@/features/activeImages/activeImageThunk"
import { ProductImage } from "@/types/image"
import {
  getListInActiveImage,
  restoreInActiveImage,
} from "@/features/inActiveImages/inActiveImageThunk"

interface Props {}

const ImagesList: React.FC<Props> = () => {
  const { items: activeImages } = useAppSelector(state => state.activeImages)

  const { items: inActiveImages } = useAppSelector(
    state => state.inActiveImages,
  )

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getListActiveImage())
    dispatch(getListInActiveImage())
  }, [dispatch])

  const handleDeleteImage = (image: ProductImage) => {
    console.log("delete image", image)
    dispatch(deleteActiveImage(image))
  }

  const handleRestoreImage = (image: ProductImage) => {
    dispatch(restoreInActiveImage(image))
  }

  return (
    <div>
      <h1>Image List</h1>
      <h1>Active Image List</h1>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {activeImages.map((item: ProductImage) => {
          return (
            <ImageCardItem
              item={item}
              key={item.id}
              handleDeleteImage={handleDeleteImage}
              isActive={true}
            />
          )
        })}
      </div>

      <h1>InActive Image</h1>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {inActiveImages.map((item: ProductImage) => {
          return (
            <ImageCardItem
              item={item}
              key={item.id}
              handleRestoreImage={handleRestoreImage}
              isActive={false}
            />
          )
        })}
      </div>
    </div>
  )
}

export default ImagesList
