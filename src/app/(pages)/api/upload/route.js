
import { getFileName } from '@/lib/helpers/getFileName';
import AWS from 'aws-sdk';
import { NextResponse } from 'next/server';


const documentFolder = "documents"

const s3 = new AWS.S3({
    // accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    // secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

export async function POST(req) {

    const formData = await req.formData();
    const file = formData.get('file');

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const fileName = getFileName(file.name);
    const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: `${documentFolder}/${fileName}`,
        ContentType: file.type,
        Body: buffer,
    };

    try {
        const uploadResult = await s3.upload(params).promise();
        return NextResponse.json(
            {
                message: 'File uploaded successfully!',
                fileURL: uploadResult.Location,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                error: 'File upload failed',
            },
            { status: 500 }
        );
    }

}