# Twitter Clone

A modern Twitter clone built with Next.js 14, React, MongoDB, and Prisma. Features real-time updates, image uploads, and user authentication.

## Features

- 🔐 Authentication with NextAuth
- 📝 Create, edit, and delete tweets
- 💭 Comment on tweets
- ❤️ Like and retweet functionality
- 👥 Follow/unfollow users
- 🖼️ Image upload support
- 🌙 Responsive design
- 🔍 User search functionality
- 📱 Mobile-friendly interface

## Tech Stack

- **Frontend:** React, Next.js 14, TailwindCSS
- **Backend:** Next.js API Routes, Prisma
- **Database:** MongoDB
- **Authentication:** NextAuth.js
- **File Upload:** UploadThing
- **State Management:** Zustand
- **Deployment:** Vercel

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   DATABASE_URL="your_mongodb_url"
   NEXTAUTH_SECRET="your_nextauth_secret"
   NEXTAUTH_URL="http://localhost:3000"
   UPLOADTHING_SECRET="your_uploadthing_secret"
   UPLOADTHING_APP_ID="your_uploadthing_app_id"
   ```
4. Set up the database:
   ```bash
   npx prisma generate
   npx prisma db push
   ```
5. Run the development server:
   ```bash
   npm run dev
   ```

## Deployment

The project is configured for easy deployment on Vercel. Simply connect your GitHub repository to Vercel and it will automatically deploy your changes.

## License

MIT
