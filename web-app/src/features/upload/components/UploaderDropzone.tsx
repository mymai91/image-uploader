import { Box, Button, Flex, Image, Text } from '@chakra-ui/react'
import React, { useCallback } from 'react'
import uploadLogo from '@/assets/uploadLogo.svg'
import { useDropzone } from 'react-dropzone'
import { acceptFileSize, formatFileSize } from '@/utils/fileHelper'
import { useAppToast } from '@/hooks/useAppToast'

export const UPLOAD_ACCEPTED_FILE_TYPES = ['.jpeg', '.png', '.jpg', '.gif']
const MAX_FILE_SIZE = 5 * 1024 * 1024

interface Props {}

const UploaderDropzone: React.FC<Props> = () => {
  const { showToastError } = useAppToast()

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: File[]) => {
    // Do something with the files

    if (rejectedFiles.length > 0) {
      showToastError({
        title: 'Error uploading image',
        description: 'Please select a valid image file and Maximum size is 5MB',
      })
    }

    if (acceptedFiles.length > 0) {
      console.log(
        'File upload isValidFileSize',
        acceptFileSize(acceptedFiles[0].size)
      )
    }
  }, [])

  const { getRootProps, getInputProps, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'image/*': UPLOAD_ACCEPTED_FILE_TYPES,
    },
    multiple: false,
    maxSize: MAX_FILE_SIZE,
  })

  return (
    <Box
      id="upload-zone"
      paddingTop={16}
      borderTopColor="gray.200"
      borderTopWidth={1}
    >
      <Flex direction="column" alignItems="center">
        <Box
          {...getRootProps()}
          id="upload-zone-field"
          className="imageUpload_svg"
          mb={8}
          p={4}
          position="relative"
          aria-label="upload zone button"
          role="button"
        >
          <Box as="input" {...getInputProps()} />
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

          <Text fontSize="sm" color="gray.400">
            Maximum file size: {formatFileSize(MAX_FILE_SIZE)}
          </Text>
        </Box>
      </Flex>
    </Box>
  )
}

export default UploaderDropzone
