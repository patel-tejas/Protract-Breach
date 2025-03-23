import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  walletAddress: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  image_url: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});


// Check if model already exists
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;