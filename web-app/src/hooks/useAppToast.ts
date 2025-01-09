import { useToast } from '@chakra-ui/react'

interface AppToastProps {
  title?: string
  description?: string
}

const position = 'top-right'

export const useAppToast = () => {
  const toast = useToast()

  const showToastSuccess = (option: AppToastProps) => {
    const { description = 'Done', title = 'Success' } = option

    toast({
      title,
      description,
      status: 'success',
      duration: 5000,
      isClosable: true,
      position,
    })
  }

  const showToastError = (option: AppToastProps) => {
    const { description = 'Error', title = 'Error' } = option

    toast({
      title,
      description,
      status: 'error',
      duration: 5000,
      isClosable: true,
      position,
    })
  }

  return {
    showToastSuccess,
    showToastError,
  }
}
