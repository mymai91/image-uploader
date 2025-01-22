"use client"

import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import Image from "next/image"
import { ProductImage } from "../types/ProductImage"
import { useEffect } from "react"
import { getListImage } from "@/features/images/imagesThunk"

interface Props {}

const ImagesList: React.FC<Props> = () => {
  const { items, loading, error } = useAppSelector(state => state.images)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getListImage())
  }, [dispatch])
  if (loading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>Error: {error.message}</div>
  }
  return (
    <div>
      <h1>Image List</h1>
      <div>
        {items.map((item: ProductImage, index: number) => {
          return (
            <div key={index}>
              <Image
                src={item.path}
                alt={item.description}
                width={200}
                height={200}
              />
              <h3>{item.filename}</h3>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ImagesList
