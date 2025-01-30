"use client"

import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import { Tabs, SimpleGrid } from "@chakra-ui/react"
import { useEffect, useState } from "react"

import ImageCardItem from "./ImageCardItem"

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
    dispatch(deleteActiveImage(image))
  }

  const handleRestoreImage = (image: ProductImage) => {
    dispatch(restoreInActiveImage(image))
  }

  return (
    <div>
      {/* <h1>Image List</h1>
      <h1>Active Image List</h1> */}

      <Tabs.Root defaultValue="tab-1">
        <Tabs.List>
          <Tabs.Trigger value="tab-1">Active Images</Tabs.Trigger>
          <Tabs.Trigger value="tab-2">InActive Images</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="tab-1">
          <SimpleGrid columns={3} gap="20px">
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
          </SimpleGrid>
        </Tabs.Content>
        <Tabs.Content value="tab-2">
          <SimpleGrid columns={3} gap="20px">
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
          </SimpleGrid>
        </Tabs.Content>
      </Tabs.Root>

      <h1>InActive Image</h1>
    </div>
  )
}

export default ImagesList
