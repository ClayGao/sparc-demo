'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  // Navigation links
  const navLinks = [
    { href: '/about', label: '關於我' },
    { href: '/blog', label: '我的文章' }
  ]

  // Check if link is active
  const isActive = (path: string) => pathname === path

  return (
    <header className="border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          {/* Logo / Site Name */}
          <Link href="/" className="text-xl font-bold text-gray-800 dark:text-white hover:text-blue-600 transition-colors">
            Clay
          </Link>

          {/* Desktop Navigation */}
          <div 
            data-testid="desktop-nav" 
            className="hidden md:flex items-center space-x-8"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`
                  ${isActive(link.href) 
                    ? 'text-blue-600 dark:text-blue-400' 
                    : 'text-gray-700 dark:text-gray-300'
                  }
                  hover:text-blue-700 dark:hover:text-blue-300
                  font-medium transition-colors
                `}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="p-2 md:hidden text-gray-600 dark:text-gray-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="選單"
            aria-expanded={isMenuOpen}
          >
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg" 
              className={`transition-opacity duration-200 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}
            >
              <path 
                d="M4 6H20M4 12H20M4 18H20" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round"
              />
            </svg>
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg" 
              className={`absolute top-4 right-4 transition-opacity duration-200 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`}
            >
              <path 
                d="M6 18L18 6M6 6L18 18" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round"
              />
            </svg>
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-2 border-t border-gray-100 dark:border-gray-800 mt-4">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`
                    ${isActive(link.href)
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-gray-700 dark:text-gray-300'
                    }
                    hover:text-blue-700 dark:hover:text-blue-300
                    font-medium transition-colors
                  `}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}