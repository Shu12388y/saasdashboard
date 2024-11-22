import { NextRequest, NextResponse } from 'next/server';
import AWS from 'aws-sdk';
import { connectDB } from '@/app/database/DB';
import { Product } from '@/app/model/Product.model';

// Initialize AWS SDK
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

connectDB();
export const POST = async (request: NextRequest) => {
  try {
    // Parse FormData
    const data = await request.formData();
    const title = data.get('title') as string;
    const description = data.get('description') as string;
    const deployLink = data.get('deployLink') as string;
    const image = data.get('image') as File | null;
    const productLink = data.get('productLink') as File | null;
    const type = data.get('type') as string;
    const price = data.get('price') as string;
    const category = data.get('category') as string;

    if (!image || !productLink) {
      return NextResponse.json(
        { message: 'Files are missing' },
        { status: 400 },
      );
    }

    // Upload images to S3
    const uploadFileToS3 = async (file: File, keyPrefix: string) => {
      // Convert File to Buffer
      const buffer = Buffer.from(await file.arrayBuffer());

      const params: AWS.S3.PutObjectRequest = {
        Bucket: process.env.S3_BUCKET_NAME!,
        Key: `${keyPrefix}/${file.name}`,
        Body: buffer, // Use Buffer here
        ContentType: file.type,
      };

      const uploadResult = await s3.upload(params).promise();
      return uploadResult.Location; // Return the S3 file URL
    };

    // Upload files
    const imageUrl = await uploadFileToS3(image, 'images');
    const productLinkUrl = await uploadFileToS3(productLink, 'productLinks');

    // Construct response data
    const responseData = {
      title,
      description,
      deployLink,
      price,
      type,
      productLink: productLinkUrl,
      imageUrl,
      category,
    };

    const createNewProduct = await new Product(responseData);
    await createNewProduct.save();
    return NextResponse.json(
      {
        message: 'Created',
        data: responseData,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error('Error uploading to S3:', error);
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 },
    );
  }
};
