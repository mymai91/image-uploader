import { Box, Button, Flex, Image, Text } from '@chakra-ui/react'
import React, { useCallback } from 'react'
import uploadLogo from '@/assets/uploadLogo.svg'
import { useDropzone } from 'react-dropzone'

export const UPLOAD_ACCEPTED_FILE_TYPES = [
  'image/jpg',
  'image/jpeg',
  'image/png',
]

interface Props {}

const UploaderDropzone: React.FC<Props> = () => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Do something with the files

    console.log(acceptedFiles)
  }, [])

  const { getRootProps, getInputProps, isDragReject } = useDropzone({
    onDrop,
    accept: UPLOAD_ACCEPTED_FILE_TYPES,
  })
  return (
    <Box
      id="upload-zone"
      paddingTop={16}
      borderTopColor="gray.200"
      borderTopWidth={1}
    >
      <Flex direction="column" alignItems="center">
        {/* {topPart} */}
        <Box
          // {...getRootProps()}
          id="upload-zone-field"
          className="imageUpload_svg"
          mb={8}
          p={4}
          position="relative"
          aria-label="upload zone button"
          role="button"
        >
          {/* <input {...getInputProps()} /> */}
          <Box data-testid="input-upload-field" pointerEvents="none">
            <Image src={uploadLogo} alt="upload" maxH="200px" mx="auto" />
          </Box>
          <Text>Or</Text>

          <Button
            id="import-a-file-button"
            data-testid="import-a-file-button"
            {...getRootProps()}
            colorScheme="primary"
            color="primary.text"
            // isDisabled={!isReady}
            aria-label="Upload Button"
          >
            Import File
          </Button>
        </Box>
      </Flex>
    </Box>
  )
}

export default UploaderDropzone
