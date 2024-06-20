"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getBlogs } from "@/utils/actions/blogActions";

export default function Home() {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    const fetchedblogs = await getBlogs();
    console.log(fetchedblogs);
    setBlogs(fetchedblogs.blogs);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center  p-24">
      <h1 className="text-4xl font-bold text-center mb-10">
        Welcome to the Next.js Blog
      </h1>
      {blogs?.length > 0 ? (
        <div className="flex flex-col gap-4 lg:flex-row flex-wrap">
          {blogs.map((blog) => (
            <div
              className="card w-96  bg-slate-200 text-slate-900 shadow-lg shadow-cyan-300"
              key={blog._id}>
              <figure>
                <Image
                  src={blog.image}
                  alt={blog.title}
                  width={400}
                  height={100}
                  priority
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{blog.title}</h2>
                <p>{blog.description}</p>
                <div className="card-actions justify-end">
                  <Link href={`/blog/${blog._id}`}>
                    <button className="btn btn-primary">Details</button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No blogs found</p>
      )}
    </main>
  );
}
