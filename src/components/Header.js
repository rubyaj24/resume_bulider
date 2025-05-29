import React from 'react'
import Link from 'next/link'

const Header = () => {
  return (
    <div>
        <header className="bg-gray-800 border-b border-gray-700 py-4">
          <div className="container mx-auto px-6 flex justify-between items-center">
            <Link href="/" className="text-white flex items-center">
            <h1 className="text-2xl font-bold tracking-tight">
              Resume<span className="gradient-text">Builder!</span>
            </h1>
            </Link>
          </div>
        </header>
    </div>
  )
}

export default Header