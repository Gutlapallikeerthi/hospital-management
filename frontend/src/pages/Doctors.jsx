import { useState, useEffect } from 'react'
import API from '../api/axios'
import { useNavigate } from 'react-router-dom'

export default function Doctors() {
    const [doctors, setDoctors] = useState([])
    const [form, setForm] = useState({ first_name: '', last_name: '', email: '', phone: '', specialization: '', experience_years: '', available_days: '', consultation_fee: '' })
    const [showForm, setShowForm] = useState(false)
    const [search, setSearch] = useState('')
    const navigate = useNavigate()

    const fetchDoctors = async () => {
        try {
            const res = await API.get(`doctors/?search=${search}`)
            setDoctors(res.data.results || res.data)
        } catch {
            navigate('/')
        }
    }

    useEffect(() => { fetchDoctors() }, [search])

    const handleSubmit = async () => {
        try {
            await API.post('doctors/', form)
            setShowForm(false)
            fetchDoctors()
        } catch {
            alert('Error adding doctor')
        }
    }

    const handleDelete = async (id) => {
        if (window.confirm('Delete this doctor?')) {
            await API.delete(`doctors/${id}/`)
            fetchDoctors()
        }
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
                <h1 className="text-xl font-bold">Hospital Management System</h1>
                <button onClick={() => navigate('/dashboard')} className="bg-white text-blue-600 px-3 py-1 rounded font-semibold">Dashboard</button>
            </nav>

            <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-700">Doctors</h2>
                    <button onClick={() => setShowForm(!showForm)} className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                        {showForm ? 'Cancel' : '+ Add Doctor'}
                    </button>
                </div>

                {/* Search */}
                <input
                    className="w-full border p-3 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Search doctors..."
                    onChange={e => setSearch(e.target.value)}
                />

                {/* Add Form */}
                {showForm && (
                    <div className="bg-white p-6 rounded-xl shadow mb-6">
                        <h3 className="text-lg font-bold mb-4">Add New Doctor</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <input className="border p-2 rounded" placeholder="First Name" onChange={e => setForm({...form, first_name: e.target.value})} />
                            <input className="border p-2 rounded" placeholder="Last Name" onChange={e => setForm({...form, last_name: e.target.value})} />
                            <input className="border p-2 rounded" placeholder="Email" onChange={e => setForm({...form, email: e.target.value})} />
                            <input className="border p-2 rounded" placeholder="Phone" onChange={e => setForm({...form, phone: e.target.value})} />
                            <input className="border p-2 rounded" placeholder="Specialization" onChange={e => setForm({...form, specialization: e.target.value})} />
                            <input className="border p-2 rounded" placeholder="Experience Years" type="number" onChange={e => setForm({...form, experience_years: e.target.value})} />
                            <input className="border p-2 rounded" placeholder="Available Days (e.g. Mon, Tue)" onChange={e => setForm({...form, available_days: e.target.value})} />
                            <input className="border p-2 rounded" placeholder="Consultation Fee" type="number" onChange={e => setForm({...form, consultation_fee: e.target.value})} />
                        </div>
                        <button onClick={handleSubmit} className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg">Save Doctor</button>
                    </div>
                )}

                {/* Doctors Table */}
                <div className="bg-white rounded-xl shadow overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-blue-50">
                            <tr>
                                <th className="p-4 text-left">Name</th>
                                <th className="p-4 text-left">Specialization</th>
                                <th className="p-4 text-left">Phone</th>
                                <th className="p-4 text-left">Experience</th>
                                <th className="p-4 text-left">Fee</th>
                                <th className="p-4 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {doctors && doctors.map(d => (
                                <tr key={d.id} className="border-t hover:bg-gray-50">
                                    <td className="p-4">Dr. {d.first_name} {d.last_name}</td>
                                    <td className="p-4">{d.specialization}</td>
                                    <td className="p-4">{d.phone}</td>
                                    <td className="p-4">{d.experience_years} years</td>
                                    <td className="p-4">₹{d.consultation_fee}</td>
                                    <td className="p-4">
                                        <button onClick={() => handleDelete(d.id)} className="text-red-500 hover:underline">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}