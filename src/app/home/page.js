'use client'

import CardComponent from '../../components/CardComponent'
import TabNavigation from '../../components/TabNavigation'

export default function HomePage() {
  const tabs = [
    {
      name: 'Home',
      route: '/home',
      icon: 'M3.75 12l8.25-8.25L20.25 12v6a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18V12z',
    },
    {
      name: 'Posyandu',
      route: '/posyandu?rt=&age=',
      icon: 'M12 4.5v15m-7.5-7.5h15',
    },
    {
      name: 'Posbindu',
      route: '/posbindu',
      icon: 'M12 2a9 9 0 100 18 9 9 0 000-18z',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Main Content */}
      <div className="flex-1 p-4">
        {/* Header Section */}
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-lg font-medium">Selamat Datang</h1>
            <p className="text-sm text-gray-500">Mici!</p>
          </div>
          <div className="flex space-x-4 items-center">
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </button>
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                />
              </svg>
            </button>
          </div>
        </header>

        {/* Services Section */}
        <div className="mb-6">
          <CardComponent title="Posyandu" route="/posyandu?rt=&age=" />
        </div>
        <div className="mb-6">
          <CardComponent title="Posbindu" route="/posbindu" />
        </div>
      </div>

      {/* Tab Navigation at the Bottom */}
        <TabNavigation tabs={tabs} />
    </div>
  )
}
