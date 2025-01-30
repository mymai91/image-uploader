// import axios from "@/lib/axios/axios.config"
// // import { LoginFormInputs } from "../component/LoginForm"
// import { LoginResponse } from "../types/auth"

// export const signIn = async (signInData: LoginResponse) => {
//   try {
//     const response = await axios.post<LoginResponse>("/auth/signin", signInData)

//     localStorage.setItem("accessToken", response.data.data.accessToken)

//     // You might also want to set it in a cookie for SSR
//     // document.cookie = `accessToken=${response.accessToken}; path=/;`

//     return response.data.data
//   } catch (error) {
//     console.log("error", error)
//   }
// }

import axios from "@/lib/axios/axios.config"
import { LoginResponse } from "../types/auth"
// import Cookies from "js-cookie" // Import js-cookie for handling cookies

import { cookies } from "next/headers"

export const signIn = async (signInData: LoginResponse) => {
  try {
    const response = await axios.post<LoginResponse>("/auth/signin", signInData)

    const accessToken = response.data.data.accessToken

    // Store the token in a cookie instead of localStorage
    // Cookies.set("accessToken", accessToken, {
    //   expires: 7, // Token expires in 7 days
    //   secure: process.env.NODE_ENV === "production", // Only secure in production
    //   sameSite: "lax",
    //   path: "/",
    // })
    console.log("accessToken", accessToken)
    cookies().set("accessToken", accessToken)

    return response.data.data
  } catch (error) {
    console.error("Login error:", error)
  }
}
