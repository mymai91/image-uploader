import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { LoginDto } from "@/features/login/types/login"
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  VStack,
  Card,
  CardBody,
  CardHeader,
  Container,
  Text,
} from "@chakra-ui/react"
import React from "react"
import { useAppDispatch } from "@/hooks/storeHooks"
import { useRouter } from "next/router"
import { registerSchema } from "../schema/RegisterSchema"
import { RegisterDto } from "../types/register"
// import { loginUser } from "../stores/authThunk"

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterDto>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      email: "john@example.com",
      password: "password123",
    },
  })

  const dispatch = useAppDispatch()
  const router = useRouter()

  const onSubmit = async (data: RegisterDto) => {
    console.log(data)
    // dispatch(loginUser(data))
  }

  return (
    <Container maxW="md" py="8">
      <Card boxShadow="lg" borderRadius="xl">
        <CardHeader pb="0">
          <Heading size="lg" textAlign="center" color="gray.700">
            Welcome Back
          </Heading>
          <Text mt="2" textAlign="center" color="gray.500">
            Please sign in to continue
          </Text>
        </CardHeader>

        <CardBody pt="6">
          <Box as="form" onSubmit={handleSubmit(onSubmit)}>
            <VStack spacing="6">
              <FormControl isInvalid={!!errors.email}>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  size="lg"
                  {...register("email")}
                />
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.password}>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  size="lg"
                  {...register("password")}
                />
                <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
              </FormControl>

              <Button
                type="submit"
                colorScheme="blue"
                size="lg"
                width="full"
                isLoading={isSubmitting}
                loadingText="Signing in..."
              >
                Sign In
              </Button>
            </VStack>
          </Box>
        </CardBody>
      </Card>
    </Container>
  )
}

export default LoginForm
