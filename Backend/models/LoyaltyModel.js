import mongoose from 'mongoose';

// Loyalty Schema
const LoyaltySchema = new mongoose.Schema({
  ID: { // Define the ID field (used as a custom unique identifier, if needed)
    type: String,
    unique: true, // Ensure that each ID is unique
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the User model
    ref: 'User',
    required: true, // Each loyalty entry must be linked to a user
  },
  phoneNumber: {
    type: String,
    required: true, // Phone number is required
    unique: true,   // Ensure each phone number is unique in the database
  },
  points: {
    type: Number,
    default: 0, // Initial loyalty points start at 0
  },
  redeemedPoints: {
    type: Number,
    default: 0, // Track how many points have been redeemed by the user
  },
  expirationDate: {
    type: Date,
    default: function () {
      const currentYear = new Date().getFullYear();
      return new Date(currentYear, 11, 31); // Sets expiration to December 31 of the current year
    },
  },
  createdAt: {
    type: Date,
    default: Date.now, // Timestamp when the loyalty account is created
  },
});

// Static method to reset points after expiration
LoyaltySchema.statics.checkAndResetExpiredPoints = async function () {
  const currentDate = new Date();

  // Find all loyalty accounts where the expiration date has passed
  const loyaltyAccounts = await this.find({
    expirationDate: { $lt: currentDate },
  });

  // Loop through expired accounts and reset their points
  loyaltyAccounts.forEach(async (account) => {
    account.points = 0; // Reset unused points to 0
    account.expirationDate = new Date(currentDate.getFullYear(), 11, 31); // Set new expiration date for this year
    await account.save(); // Save the updated account
  });
};

const Loyalty = mongoose.model('Loyalty', LoyaltySchema);
export default Loyalty;
