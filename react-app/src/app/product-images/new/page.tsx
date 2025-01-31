"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { VStack, Button, Image, Text, Box, Container } from "@chakra-ui/react"
import { useAppDispatch } from "@/lib/store/hooks"
import { uploadImage } from "@/features/activeImages/activeImageThunk"
import ImagesList from "../components/ImagesList"

const ProductImageNewPage = () => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const dispatch = useAppDispatch()

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]
      if (file) {
        setPreviewUrl(URL.createObjectURL(file))
        dispatch(uploadImage({ file, description: "Uploaded image" }))
      }
    },
    [dispatch],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  })

  return (
    <Box>
      <VStack gap={4} p={4}>
        <Box
          {...getRootProps()}
          p={8}
          border="2px dashed gray"
          borderRadius="lg"
          cursor="pointer"
          textAlign="center"
          w="100%"
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <Text>Drop the image here...</Text>
          ) : (
            <Text>Drag & drop an image here, or click to select one</Text>
          )}
        </Box>

        {previewUrl && <Image src={previewUrl} alt="Preview" boxSize="200px" />}

        <Button {...getRootProps()} colorScheme="blue">
          Upload Image
        </Button>
      </VStack>

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
    </Box>
  )
}

export default ProductImageNewPage
