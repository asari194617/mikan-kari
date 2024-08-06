'use client';

import { useState } from 'react';

export default function Home() {
  const [name, setName] = useState('');
  const [eventName, setEventName] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/attendance', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, event_name: eventName, date }),
    });

    if (res.ok) {
      alert('Attendance recorded successfully!');
      setName('');
      setEventName('');
      setDate('');
    } else {
      alert('Failed to record attendance.');
    }
  };

  return (
    <div>
      <h1>イベントの出席を登録</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Event Name:</label>
          <input
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
