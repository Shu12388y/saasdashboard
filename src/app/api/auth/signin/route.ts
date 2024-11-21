import { NextResponse, NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const data = await request.formData();
    console.log(data);
    // Redirect to "/" after successfully processing the form data
    return NextResponse.redirect(new URL("/", request.url));
  } catch (error: any) {
    console.error("Error processing form data:", error);

    // Return an error response
    return NextResponse.json(
      {
        error: "Failed to process the form data",
        message: error.message,
      },
      { status: 500 }
    );
  }
};
