import React from "react"
import LoginForm from "./components/LoginForm"
import { Box } from "@chakra-ui/react"

interface Props {}

const LoginPage: React.FC<Props> = ({}) => {
  return (
    <Box>
      <LoginForm />
    </Box>
  )
}

export default LoginPage
