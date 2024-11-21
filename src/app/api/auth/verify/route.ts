import { NextResponse, NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import { User } from '@/app/model/User.model';
import { connectDB } from '@/app/database/DB';

connectDB();
export const POST = async (request: NextRequest) => {
  try {
    const { token } = await request.json();
    if (!token) {
      return NextResponse.json({ message: 'Token required' }, { status: 403 });
    }

    const verifyToken = await jwt.verify(token, 'secertkey');

    if (!verifyToken) {
      return NextResponse.json({ message: 'Verify failed' }, { status: 403 });
    }

    const findUser = await User.findById({
      _id: JSON.parse(verifyToken as string),
    }).select('-password');
    return NextResponse.json(
      { message: 'verified', data: findUser },
      { status: 202 },
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
};
