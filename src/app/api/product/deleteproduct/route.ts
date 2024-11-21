import { NextRequest, NextResponse } from 'next/server';

export const POST = async (request: NextRequest) => {
  try {
    const data = await request.formData();
    console.log(data);

    return NextResponse.json(
      {
        message: 'Created',
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
};
