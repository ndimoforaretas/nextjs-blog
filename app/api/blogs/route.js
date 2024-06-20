import connectDB from "@/utils/database/dbConnect";
import { NextResponse } from "next/server";
import blogModel from "@/models/blogModel";
import { cloudinary } from "@/utils/cloudinary/cloudinaryConfig";

// Test GET controller
export async function GET() {
  await connectDB();

  try {
    const blogs = await blogModel.find({});
    return NextResponse.json({
      blogs,
      message: "GET controller from /api/blogs",
    });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json(
      { message: "GET error" },
      {
        status: 500,
      }
    );
  }
}

// Test POST controller
export async function POST(req) {
  const body = await req.json();

  const { title, description, image } = body;
  const uploadedImage = await cloudinary.uploader.upload(
    image,
    {
      upload_preset: "cloudinary",
      public_id: `${title}`,
      allowed_formats: [
        "jpg",
        "png",
        "jpeg",
        "gif",
        "svg",
        "webp",
        "jfif",
        "ico",
      ],
    },
    function (error, result) {
      if (error) throw error;
    }
  );

  const cloudImg = uploadedImage.secure_url;
  const cloudImgPub = uploadedImage.public_id;
  await connectDB();

  try {
    const newBlog = new blogModel({
      title,
      description,
      image: cloudImg,
      imgpub: cloudImgPub,
    });

    await newBlog.save();
    return NextResponse.json(
      { message: "Blog wurde erstellt" },
      { status: 201 }
    );
  } catch (error) {
    console.log("error", error);
    return NextResponse.json(
      { message: "POST error (create blog)" },
      {
        status: 500,
      }
    );
  }
}
