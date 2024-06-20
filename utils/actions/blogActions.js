"use server";

// get all blogs
export async function getBlogs() {
  try {
    const res = await fetch(process.env.BASE_URL, {
      cache: "no-cache",
    });
    return res.json();
  } catch (error) {
    console.error("Error fetching blogs", error);
  }
}
// delete function

export const deleteBlog = async (baseUrl, blogId) => {
  try {
    const res = await fetch(`${baseUrl}/${blogId}`, {
      method: "DELETE",
    });
    await res.json();

    return;
  } catch (error) {
    console.error(error);
  }
};
