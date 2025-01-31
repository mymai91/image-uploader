import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react"
import React from "react"

interface Props {}

const LoginForm: React.FC<Props> = ({}) => {
  return (
    <Box>
      <Heading>Login</Heading>
      <Box as="form">
        <FormControl isInvalid={!!errors.email} mb="4">
          <FormLabel>Email</FormLabel>
          <Input type="email" {...register("email")} />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.password} mb="4">
          <FormLabel>Password</FormLabel>
          <Input type="password" {...register("password")} />
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>

        <Button
          type="submit"
          colorScheme="blue"
          isLoading={isSubmitting}
          width="full"
        >
          Login
        </Button>
      </Box>
    </Box>
  )
}

export default LoginForm
