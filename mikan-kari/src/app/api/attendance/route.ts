import { NextRequest, NextResponse } from 'next/server';
import pool from '../../../lib/db';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { format } from 'date-fns';

export async function POST(req: NextRequest) {
    const { name, event_name, date } = await req.json();

    if (!name || !event_name || !date) {
        return NextResponse.json({ message: 'All fields are required.' }, { status: 400 });
    }

    const formattedDate = format(new Date(date), 'yyyy/MM/dd');

    try {
        const [result] = await pool.query<ResultSetHeader>(
            'INSERT INTO attendances (name, event_name, date, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)',
            [name, event_name, formattedDate, new Date(), new Date()]
        );
        return NextResponse.json({ id: result.insertId, name, event_name, date: formattedDate }, { status: 201 });
    } catch (error) {
        console.error('Error saving attendance:', error);
        return NextResponse.json({ message: 'Error saving attendance', error }, { status: 500 });
    }
}

export async function GET() {
    try {
        const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM attendances');
        const formattedRows = rows.map((row) => ({
            ...row,
            date: format(new Date(row.date), 'yyyy/MM/dd')
        }));
        return NextResponse.json(formattedRows, { status: 200 });
    } catch (error) {
        console.error('Error fetching attendance records:', error);
        return NextResponse.json({ message: 'Error fetching attendance records', error }, { status: 500 });
    }
}
