import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Team, { ITeam } from '@/models/Team';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.teamName || !data.playerNames || !data.email || !data.phone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Connect to MongoDB
    await connectToDatabase();
    
    // Create team object
    const team = new Team({
      teamName: data.teamName,
      playerNames: data.playerNames,
      email: data.email,
      phone: data.phone
    });
    
    // Save to database
    const savedTeam = await team.save();
    
    return NextResponse.json(
      { message: 'Team registered successfully', teamId: savedTeam._id },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Registration error:', error);
    
    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to register team' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Connect to MongoDB
    await connectToDatabase();
    
    // Fetch all teams
    const teams = await Team.find({}).sort({ registeredAt: -1 });
    
    return NextResponse.json({ teams });
  } catch (error) {
    console.error('Fetch teams error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch teams' },
      { status: 500 }
    );
  }
}