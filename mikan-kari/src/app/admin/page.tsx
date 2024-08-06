"use client";

import { useEffect, useState } from 'react';

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
                        <th>名前</th>
                        <th>イベント名</th>
                        <th>日付</th>
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
