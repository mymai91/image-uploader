import { Box, Text } from '@chakra-ui/react'
import React from 'react'
import UploaderDropzone from './UploaderDropzone'
import Navigation from '@/components/Navigation'

interface Props {}

const ImageUploader: React.FC<Props> = () => {
  return (
    <Box>
      <Navigation />
      <Text>Upload your image</Text>
      <Text>File should be a valid image</Text>
      <Text>JPEG, JPG, PNG, SVG or GIF</Text>

      <UploaderDropzone />
    </Box>
  )
}

export default ImageUploader
