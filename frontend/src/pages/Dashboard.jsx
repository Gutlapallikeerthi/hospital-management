import { useState, useEffect } from 'react'
import API from '../api/axios'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
    const [stats, setStats] = useState({ patients: 0, doctors: 0, appointments: 0 })
    const navigate = useNavigate()

    useEffect(() => {
       const fetchStats = async () => {
            try {
                const [patients, doctors, appointments] = await Promise.all([
                    API.get('patients/'),
                    API.get('doctors/'),
                    API.get('appointments/')
                ])
                setStats({
                    patients: patients.data.count || patients.data.length,
                    doctors: doctors.data.count || doctors.data.length,
                    appointments: appointments.data.count || appointments.data.length
                })
            } catch {
                navigate('/')
            }
        }
        fetchStats()
    }, [])

    const logout = () => {
        localStorage.removeItem('token')
        navigate('/')
    }

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Navbar */}
            <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
                <h1 className="text-xl font-bold">Hospital Management System</h1>
                <div className="flex gap-4">
                    <button onClick={() => navigate('/patients')} className="hover:underline">Patients</button>
                    <button onClick={() => navigate('/doctors')} className="hover:underline">Doctors</button>
                    <button onClick={() => navigate('/appointments')} className="hover:underline">Appointments</button>
                    <button onClick={logout} className="bg-white text-blue-600 px-3 py-1 rounded font-semibold">Logout</button>
                </div>
            </nav>

            {/* Stats */}
            <div className="p-8">
                <h2 className="text-2xl font-bold mb-6 text-gray-700">Dashboard</h2>
                <div className="grid grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-xl shadow text-center">
                        <p className="text-4xl font-bold text-blue-600">{stats.patients}</p>
                        <p className="text-gray-500 mt-2">Total Patients</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow text-center">
                        <p className="text-4xl font-bold text-green-600">{stats.doctors}</p>
                        <p className="text-gray-500 mt-2">Total Doctors</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow text-center">
                        <p className="text-4xl font-bold text-purple-600">{stats.appointments}</p>
                        <p className="text-gray-500 mt-2">Total Appointments</p>
                    </div>
                </div>
            </div>
        </div>
    )
}