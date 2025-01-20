import axios from "@/lib/axios/axios.config"
import { LoginFormInputs } from "../component/LoginForm"
import { LoginResponse } from "../types/auth"

export const signIn = async (signInData: LoginFormInputs) => {
  try {
    const response = await axios.post<LoginResponse>("/auth/signin", signInData)

    localStorage.setItem("accessToken", response.data.data.accessToken)

    // You might also want to set it in a cookie for SSR
    // document.cookie = `accessToken=${response.accessToken}; path=/;`

    return response.data.data
  } catch (error) {
    console.log("error", error)
  }
}
