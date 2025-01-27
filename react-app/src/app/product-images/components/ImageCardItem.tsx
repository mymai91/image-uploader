import React from "react"
import { ProductImage } from "../types/ProductImage"
import Image from "next/image"

interface Props {
  item: ProductImage
  handleDeleteImage: (id: number) => void
}

const ImageCardItem: React.FC<Props> = ({ item, handleDeleteImage }) => {
  return (
    <div className="image-card rounded-lg shadow-lg bg-white overflow-hidden">
      <div className="h-64 p-6">
        <Image
          src={item.path}
          alt={item.description}
          width={200}
          height={200}
        />
      </div>
      <div className="p-2 bg-black/50">
        <button
          className="w-full px-3 py-1.5 text-white bg-red-500 hover:bg-red-600 rounded"
          onClick={() => handleDeleteImage(item.id)}
        >
          Delete
        </button>
        <button className="w-full px-3 py-1.5 text-white bg-green-500 hover:bg-green-600 rounded">
          Restore
        </button>
      </div>
    </div>
  )
}

export default ImageCardItem
