import React from 'react'

const Footer = () => {
  return (
    <div>
        <footer className="bg-gray-800 border-t border-gray-700 py-6 mt-12">
          <div className="container mx-auto px-6 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Resume Builder. All rights reserved.</p>
          </div>
        </footer>
    </div>
  )
}

export default Footer