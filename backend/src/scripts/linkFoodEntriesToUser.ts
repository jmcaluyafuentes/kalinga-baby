import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Food from '../models/foodModel';

dotenv.config();

const mongoUri = process.env.MONGO_URI || 'mongo-uri';

async function linkEntriesToUser(userId: string) {
  await mongoose.connect(mongoUri);

  try {
    const result = await Food.updateMany(
      { user: { $exists: false } },
      { $set: { user: userId } }
    );
    console.log(`${result.modifiedCount} entries updated.`);
  } catch (error) {
    console.error('Error updating entries:', error);
  } finally {
    await mongoose.disconnect();
  }
}

linkEntriesToUser("68775e8acae7ec29a6be805d").then(() => {
  console.log('Done linking entries');
});
