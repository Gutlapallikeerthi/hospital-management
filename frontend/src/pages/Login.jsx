import { useState } from 'react'
import API from '../api/axios'
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await API.post('auth/login/', { username, password })
            console.log('Login response:', res.data)
            console.log('Token:', JSON.stringify(res.data))
            const token = res.data.access
            localStorage.setItem('token', token)
            console.log('Saved token:', localStorage.getItem('token'))
            navigate('/dashboard')
        } catch (err) {
            console.log('Login error:', err)
            setError('Invalid username or password')
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-50">
            <div className="bg-white p-8 rounded-xl shadow-lg w-96">
                <h2 className="text-3xl font-bold mb-2 text-center text-blue-600">Hospital MS</h2>
                <p className="text-center text-gray-500 mb-6">Sign in to your account</p>
                {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <input
                        className="w-full border p-3 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                    <input
                        className="w-full border p-3 mb-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 font-semibold">
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}