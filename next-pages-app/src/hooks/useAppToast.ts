import { useToast } from "@chakra-ui/react"

interface AppToastOptions {
  title?: string
  message: string
}

const position = "top-right"

export const useAppToast = () => {
  const toast = useToast()

  const showSuccess = (options: AppToastOptions) => {
    const { message, title = "Success" } = options

    toast({
      position,
      title,
      description: message,
      status: "success",
      duration: 3000,
      isClosable: true,
    })
  }

  const showError = (options: AppToastOptions) => {
    const { message = "Please try again.", title = "Something went wrong" } =
      options

    toast({
      position,
      title,
      description: message,
      status: "error",
      duration: 9000,
      isClosable: true,
    })
  }

  return {
    showSuccess,
    showError,
  }
}
