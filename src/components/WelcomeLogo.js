import React from 'react'

const WelcomeLogo = () => {
  return (
    <div>
        <div className="flex flex-col items-center">
            <div>
                <h1 className="text-5xl md:text-5xl lg:text-7xl sm:text-5xl font-bold text-center tracking-tight">
              Resume<span className="gradient-text">Builder!</span>
            </h1>
            </div>
            <div className="flex flex-row space-x-8">
              <span className="text-sm italic text-gray-600 mt-2">
                Create your professional resume in minutes
              </span>
              <span className="text-sm mt-2">v1.0.0</span>
            </div>
          </div>
    </div>
  )
}

export default WelcomeLogo