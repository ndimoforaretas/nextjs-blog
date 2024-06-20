import blogModel from "@/models/blogModel";
import { cloudinary } from "@/utils/cloudinary/cloudinaryConfig";
import connectDB from "@/utils/database/dbConnect";
import { NextResponse } from "next/server";

// Get Blog by ID
export async function GET(req, { params }) {
  await connectDB();
  console.log(params);
  const { id } = params;

  try {
    const blog = await blogModel.findById(id);
    return NextResponse.json({
      blog,
      message: "Blog by ID successfully fetched",
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

// Delete Blog by ID
export async function DELETE(req, { params }) {
  await connectDB();

  try {
    const { id } = params;
    const blog = await blogModel.findById(id);

    if (blog) {
      // lösche das Bild in Cloudinary
      await cloudinary.uploader.destroy(blog.imgpub);
      // lösche dem Blog vom Datenbank
      await blogModel.deleteOne({ _id: id });
      return NextResponse.json(
        {
          message: "Blog erfolgreich gelöscht",
        },
        {
          status: 200,
        }
      );
    } else {
      throw new Error("Blog nicht gefunden!");
    }
  } catch (error) {
    console.log("error", error);
    return NextResponse.json(
      { message: "DELETE error" },
      {
        status: 500,
      }
    );
  }
}
