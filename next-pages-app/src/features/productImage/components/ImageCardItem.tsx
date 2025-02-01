import React from "react"
import Image from "next/image"
import { Box, Button, VStack, Text, AspectRatio } from "@chakra-ui/react"
import { ProductImage } from "../types/productImage"

interface Props {
  item: ProductImage
  handleDeleteImage?: (image: ProductImage) => void
  handleRestoreImage?: (image: ProductImage) => void
  isActive: boolean
}

const ImageCardItem: React.FC<Props> = ({
  item,
  handleDeleteImage = () => {},
  handleRestoreImage = () => {},
  isActive,
}) => {
  return (
    <Box
      maxW="380px"
      w="full"
      borderRadius="lg"
      bg="white"
      boxShadow="sm"
      overflow="hidden"
      p={4}
    >
      {/* Image Display */}
      <AspectRatio ratio={4 / 3} w="full">
        <Box position="relative" bg="gray.100" borderRadius="md">
          {item.path ? (
            <Image
              src={item.path}
              alt={item.description || "Product image"}
              fill
              style={{ objectFit: "contain", borderRadius: "8px" }}
            />
          ) : (
            <Text color="gray.500" fontSize="md" textAlign="center" pt="10">
              No Image Available
            </Text>
          )}
        </Box>
      </AspectRatio>

      {/* Description & Actions */}
      <VStack gap={3} align="stretch" mt={3}>
        <Text fontSize="md" fontWeight="bold" color="gray.800">
          {item.description || "Untitled Product"}
        </Text>

        <Button
          width="fit-content"
          alignSelf="flex-end"
          size="md"
          color="white"
          fontWeight="bold"
          _hover={{ textDecoration: "underline" }}
          onClick={() =>
            isActive ? handleDeleteImage(item) : handleRestoreImage(item)
          }
          bgColor={isActive ? "red.500" : "green.500"}
          w="full"
        >
          {isActive ? "Delete" : "Restore"}
        </Button>
      </VStack>
    </Box>
  )
}

export default ImageCardItem
