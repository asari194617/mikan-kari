import { NextRequest, NextResponse } from 'next/server';
import pool from '../../../lib/db';
import { ResultSetHeader } from 'mysql2';

export async function POST(req: NextRequest) {
    const { name, event_name, date } = await req.json();

    if (!name || !event_name || !date) {
        return NextResponse.json({ message: 'All fields are required.' }, { status: 400 });
    }

    try {
        const [result] = await pool.query<ResultSetHeader>(
            'INSERT INTO attendances (name, event_name, date, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)',
            [name, event_name, date, new Date(), new Date()]
        );
        return NextResponse.json({ id: result.insertId, name, event_name, date }, { status: 201 });
    } catch (error) {
        console.error('Error saving attendance:', error);
        return NextResponse.json({ message: 'Error saving attendance', error }, { status: 500 });
    }
}

export async function GET() {
    try {
        const [rows] = await pool.query('SELECT * FROM attendances');
        return NextResponse.json(rows, { status: 200 });
    } catch (error) {
        console.error('Error fetching attendance records:', error);
        return NextResponse.json({ message: 'Error fetching attendance records', error }, { status: 500 });
    }
}
