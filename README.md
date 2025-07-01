Real-Time Check-In App

A real-time event check-in system using React Native and Node.js.

Tech Stack

- Frontend: React Native (Expo)
- Backend: Node.js, GraphQL (Apollo), Prisma
- Database: PostgreSQL
- Real-time: Socket.IO

 Getting Started

cd backend
npm install
npx prisma generate
npx prisma migrate dev
npm run dev
Ensure PostgreSQL is running and `.env` has a valid `DATABASE_URL`.

cd frontend
npm install
npx expo start

- Use Expo Go on your phone to scan the QR code.
- Use your local IP in frontend for API and socket URLs.
- Phone and backend must be on the same Wi-Fi network.
