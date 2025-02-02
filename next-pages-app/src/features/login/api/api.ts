import { LoginDto, LoginResponse } from "../types/login"
import { api } from "@/lib/axios/api"

export const loginApi = async (loginDto: LoginDto) => {
  const response = await api.create<LoginResponse, LoginDto>(
    "/auth/signin",
    loginDto,
  )

  return response
}
