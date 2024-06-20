"use server";
import BlogDetailsComponent from "@/components/BlogDetailsComponent";

async function getBlogDetails(baseUrl, blogId) {
  try {
    const res = await fetch(`${baseUrl}/${blogId}`);
    const data = await res.json();

    return data;
  } catch (error) {
    console.error(error);
  }
}

const BlogDetails = async ({ params }) => {
  const { id } = params;
  const url = process.env.NEXT_PUBLIC_BASE_URL;

  const fetchedBlog = await getBlogDetails(url, id);

  const { blog } = fetchedBlog;

  return (
    <BlogDetailsComponent
      title={blog.title}
      description={blog.description}
      image={blog.image}
      url={url}
      id={id}
    />
  );
};
export default BlogDetails;
