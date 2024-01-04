"use client";

import React, { useEffect, useState } from "react";
const PostDetails = ({ params }) => {
  console.log(params);
  const [post, setPost] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`http://localhost:5000/api/v1/post/${params.id}`);
      const resData = await res.json();
      setPost(resData.data);
    };
    fetchData();
  }, []);

  return (
    <div className="  ">
      <div className="  w-full m-auto p-5 border border-gray-300 rounded-md shadow-md mt-5 ">
        <h3 className=" text-center py-3 text-2xl font-bold ">{post.title}</h3>
        <p className="  text-center py-3  ">{post.content}</p>
      </div>
    </div>
  );
};

export default PostDetails;
