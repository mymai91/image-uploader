"use client"

import { Box, Container, Flex } from "@chakra-ui/react"
import ImagesList from "../product-images/components/ImagesList"

export default function ProductImagePage() {
  return (
    <Box minH="100vh" w="full" bg="gray.50" py={10}>
      <Flex justify="center" align="center" h="full">
        <Container
          maxW="6xl"
          bg="white"
          boxShadow="lg"
          borderRadius="xl"
          p={6}
          aria-label="Product Image Page"
        >
          <ImagesList />
        </Container>
      </Flex>
    </Box>
  )
}
