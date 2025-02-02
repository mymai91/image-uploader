import React from "react"
import { Box } from "@chakra-ui/react"
import ProductImageList from "@/features/productImage/components/ProductImageList"

interface Props {}

const ProductImagesPage: React.FC<Props> = ({}) => {
  return (
    <Box>
      <ProductImageList />
    </Box>
  )
}

export default ProductImagesPage
