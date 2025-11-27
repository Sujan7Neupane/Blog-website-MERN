import React from "react";
import { Link } from "react-router-dom";

const Cards = ({ _id, title, featuredImage, status }) => {
  return (
    <Link
      to={`/post/${_id}`}
      className="block w-full max-w-sm sm:max-w-md md:max-w-lg"
    >
      <article className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition flex flex-col h-[400px]">
        {/* Image section */}
        <div className="h-56 md:h-64 w-full overflow-hidden">
          <img
            src={featuredImage}
            alt={title || "Post Image"}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content section */}
        <div className="flex-1 p-4 sm:p-6 flex flex-col justify-between">
          <h2 className="text-sm sm:text-xl md:text-xl font-semibold tracking-tight text-gray-900 line-clamp-2">
            {title || "Untitled Post"}
          </h2>

          <p
            className={`self-end font-medium ${
              status === "Inactive" ? "text-red-600" : "text-green-700"
            }`}
          >
            Status: {status || "Unknown"}
          </p>
        </div>
      </article>
    </Link>
  );
};

export default Cards;
