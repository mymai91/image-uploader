import React from "react"
import { Box } from "@chakra-ui/react"
import LoginForm from "@/features/login/components/LoginForm"

interface Props {}

const LoginPage: React.FC<Props> = ({}) => {
  return (
    <Box>
      <LoginForm />
    </Box>
  )
}

export default LoginPage
