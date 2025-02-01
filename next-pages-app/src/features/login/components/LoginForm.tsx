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
} from "@chakra-ui/react"
import React from "react"
import { loginSchema } from "../schema/LoginSchema"
import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks"
import { useRouter } from "next/router"
import { loginUser } from "../store/authThunk"

interface Props {}

const LoginForm: React.FC<Props> = ({}) => {
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
  // const { loading, error } = useAppSelector(state => state.auth)

  const onSubmit = async (data: LoginDto) => {
    dispatch(loginUser(data))

    // console.log("result", result)

    // if (loginUser.fulfilled.match(result)) {
    //   // router.push("/product-images")
    //   console.log("Login successful")
    // }
  }

  return (
    <Box>
      <Heading>Login</Heading>
      <Box as="form" onSubmit={handleSubmit(onSubmit)}>
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
