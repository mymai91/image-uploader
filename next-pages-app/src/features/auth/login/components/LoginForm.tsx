import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
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
import { loginSchema } from "../schema/LoginSchema"
import { useAppDispatch } from "@/hooks/storeHooks"
import { useRouter } from "next/router"
import { loginUser } from "../../stores/authThunk"
import { LoginDto } from "../types/login"

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginDto>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "john@example.com",
      password: "password123",
    },
  })

  const dispatch = useAppDispatch()
  const router = useRouter()

  const onSubmit = async (data: LoginDto) => {
    try {
      const resultAction = await dispatch(loginUser(data))
      if (loginUser.fulfilled.match(resultAction)) {
        router.push("/product-images")
      }
    } catch (error) {
      console.log(error)
    }
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
