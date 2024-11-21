import { NextResponse, NextRequest } from 'next/server';
import { User } from '@/app/model/User.model';
import brcypt from 'bcrypt';
import { connectDB } from '@/app/database/DB';

connectDB();
export const POST = async (request: NextRequest) => {
  try {
    const { username, email, password } = await request.json();
    if (!username && !email && !password) {
      return NextResponse.json(
        { messsage: 'Every field is required' },
        { status: 401 },
      );
    }

    const findUser = await User.findOne({ email: email });

    if (findUser) {
      return NextResponse.json(
        { message: 'Email already exist' },
        { status: 401 },
      );
    }

    const hashPassword = await brcypt.hash(password, 10);

    const createNewUser = await new User({
      username,
      email,
      password: hashPassword,
    });

    await createNewUser.save();
    return NextResponse.json({ message: 'User created' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
};
