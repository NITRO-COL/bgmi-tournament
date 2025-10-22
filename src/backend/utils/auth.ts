import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { connectToDatabase } from '../db/connect';
import Admin from '../models/Admin';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production';

export async function verifyAdminToken() {
  try {
    // Get cookies
    const cookieStore = cookies();
    const token = cookieStore.get('adminToken')?.value;
    
    if (!token) {
      return { success: false, error: 'No token provided' };
    }
    
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string, email: string };
    
    // Connect to database
    await connectToDatabase();
    
    // Find admin
    const admin = await Admin.findById(decoded.id);
    
    if (!admin) {
      return { success: false, error: 'Admin not found' };
    }
    
    return { success: true, admin };
  } catch (error: any) {
    return { success: false, error: error.message || 'Token verification failed' };
  }
}