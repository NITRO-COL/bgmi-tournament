import mongoose, { Document, Schema } from 'mongoose';

export interface ITeam extends Document {
  teamName: string;
  playerNames: string[];
  email: string;
  phone: string;
  registeredAt: Date;
}

const TeamSchema: Schema = new Schema({
  teamName: {
    type: String,
    required: true,
    trim: true
  },
  playerNames: {
    type: [String],
    required: true,
    validate: {
      validator: function (arr: string[]) {
        return arr.length === 4 && arr.every(name => name.trim() !== '');
      },
      message: 'Exactly 4 player names are required'
    }
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  registeredAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Team || mongoose.model<ITeam>('Team', TeamSchema);