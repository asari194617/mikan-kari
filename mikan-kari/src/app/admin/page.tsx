'use client';

import { useEffect, useState } from 'react';
import './../globals.css';

interface Attendance {
    id: number;
    name: string;
    event_name: string;
    date: string;
}

export default function Admin() {
    const [attendances, setAttendances] = useState<Attendance[]>([]);

    useEffect(() => {
        const fetchAttendances = async () => {
            const res = await fetch('/api/attendance');
            const data = await res.json();
            setAttendances(data);
        };

        fetchAttendances();
    }, []);

    return (
        <div>
            <h1>Attendance Records</h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Event Name</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {attendances.map((attendance) => (
                        <tr key={attendance.id}>
                            <td>{attendance.name}</td>
                            <td>{attendance.event_name}</td>
                            <td>{attendance.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
