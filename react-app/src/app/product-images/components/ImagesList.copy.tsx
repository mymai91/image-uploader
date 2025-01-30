"use client"

import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import { ProductImage } from "../types/ProductImage"
import { useEffect } from "react"
import { getListImage, deleteImage } from "@/features/images/imagesThunk"
import ImageCardItem from "./ImageCardItem"
import { Stack, Text } from "@chakra-ui/react"

import {
  getDeletedListImage,
  restoreImage,
} from "@/features/images/deletedImagesThunk"
// import { shallowEqual, useSelector } from "react-redux"

interface Props {}

const ImagesList: React.FC<Props> = () => {
  const { items, loading, error } = useAppSelector(
    state => state.images,
    // shallowEqual,
  )
  const {
    items: deletedItems,
    // loading: isLoadingDeletedImages,
    // error: isDeletedError,
  } = useAppSelector(state => state.deletedImages)
  const dispatch = useAppDispatch()
  console.log("state items", items)
  useEffect(() => {
    dispatch(getListImage())
    dispatch(getDeletedListImage())
  }, [dispatch])
  if (loading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>Error: {error.message}</div>
  }

  const handleDeleteImage = (image: ProductImage) => {
    dispatch(deleteImage(image))
  }

  const handleRestoreImage = (id: number) => {
    dispatch(restoreImage({ id }))
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
              key={item.id}
              handleDeleteImage={handleDeleteImage}
              isActive={true}
            />
          )
        })}
      </div>

      <h1>Deleted Image List</h1>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {deletedItems.map((item: ProductImage, index: number) => {
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

      <Stack>
        <Text fontWeight="light">Sphinx of black quartz, judge my vow.</Text>
        <Text fontWeight="normal">Sphinx of black quartz, judge my vow.</Text>
        <Text fontWeight="medium">Sphinx of black quartz, judge my vow.</Text>
        <Text fontWeight="semibold">Sphinx of black quartz, judge my vow.</Text>
        <Text fontWeight="bold">Sphinx of black quartz, judge my vow.</Text>
      </Stack>
    </div>
  )
}

export default ImagesList
