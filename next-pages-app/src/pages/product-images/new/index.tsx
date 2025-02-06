"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { VStack, Button, Image, Text, Box } from "@chakra-ui/react"
import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks"
import ProductImageList from "@/features/productImage/components/ProductImageList"
import { uploadImage } from "@/features/productImage/stores/activeImages/activeImageThunk"
import { useAppToast } from "@/hooks/useAppToast"

const ProductImageNewPage = () => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const { error } = useAppSelector(state => state.activeImages)

  const dispatch = useAppDispatch()
  const { showError, showSuccess } = useAppToast()

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]
      if (file) {
        const response = await dispatch(
          uploadImage({ file, description: "Uploaded image" }),
        )

        if (uploadImage.fulfilled.match(response)) {
          setPreviewUrl(URL.createObjectURL(file))
          showSuccess({ title: "Image uploaded successfully", message: "" })
        } else if (uploadImage.rejected.match(response)) {
          showError({
            title: "Upload Error",
            message: response.payload as string,
          })
        }
      }
    },
    [dispatch, showError, showSuccess],
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

        <Button {...getRootProps()} colorScheme="blue">
          Upload Image
        </Button>

        {!Boolean(error) && previewUrl && (
          <Image src={previewUrl} alt="Preview" boxSize="200px" />
        )}
      </VStack>

      <Box
        bg="white"
        boxShadow="lg"
        borderRadius="xl"
        p={6}
        aria-label="Product Image Page"
      >
        <ProductImageList />
      </Box>
    </Box>
  )
}

export default ProductImageNewPage
