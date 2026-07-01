import { randomUUID } from 'crypto';
import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import nodemailer from 'nodemailer';
import { addMinutesToTime, TIMEZONE } from '@/lib/schedule';

const OWNER_EMAIL = 'aungkokonaing118@gmail.com';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = typeof body.name === 'string' ? body.name.trim() : '';
    const email = typeof body.email === 'string' ? body.email.trim() : '';
    const date = typeof body.date === 'string' ? body.date.trim() : '';
    const time = typeof body.time === 'string' ? body.time.trim() : '';
    const topic = typeof body.topic === 'string' ? body.topic.trim() : '';

    if (!name || !email || !date || !time) {
      return NextResponse.json({ error: 'All required fields must be filled.' }, { status: 400 });
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !/^\d{2}:\d{2}$/.test(time)) {
      return NextResponse.json({ error: 'Invalid date or time.' }, { status: 400 });
    }

    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;
    const calendarId = process.env.GOOGLE_CALENDAR_ID || 'primary';

    if (!clientId || !clientSecret || !refreshToken) {
      return NextResponse.json(
        { error: 'Google Calendar is not configured on the server.' },
        { status: 500 }
      );
    }

    const endTime = addMinutesToTime(time, 30);
    const startDateTime = `${date}T${time}:00`;
    const endDateTime = `${date}T${endTime}:00`;

    const oauth2Client = new google.auth.OAuth2(clientId, clientSecret);
    oauth2Client.setCredentials({ refresh_token: refreshToken });

    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

    const event = await calendar.events.insert({
      calendarId,
      conferenceDataVersion: 1,
      sendUpdates: 'all',
      requestBody: {
        summary: topic ? `Meeting: ${topic}` : `Portfolio meeting with ${name}`,
        description: [
          'Scheduled from portfolio website.',
          `Guest: ${name}`,
          `Email: ${email}`,
          topic ? `Topic: ${topic}` : '',
        ]
          .filter(Boolean)
          .join('\n'),
        start: { dateTime: startDateTime, timeZone: TIMEZONE },
        end: { dateTime: endDateTime, timeZone: TIMEZONE },
        attendees: [{ email }, { email: OWNER_EMAIL }],
        conferenceData: {
          createRequest: {
            requestId: randomUUID(),
            conferenceSolutionKey: { type: 'hangoutsMeet' },
          },
        },
      },
    });

    const meetLink =
      event.data.hangoutLink ||
      event.data.conferenceData?.entryPoints?.find(
        (entry) => entry.entryPointType === 'video'
      )?.uri;

    if (!meetLink) {
      return NextResponse.json(
        { error: 'Meeting was created but Google Meet link was not returned.' },
        { status: 500 }
      );
    }

    const gmailUser = process.env.GMAIL_USER;
    const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;

    if (gmailUser && gmailAppPassword) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: gmailUser, pass: gmailAppPassword },
      });

      await transporter.sendMail({
        from: `"Portfolio Scheduler" <${gmailUser}>`,
        to: OWNER_EMAIL,
        subject: `New meeting scheduled with ${name}`,
        text: [
          `Name: ${name}`,
          `Email: ${email}`,
          `Date: ${date}`,
          `Time: ${time} (${TIMEZONE})`,
          topic ? `Topic: ${topic}` : '',
          `Google Meet: ${meetLink}`,
        ].join('\n'),
      });
    }

    return NextResponse.json({
      success: true,
      meetLink,
      date,
      time,
    });
  } catch (error) {
    console.error('Schedule meeting error:', error);
    return NextResponse.json(
      { error: 'Failed to schedule meeting. Please try again.' },
      { status: 500 }
    );
  }
}
