import { NextApiRequest, NextApiResponse } from 'next';
import Attendance from '../../../models/Attendance';
import sequelize from '../../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log("DB_NAME: " + process.env.DB_NAME);
    console.log(process.env.DB_USER);
    console.log(process.env.DB_PASSWORD);

    await sequelize.sync(); // Ensure the database is in sync

    const { method } = req;

    switch (method) {
        case 'POST':
            const { name, event_name, date } = req.body;

            if (!name || !event_name || !date) {
                return res.status(400).json({ message: 'All fields are required.' });
            }

            try {
                const newAttendance = await Attendance.create({ name, event_name, date });
                res.status(201).json(newAttendance);
            } catch (error) {
                console.error('Error saving attendance:', error);
                res.status(500).json({ message: 'Error saving attendance', error });
            }
            break;

        case 'GET':
            try {
                const attendances = await Attendance.findAll();
                res.status(200).json(attendances);
            } catch (error) {
                console.error('Error fetching attendance records:', error);
                res.status(500).json({ message: 'Error fetching attendance records', error });
            }
            break;

        default:
            res.setHeader('Allow', ['POST', 'GET']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
