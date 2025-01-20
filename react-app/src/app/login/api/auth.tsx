import axios from "@/lib/axios/axios.config"
import { LoginFormInputs } from "../component/LoginForm"
import { LoginResponse } from "../types/auth"

export const signIn = async (data: LoginFormInputs) => {
  try {
    const response = await axios.post<LoginResponse>("/auth/signin", data)

    console.log("response", response)

    // Save token
    // localStorage.setItem("accessToken", response.accessToken)

    // You might also want to set it in a cookie for SSR
    // document.cookie = `accessToken=${response.accessToken}; path=/;`

    return data
  } catch (error) {
    console.log("error", error)
  }
}
