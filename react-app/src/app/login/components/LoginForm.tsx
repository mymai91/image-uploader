"use client"

import React from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
// import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { loginThunk } from "@/features/auth/authThunks"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import { useRouter } from "next/navigation"
import { LoginRequest } from "../types/auth"

const loginSchema = yup.object({
  email: yup.string().required("Email is required").email("Invalid email"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Minimum 6 characters"),
})

export default function LoginForm() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { loading, error } = useAppSelector(state => state.auth)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "john@example.com",
      password: "password123",
    },
  })

  const onSubmit = async (data: LoginRequest) => {
    try {
      await dispatch(loginThunk(data)).unwrap()
      router.push("/")
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          type="email"
          {...register("email")}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.email && <p>{errors.email.message}</p>}

        <input
          type="password"
          {...register("password")}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.password && <p>{errors.password.message}</p>}

        {error && <p>{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  )
}
