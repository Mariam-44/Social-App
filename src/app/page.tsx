"use client";

import Loading from "@/components/Loading/Loading";
import PostCard from "@/components/PostCard/PostCard";
import PostForm from "@/components/PostForm/PostForm";
import { useAppDispatch, useAppSelector } from "@/hooks/store.hooks";
import { getPosts } from "@/store/features/posts.slice";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { posts } = useAppSelector((store) => store.PostsReduser);
  const dispatch = useAppDispatch();
  const router = useRouter();

  // Check for authentication
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/Signup");
    }
  }, [router]);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <Box>
      <Grid container spacing={2}>
       
        <Grid item xs={12} sm={1} md={2}></Grid>

       
        <Grid item xs={12} sm={9} md={8} sx={{ p: 2  , mt:2}}>
          <PostForm />
          {posts
            ? posts.map((post) => <PostCard key={post._id} postInfo={post} />)
            : <Loading />}
        </Grid>

      
        <Grid item xs={12} sm={1} md={2}></Grid>
      </Grid>
    </Box>
  );
}
