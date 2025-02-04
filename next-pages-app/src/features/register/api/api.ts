import { api } from "@/lib/axios/api"
import { RegisterDto, RegisterResponse } from "../types/register"

export const registerApi = async (registerDto: RegisterDto) => {
  const response = await api.create<RegisterResponse, RegisterDto>(
    "/users",
    registerDto,
  )

  return response
}
