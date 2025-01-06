'use client'

import { useRouter, usePathname } from 'next/navigation'

export default function TabNavigation({ tabs }) {
  const router = useRouter()
  const currentRoute = usePathname()

  const navigate = (route) => {
    if (currentRoute !== route) {
      router.push(route)
    }
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-md flex justify-around items-center py-2 z-50">
      {tabs.map((tab) => (
        <button
          key={tab.name}
          className={`flex flex-col items-center px-4 py-2 ${
            currentRoute === tab.route ? 'text-amber-900' : 'text-gray-500'
          }`}
          onClick={() => navigate(tab.route)}
        >
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path d={tab.icon} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-xs mt-1">{tab.name}</span>
        </button>
      ))}
    </nav>
  )
}
