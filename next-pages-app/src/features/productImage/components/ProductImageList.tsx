import {
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react"
import { useEffect } from "react"

import ImageCardItem from "./ImageCardItem"

import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks"
import {
  deleteActiveImage,
  getListActiveImage,
} from "../stores/activeImages/activeImageThunk"
import { ProductImage } from "../types/productImage"
import {
  getListInActiveImage,
  restoreInActiveImage,
} from "../stores/inActiveImages/inActiveImageThunk"

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
    <Tabs variant="enclosed" size="lg" colorScheme="blue">
      <TabList mb="6">
        <Tab gap="2">
          <Text fontSize="xl">Active Images</Text>
        </Tab>
        <Tab gap="2">
          <Text fontSize="xl">Inactive Images</Text>
        </Tab>
      </TabList>

      <TabPanels>
        <TabPanel p="0">
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
        </TabPanel>

        <TabPanel p="0">
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
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}

export default ImagesList
