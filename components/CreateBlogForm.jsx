"use client";
import { useState } from "react";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const CreateBlogForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [message, setMessage] = useState(null);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!title) newErrors.title = "Title is required";
    if (!description) newErrors.description = "Description is required";
    if (!imageUrl) newErrors.image = "Image is required";
    return newErrors;
  };

  const createProducts = async (url, data) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { id, value, files } = e.target;

    if (id === "image") {
      handleImageChange(files[0], e);
    } else {
      handleTextChange(id, value);
    }
  };

  const handleImageChange = (imageFile, e) => {
    if (
      imageFile &&
      (imageFile.type === "image/png" || imageFile.type === "image/jpeg") &&
      imageFile.size <= 5000000
    ) {
      const readFile = new FileReader();
      readFile.readAsDataURL(imageFile);
      readFile.onloadend = () => {
        setImageUrl(readFile.result);
        setErrors((prevErrors) => ({ ...prevErrors, image: null }));
      };
    } else {
      e.target.value = null;
      setImageUrl("");
      setErrors((prevErrors) => ({
        ...prevErrors,
        image: "Invalid file type or size",
      }));
    }
  };

  const handleTextChange = (id, value) => {
    if (id === "title") {
      setTitle(value);
      if (value) setErrors((prevErrors) => ({ ...prevErrors, title: null }));
    } else if (id === "description") {
      setDescription(value);
      if (value)
        setErrors((prevErrors) => ({ ...prevErrors, description: null }));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const productData = {
      title,
      description,
      image: imageUrl,
    };
    console.log("Form data: ", productData); // log the form data

    const response = await createProducts(baseUrl, productData);

    setMessage(response.message);

    // Reset the image URL
    setImageUrl("");

    // Clear the form
    e.target.reset();
    setTitle("");
    setDescription("");
    setErrors({});
  };

  return (
    <>
      <>
        <h1 className="mb-12 text-center text-3xl font-bold capitalize text-primary">
          Create a Blog
        </h1>
        {message && (
          <p className="mt-3 text-xs font-bold text-green-500">{message}</p>
        )}
      </>

      <form onSubmit={handleFormSubmit} className="m-x-auto w-full">
        <div className="flex flex-col gap-8 sm:flex-row lg:gap-16">
          <div className="lg:w-1/2">
            <div className="form-control w-full">
              <label className="label" htmlFor="title">
                <span className="label-text">Title</span>
              </label>
              <input
                type="text"
                id="title"
                className="input input-bordered w-full"
                placeholder="Enter blog title"
                value={title}
                onChange={handleChange}
              />
              {errors.title && (
                <p className="mt-1 text-xs text-red-500">{errors.title}</p>
              )}
            </div>

            <div className="form-control w-full">
              <label className="label" htmlFor="description">
                <span className="label-text">Description</span>
              </label>
              <textarea
                id="description"
                className="textarea textarea-bordered w-full resize-none"
                placeholder="Enter description"
                rows={3}
                value={description}
                onChange={handleChange}></textarea>
              {errors.description && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.description}
                </p>
              )}
            </div>
          </div>
          <div className="lg:w-1/2">
            <div className="form-control w-full">
              <label className="label" htmlFor="image">
                <span className="label-text">Upload an Image:</span>
              </label>
              <input
                type="file"
                id="image"
                className="file-input file-input-primary w-full max-w-xs"
                onChange={handleChange}
                accept="image/png, image/jpg, image/jpeg, image/gif"
              />
              {errors.image && (
                <p className="mt-1 text-xs text-red-500">{errors.image}</p>
              )}
            </div>
            {imageUrl && (
              <img
                src={imageUrl}
                alt="Uploaded Preview"
                className="mt-3 w-full max-w-xs"
              />
            )}
          </div>
        </div>

        <button type="submit" className="btn btn-primary mt-3">
          Submit
        </button>
      </form>
    </>
  );
};

export default CreateBlogForm;
