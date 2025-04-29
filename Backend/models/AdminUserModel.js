import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

// Define the schema for admin users
const AdminUserSchema = new mongoose.Schema({
  aid: { type: String, required: true },        // Admin ID (custom identifier)
  name: { type: String, required: true },       // Admin's name
  email: { type: String, required: true },      // Admin's email (used for login)
  password: { type: String, required: true },   // Admin's hashed password
  createdAt: { type: Date, default: Date.now }, // Timestamp for account creation
  type: {                                       
    type: String,
    default: 'admin'                            // Role type (default set to 'admin')
  },
});

// Middleware to hash the password before saving it to the database
AdminUserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next(); // Skip hashing if password hasn't changed

  try {
    const salt = await bcrypt.genSalt(10);          // Generate salt for hashing
    this.password = await bcrypt.hash(this.password, salt); // Hash the password
    next();                                          // Continue with save
  } catch (error) {
    next(error);                                     // Pass error to Mongoose
  }
});

// Instance method to compare input password with stored hashed password
AdminUserSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password); // Return true/false
  } catch (error) {
    throw new Error(error); // Handle errors during comparison
  }
};

// Create and export the AdminUser model based on the schema
const AdminUser = mongoose.model('AdminUser', AdminUserSchema);

export default AdminUser;
