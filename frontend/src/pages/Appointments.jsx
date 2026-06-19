import { useState, useEffect } from 'react'
import API from '../api/axios'
import { useNavigate } from 'react-router-dom'

export default function Appointments() {
    const [appointments, setAppointments] = useState([])
    const [patients, setPatients] = useState([])
    const [doctors, setDoctors] = useState([])
    const [form, setForm] = useState({ patient: '', doctor: '', appointment_date: '', appointment_time: '', reason: '', status: 'pending' })
    const [showForm, setShowForm] = useState(false)
    const navigate = useNavigate()

    const fetchAll = async () => {
        try {
            const [app, pat, doc] = await Promise.all([
                API.get('appointments/'),
                API.get('patients/'),
                API.get('doctors/')
            ])
            setAppointments(app.data.results || app.data)
            setPatients(pat.data.results || pat.data)
            setDoctors(doc.data.results || doc.data)
        } catch {
            navigate('/')
        }
    }

    useEffect(() => { fetchAll() }, [])

    const handleSubmit = async () => {
        try {
            await API.post('appointments/', form)
            setShowForm(false)
            fetchAll()
        } catch {
            alert('Error adding appointment')
        }
    }

    const handleDelete = async (id) => {
        if (window.confirm('Delete this appointment?')) {
            await API.delete(`appointments/${id}/`)
            fetchAll()
        }
    }

    const statusColor = (status) => {
        if (status === 'confirmed') return 'text-green-600'
        if (status === 'cancelled') return 'text-red-600'
        if (status === 'completed') return 'text-blue-600'
        return 'text-yellow-600'
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
                <h1 className="text-xl font-bold">Hospital Management System</h1>
                <button onClick={() => navigate('/dashboard')} className="bg-white text-blue-600 px-3 py-1 rounded font-semibold">Dashboard</button>
            </nav>

            <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-700">Appointments</h2>
                    <button onClick={() => setShowForm(!showForm)} className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                        {showForm ? 'Cancel' : '+ Book Appointment'}
                    </button>
                </div>

                {/* Add Form */}
                {showForm && (
                    <div className="bg-white p-6 rounded-xl shadow mb-6">
                        <h3 className="text-lg font-bold mb-4">Book New Appointment</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <select className="border p-2 rounded" onChange={e => setForm({...form, patient: e.target.value})}>
                                <option value="">Select Patient</option>
                                {patients && patients.map(p => <option key={p.id} value={p.id}>{p.first_name} {p.last_name}</option>)}
                            </select>
                            <select className="border p-2 rounded" onChange={e => setForm({...form, doctor: e.target.value})}>
                                <option value="">Select Doctor</option>
                                {doctors && doctors.map(d => <option key={d.id} value={d.id}>Dr. {d.first_name} {d.last_name}</option>)}
                            </select>
                            <input className="border p-2 rounded" type="date" onChange={e => setForm({...form, appointment_date: e.target.value})} />
                            <input className="border p-2 rounded" type="time" onChange={e => setForm({...form, appointment_time: e.target.value})} />
                            <textarea className="border p-2 rounded col-span-2" placeholder="Reason for visit" onChange={e => setForm({...form, reason: e.target.value})} />
                        </div>
                        <button onClick={handleSubmit} className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg">Book Appointment</button>
                    </div>
                )}

                {/* Appointments Table */}
                <div className="bg-white rounded-xl shadow overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-blue-50">
                            <tr>
                                <th className="p-4 text-left">Patient</th>
                                <th className="p-4 text-left">Doctor</th>
                                <th className="p-4 text-left">Date</th>
                                <th className="p-4 text-left">Time</th>
                                <th className="p-4 text-left">Status</th>
                                <th className="p-4 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments && appointments.map(a => (
                                <tr key={a.id} className="border-t hover:bg-gray-50">
                                    <td className="p-4">{a.patient_detail?.first_name} {a.patient_detail?.last_name}</td>
                                    <td className="p-4">Dr. {a.doctor_detail?.first_name} {a.doctor_detail?.last_name}</td>
                                    <td className="p-4">{a.appointment_date}</td>
                                    <td className="p-4">{a.appointment_time}</td>
                                    <td className={`p-4 font-semibold ${statusColor(a.status)}`}>{a.status}</td>
                                    <td className="p-4">
                                        <button onClick={() => handleDelete(a.id)} className="text-red-500 hover:underline">Delete</button>
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