import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({ error: "Feature not implemented" }, { status: 501 });
}

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
      'Access-Control-Max-Age': '86400',
    },
  });
}

// import { NextRequest, NextResponse } from "next/server";
// import cloudinary from "@/lib/cloudinary";
// import { v4 as uuidv4 } from 'uuid';

// export async function POST(request: NextRequest) {
//   try {
//     // Debug environment variables
//     console.log('CLOUDINARY_CLOUD_NAME:', process.env.CLOUDINARY_CLOUD_NAME ? 'SET' : 'MISSING');
//     console.log('CLOUDINARY_API_KEY:', process.env.CLOUDINARY_API_KEY ? 'SET' : 'MISSING');
//     console.log('CLOUDINARY_API_SECRET:', process.env.CLOUDINARY_API_SECRET ? 'SET' : 'MISSING');
    
//     // Validate Cloudinary configuration
//     if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
//       console.error('Missing Cloudinary environment variables');
//       return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
//     }

//     const formData = await request.formData();
//     const file = formData.get("file") as File;

//     if (!file) {
//       return NextResponse.json({ error: "No file provided" }, { status: 400 });
//     }

//     const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
//     if (!allowedTypes.includes(file.type)) {
//       return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
//     }

//     const arrayBuffer = await file.arrayBuffer();
//     const buffer = Buffer.from(arrayBuffer);
//     const base64 = buffer.toString('base64');
//     const dataURI = `data:${file.type};base64,${base64}`;

//     const uuid = uuidv4();
//     const result = await cloudinary.uploader.upload(dataURI, {
//       folder: 'optima-articles',
//       public_id: uuid,
//       resource_type: 'auto'
//     });

//     return NextResponse.json({ 
//       success: true, 
//       imageUrl: result.secure_url,
//       cloudinary_id: result.public_id,
//       message: "Image uploaded successfully" 
//     });
//   } catch (error) {
//     console.error("Upload error:", error);
//     return NextResponse.json({ error: "Upload failed" }, { status: 500 });
//   }
// }

// export async function OPTIONS() {
//   return new Response(null, {
//     status: 200,
//     headers: {
//       'Access-Control-Allow-Origin': '*',
//       'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
//       'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
//       'Access-Control-Max-Age': '86400',
//     },
//   });
// }