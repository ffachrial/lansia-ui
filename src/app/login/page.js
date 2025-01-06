// src/app/login/page.js

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabase'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: username,
        password: password,
      })

      if (error) {
        setError(error.message)
        console.error('Login failed:', error)
        return
      }

      console.log('Login successful:', data)
      router.push('/home') // Redirect to HomePage
    } catch (err) {
      console.error('Unexpected error:', err)
    }
  }

  return (
    <div className="min-h-screen bg-yellow-400 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-lg">
        {/* Sign In Text */}
        <div className="mb-8">
          <h1 className="text-3xl text-yellow-800 font-bold mb-2">Sign In</h1>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full px-4 py-3 rounded-2xl bg-orange-100 border border-yellow-700 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-3 rounded-2xl bg-orange-100 border border-yellow-700 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="text-right">
            <a href="#" className="text-gray-600 text-sm hover:text-amber-500">
              Lupa Password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-700 text-white py-3 rounded-2xl hover:bg-gray-800 transition-colors duration-200"
          >
            Sign In
          </button>
        </form>

        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      </div>
    </div>
  )
}
