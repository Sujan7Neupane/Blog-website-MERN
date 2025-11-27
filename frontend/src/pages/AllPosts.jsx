import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Cards, Container } from "../components/index";
import axios from "axios";
import { setError, setPosts } from "../store/postSlice";

const AllPosts = () => {
  const { posts, error } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("/api/v1/posts/all", {
          withCredentials: true,
        });
        console.log(response);

        const postList = response?.data?.data || [];

        dispatch(setPosts(postList));
      } catch (err) {
        const msg =
          err?.response?.data?.message || "Error fetching current posts";

        dispatch(setError(msg));
        console.error("POST ERROR:", err);
      }
    };

    fetchPosts();
  }, [dispatch]);

  return (
    <Container>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts && posts.length > 0 ? (
          posts.map((post) => <Cards key={post._id} {...post} />)
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No posts available
          </p>
        )}
      </div>
    </Container>
  );
};

export default AllPosts;
