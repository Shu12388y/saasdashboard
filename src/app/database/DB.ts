import mongoose, { Connection } from 'mongoose';

export const connectDB = async (): Promise<Connection | void> => {
  try {
    const connection = await mongoose.connect(process.env.DB! as string);
    if (connection) {
      console.log('database connected');
    }
  } catch (error: unknown) {
    console.log(error);
  }
};
