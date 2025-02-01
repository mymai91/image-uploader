import { LoginDto, LoginResponse } from "../types/login"
import { api } from "@/lib/axios/api"
import Cookies from "js-cookie"

export const loginApi = async (loginDto: LoginDto) => {
  const response = await api.create<LoginResponse, LoginDto>(
    "/auth/signin",
    loginDto,
  )

  Cookies.set("accessToken", response.data.accessToken, { expires: 7 })
  // axios.defaults.headers.common["Authorization"] = `Bearer ${action.payload}`

  return response
}
