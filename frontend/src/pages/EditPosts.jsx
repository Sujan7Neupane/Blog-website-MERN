import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Container, PostForm } from "../components/index";
import axios from "axios";
import {
  setPost,
  setLoading,
  setError,
  clearError,
  updatePostInState,
} from "../store/postSlice";

const EditPosts = () => {
  const { post, loading, error } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams(); // Post ID from route
  const [localLoading, setLocalLoading] = useState(true); // Local fetch loading

  // Fetch post from backend
  useEffect(() => {
    const fetchPost = async () => {
      dispatch(setLoading(true));
      dispatch(clearError());

      try {
        const res = await axios.get(`/api/v1/posts/p/${id}`, {
          withCredentials: true,
        });
        dispatch(setPost(res.data.data || res.data));
        setLocalLoading(false);
        dispatch(setLoading(false));
      } catch (err) {
        const msg = err.response?.data?.message || err.message;
        console.error(msg);
        dispatch(setError(msg));
        setLocalLoading(false);
        dispatch(setLoading(false));
        navigate("/"); // Redirect if post not found
      }
    };

    fetchPost();
  }, [id, dispatch, navigate]);

  // Handle post update
  const handleUpdate = async (formData) => {
    try {
      const res = await axios.put(
        `/api/v1/posts/update/${post._id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" }, // for optional image upload
          withCredentials: true,
        }
      );

      dispatch(updatePostInState(res.data.data)); // Update Redux
      navigate(`/post/${id}`); // Redirect after update
    } catch (err) {
      const msg = err.response?.data?.message || err.message;
      console.error(msg);
      dispatch(setError(msg));
    }
  };

  if (loading || localLoading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center text-red-600">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <Container>
      {post && <PostForm post={post} onSubmit={handleUpdate} />}
    </Container>
  );
};

export default EditPosts;
