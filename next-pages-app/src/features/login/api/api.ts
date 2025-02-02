import { LoginDto, LoginResponse } from "../types/login"
import { api } from "@/lib/axios/api"
import { RegisterDto } from "../types/register"

export const loginApi = async (loginDto: LoginDto) => {
  const response = await api.create<LoginResponse, LoginDto>(
    "/auth/signin",
    loginDto,
  )

  return response
}

export const registerApi = async (registerDto: RegisterDto) => {
  const response = await api.create("/users", registerDto)

  return response
}
