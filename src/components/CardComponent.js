'use client'

import { useRouter } from 'next/navigation'

export default function CardComponent({ title, route }) {
  const router = useRouter()

  const handleClick = () => {
    router.push(route)
  }

  return (
    <div className="rounded-lg bg-yellow-200 p-4 flex items-center">
      <div className="flex-shrink-0">
        <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
      </div>
      <div className="ml-4">
        <p className="text-lg text-amber-900 font-medium">{title}</p>
        <button
          className="mt-2 text-sm text-white bg-amber-900 py-2 px-4 rounded-md hover:bg-amber-700"
          onClick={handleClick}
        >
          Cari
        </button>
      </div>
    </div>
  )
}
