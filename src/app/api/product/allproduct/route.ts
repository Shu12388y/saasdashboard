import { NextResponse } from 'next/server';
import { Product } from '@/app/model/Product.model';
import { connectDB } from '@/app/database/DB';

connectDB();
export const GET = async () => {
  try {
    const prodData = await Product.find({}).select('-productLink');
    if (!prodData) {
      return NextResponse.json(
        { message: 'No Product founded' },
        { status: 302 },
      );
    }
    return NextResponse.json(
      {
        message: 'success',
        data: prodData,
      },
      {
        status: 202,
      },
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
};
