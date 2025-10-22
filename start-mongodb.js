// This script provides instructions for setting up MongoDB locally
console.log(`
=====================================
MongoDB Setup Instructions
=====================================

To run this application with MongoDB, you have two options:

Option 1: Use MongoDB Atlas (Cloud - Recommended for beginners)
1. Visit https://www.mongodb.com/cloud/atlas/register
2. Create a free cluster
3. Get your connection string
4. Add it to your .env.local file:
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/bgmi-tournament

Option 2: Install MongoDB locally
1. Download MongoDB Community Server:
   https://www.mongodb.com/try/download/community
2. Install MongoDB following the official documentation:
   https://docs.mongodb.com/manual/installation/
3. Start MongoDB service:
   - On Windows: net start MongoDB
   - On macOS/Linux: sudo systemctl start mongod
4. Update your .env.local file:
   MONGODB_URI=mongodb://localhost:27017/bgmi-tournament

After setting up MongoDB, run the application with:
npm run dev

For more help, check the README.md file.
`);