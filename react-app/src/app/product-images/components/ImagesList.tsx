"use client"

import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import { SimpleGrid, Tabs } from "@chakra-ui/react"
import { useEffect } from "react"
import { LuImage, LuTrash2 } from "react-icons/lu"

import ImageCardItem from "./ImageCardItem"

import {
  deleteActiveImage,
  getListActiveImage,
} from "@/features/activeImages/activeImageThunk"
import {
  getListInActiveImage,
  restoreInActiveImage,
} from "@/features/inActiveImages/inActiveImageThunk"
import { ProductImage } from "@/types/image"

const ImagesList: React.FC = () => {
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
    <Tabs.Root defaultValue="active" size="lg" colorScheme="blue">
      <Tabs.List gap="30px" mb={6}>
        <Tabs.Trigger value="active" fontSize="xl">
          <LuImage />
          Active Images
        </Tabs.Trigger>
        <Tabs.Trigger value="inactive" fontSize="xl">
          <LuTrash2 />
          Inactive Images
        </Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content value="active">
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} gap="30px">
          {activeImages.map((item: ProductImage) => (
            <ImageCardItem
              item={item}
              key={item.id}
              handleDeleteImage={handleDeleteImage}
              isActive={true}
            />
          ))}
        </SimpleGrid>
      </Tabs.Content>

      <Tabs.Content value="inactive">
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} gap="30px">
          {inActiveImages.map((item: ProductImage) => (
            <ImageCardItem
              item={item}
              key={item.id}
              handleRestoreImage={handleRestoreImage}
              isActive={false}
            />
          ))}
        </SimpleGrid>
      </Tabs.Content>
    </Tabs.Root>
  )
}

export default ImagesList
