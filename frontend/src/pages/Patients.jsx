import { useState, useEffect } from 'react'
import API from '../api/axios'
import { useNavigate } from 'react-router-dom'

export default function Patients() {
    const [patients, setPatients] = useState([])
    const [form, setForm] = useState({ first_name: '', last_name: '', email: '', phone: '', date_of_birth: '', blood_group: 'A+', address: '', medical_history: '' })
    const [showForm, setShowForm] = useState(false)
    const [search, setSearch] = useState('')
    const navigate = useNavigate()

    const fetchPatients = async () => {
        try {
            const res = await API.get(`patients/?search=${search}`)
            setPatients(res.data.results || res.data)
        } catch {
            navigate('/')
        }
    }

    useEffect(() => { fetchPatients() }, [search])

    const handleSubmit = async () => {
        try {
            await API.post('patients/', form)
            setShowForm(false)
            fetchPatients()
        } catch {
            alert('Error adding patient')
        }
    }

    const handleDelete = async (id) => {
        if (window.confirm('Delete this patient?')) {
            await API.delete(`patients/${id}/`)
            fetchPatients()
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
                    <h2 className="text-2xl font-bold text-gray-700">Patients</h2>
                    <button onClick={() => setShowForm(!showForm)} className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                        {showForm ? 'Cancel' : '+ Add Patient'}
                    </button>
                </div>

                {/* Search */}
                <input
                    className="w-full border p-3 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Search patients..."
                    onChange={e => setSearch(e.target.value)}
                />

                {/* Add Form */}
                {showForm && (
                    <div className="bg-white p-6 rounded-xl shadow mb-6">
                        <h3 className="text-lg font-bold mb-4">Add New Patient</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <input className="border p-2 rounded" placeholder="First Name" onChange={e => setForm({...form, first_name: e.target.value})} />
                            <input className="border p-2 rounded" placeholder="Last Name" onChange={e => setForm({...form, last_name: e.target.value})} />
                            <input className="border p-2 rounded" placeholder="Email" onChange={e => setForm({...form, email: e.target.value})} />
                            <input className="border p-2 rounded" placeholder="Phone" onChange={e => setForm({...form, phone: e.target.value})} />
                            <input className="border p-2 rounded" type="date" onChange={e => setForm({...form, date_of_birth: e.target.value})} />
                            <select className="border p-2 rounded" onChange={e => setForm({...form, blood_group: e.target.value})}>
                                {['A+','A-','B+','B-','O+','O-','AB+','AB-'].map(bg => <option key={bg}>{bg}</option>)}
                            </select>
                            <input className="border p-2 rounded col-span-2" placeholder="Address" onChange={e => setForm({...form, address: e.target.value})} />
                            <textarea className="border p-2 rounded col-span-2" placeholder="Medical History" onChange={e => setForm({...form, medical_history: e.target.value})} />
                        </div>
                        <button onClick={handleSubmit} className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg">Save Patient</button>
                    </div>
                )}

                {/* Patients Table */}
                <div className="bg-white rounded-xl shadow overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-blue-50">
                            <tr>
                                <th className="p-4 text-left">Name</th>
                                <th className="p-4 text-left">Email</th>
                                <th className="p-4 text-left">Phone</th>
                                <th className="p-4 text-left">Blood Group</th>
                                <th className="p-4 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {patients && patients.map(p => (
                                <tr key={p.id} className="border-t hover:bg-gray-50">
                                    <td className="p-4">{p.first_name} {p.last_name}</td>
                                    <td className="p-4">{p.email}</td>
                                    <td className="p-4">{p.phone}</td>
                                    <td className="p-4">{p.blood_group}</td>
                                    <td className="p-4">
                                        <button onClick={() => handleDelete(p.id)} className="text-red-500 hover:underline">Delete</button>
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