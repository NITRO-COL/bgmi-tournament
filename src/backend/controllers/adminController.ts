import { connectToDatabase } from '../db/connect';
import Admin from '../models/Admin';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production';

export async function loginAdmin(email: string, password: string) {
  try {
    // Connect to database
    await connectToDatabase();
    
    // Find admin by email
    const admin = await Admin.findOne({ email });
    
    if (!admin) {
      throw new Error('Admin not found');
    }
    
    // Check password
    const isMatch = await admin.comparePassword(password);
    
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      JWT_SECRET,
      { expiresIn: '1h' }
    );
    
    return {
      success: true,
      token,
      admin: {
        id: admin._id,
        email: admin.email
      }
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Server error'
    };
  }
}

export async function createDefaultAdmin() {
  try {
    await connectToDatabase();
    
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: 'Scripty@admin.in' });
    
    if (existingAdmin) {
      console.log('Default admin already exists');
      return;
    }
    
    // Create default admin
    const admin = new Admin({
      email: 'Scripty@admin.in',
      password: 'scripty@123'
    });
    
    await admin.save();
    console.log('Default admin created successfully');
  } catch (error) {
    console.error('Error creating default admin:', error);
  }
}