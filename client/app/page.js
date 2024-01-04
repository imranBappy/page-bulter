"use client";
import { useEffect, useState } from "react";

import Link from "next/link";

export default function Home() {
  const [data, setData] = useState([]);
  const [post, setPost] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/post")
      .then((res) => res.json())
      .then((res) => {
        setData(res.data);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:5000/api/v1/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    })
      .then((res) => res.json())
      .then((res) => {
        setData([...data, res.data]);
        setPost({
          title: "",
          content: "",
        });
      });
  };

  return (
    <main className=" container m-auto p-5 ">
      <div className="w-1/2 m-auto p-5 border border-gray-300 rounded-md shadow-md">
        <h5 className="text-center py-3 text-2xl font-bold">Add Post</h5>
        <form className="flex flex-col space-y-3" onSubmit={handleSubmit}>
          <input
            required={true}
            className="border border-gray-300 rounded-md p-2"
            type="text"
            name="title"
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
          />
          <input
            required={true}
            className="border border-gray-300 rounded-md p-2"
            type="text"
            name="content"
            value={post.content}
            onChange={(e) => setPost({ ...post, content: e.target.value })}
          />
          <input
            className="bg-blue-500 text-white rounded-md p-2 cursor-pointer"
            onClick={handleSubmit}
            type="submit"
            value="Add"
          />
        </form>
      </div>
      <div
        className="
      w-1/2 m-auto p-5 border border-gray-300 rounded-md shadow-md mt-5
      "
      >
        <h5 className="text-center py-3 text-2xl font-bold">Posts</h5>
        <div className=" ">
          {data?.map((post) => (
            <div
              key={post._id}
              className="  w-full m-auto p-5 border border-gray-300 rounded-md shadow-md mt-5 "
            >
              <Link href={`/${post._id}`}>
                <h3 className=" text-center py-3 text-2xl font-bold ">
                  {post.title}
                </h3>
              </Link>

              <p className="  text-center py-3  line-clamp-2  ">
                {post.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
