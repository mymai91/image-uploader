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
  Link as ChakraLink,
} from "@chakra-ui/react"
import React from "react"
import { useAppDispatch } from "@/hooks/storeHooks"
import { useRouter } from "next/router"
import { registerSchema } from "../schema/RegisterSchema"
import { RegisterDto } from "../types/register"
import { registerUser } from "../../stores/authThunk"
import { useAppToast } from "@/hooks/useAppToast"
import NextLink from "next/link"

const RegisterForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterDto>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      username: "john",
      email: "john@example.com",
      password: "password123",
    },
  })

  const dispatch = useAppDispatch()
  const router = useRouter()
  const { showError } = useAppToast()

  const onSubmit = async (data: RegisterDto) => {
    try {
      const resultAction = await dispatch(registerUser(data))

      if (registerUser.fulfilled.match(resultAction)) {
        router.push("/login")
      } else {
        showError({
          title: "Register Error",
          message:
            (resultAction?.payload as string) ||
            "Something went wrong. Please try again.",
        })
      }
    } catch (error: unknown) {
      showError({
        title: "Register Error",
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
      })
    }
  }

  return (
    <Container maxW="md" py="8">
      <Card boxShadow="lg" borderRadius="xl">
        <CardHeader pb="0">
          <Heading size="lg" textAlign="center" color="gray.700">
            Create your free account
          </Heading>
        </CardHeader>

        <CardBody pt="6">
          <Box as="form" onSubmit={handleSubmit(onSubmit)}>
            <VStack spacing="6">
              <FormControl isInvalid={!!errors.username}>
                <FormLabel>User Name</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter your username"
                  size="lg"
                  {...register("username")}
                />
                <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
              </FormControl>

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

              <ChakraLink
                as={NextLink}
                px={2}
                py={1}
                rounded="md"
                href={"/login"}
              >
                Already have an account?
              </ChakraLink>
            </VStack>
          </Box>
        </CardBody>
      </Card>
    </Container>
  )
}

export default RegisterForm
