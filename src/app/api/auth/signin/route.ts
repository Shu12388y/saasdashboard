import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '@/app/model/User.model';

export const POST = async (request: NextRequest) => {
  try {
    const { email, password } = await request.json();
    if (!email && !password) {
      return NextResponse.json(
        { message: 'Email is requried' },
        { status: 401 },
      );
    }

    const findUser = await User.findOne({ email: email });
    if (!findUser) {
      return NextResponse.json(
        { message: 'User not founded' },
        { status: 401 },
      );
    }

    const checkPassword = await bcrypt.compare(password, findUser.password);

    if (!checkPassword) {
      return NextResponse.json({ message: 'Wrong password' }, { status: 403 });
    }

    const creatToken = await jwt.sign(
      JSON.stringify(findUser._id),
      'secertkey',
    );

    if (!creatToken) {
      return NextResponse.json({ message: 'Token Error' }, { status: 500 });
    }
    return NextResponse.json(
      { message: 'Success', token: creatToken },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
};
