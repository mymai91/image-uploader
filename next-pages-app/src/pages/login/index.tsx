import React from "react"
import { Box } from "@chakra-ui/react"
import LoginForm from "@/features/auth/login/components/LoginForm"

interface Props {
  children?: React.ReactNode
}

const LoginPage: React.FC<Props> = ({}) => {
  return (
    <Box>
      <LoginForm />
    </Box>
  )
}

export default LoginPage
