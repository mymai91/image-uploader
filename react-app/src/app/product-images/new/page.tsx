"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { VStack, Button, Image, Text, Box } from "@chakra-ui/react"

const ProductImageNewPage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      setSelectedFile(file)
      setPreviewUrl(URL.createObjectURL(file))
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  })

  const handleUpload = async () => {
    if (!selectedFile) return

    const formData = new FormData()
    formData.append("file", selectedFile)

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        alert("Image uploaded successfully!")
      } else {
        alert("Failed to upload image.")
      }
    } catch (error) {
      console.error("Upload error:", error)
      alert("Error uploading image.")
    }
  }

  return (
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

      <Button onClick={handleUpload} colorScheme="blue">
        Upload Image
      </Button>
    </VStack>
  )
}

export default ProductImageNewPage
