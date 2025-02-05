import React from "react"
import { Box, Button, Link, VStack } from "@chakra-ui/react"
import LoginForm from "@/features/login/components/LoginForm"

interface Props {}

const HomePage: React.FC<Props> = ({}) => {
  return (
    <Box>
      <VStack spacing={6} align="center">
        <LoginForm />
        <Button as={Link} href="/register" variant="ghost" fontSize="md" py="6">
          Create new account
        </Button>
      </VStack>
    </Box>
  )
}

export default HomePage
