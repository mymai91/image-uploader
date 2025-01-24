"use client"

import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import Image from "next/image"
import { ProductImage } from "../types/ProductImage"
import { useEffect } from "react"
import { getListImage, deleteImage } from "@/features/images/imagesThunk"

interface Props {}

const ImagesList: React.FC<Props> = () => {
  const { items, loading, error } = useAppSelector(state => state.images)
  const dispatch = useAppDispatch()
  console.log("state items", items)
  useEffect(() => {
    dispatch(getListImage())
  }, [dispatch])
  if (loading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>Error: {error.message}</div>
  }

  const handleDeleteImage = (id: number) => {
    console.log("handleDeleteImage id", id)
    dispatch(deleteImage({ id }))
  }
  return (
    <div>
      <h1>Image List</h1>
      <div>
        {items.map((item: ProductImage, index: number) => {
          return (
            <div key={index} className="flex flex-row items-center w-6/12">
              {/* <Image
                src={item.path}
                alt={item.description}
                width={200}
                height={200}
              /> */}
              <p className="p-4">{item.id}</p>
              <img className="p-4" src={item.path} alt={item.description} />
              <h3 className="p-4">{item.filename}</h3>
              <button
                className="p-4"
                onClick={() => handleDeleteImage(item.id)}
              >
                Delete
              </button>
            </div>
          )
        })}
      </div>

      <h1>Deleted Image List</h1>
    </div>
  )
}

export default ImagesList
