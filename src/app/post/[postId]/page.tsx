'use client';

import Loading from "@/components/Loading/Loading";
import PostCard from "@/components/PostCard/PostCard";
import { useAppDispatch, useAppSelector } from "@/hooks/store.hooks";
import { getPostDetails } from "@/store/features/posts.slice";
import { useEffect } from "react";

export default async function Page({ params }: { params: Promise<{ postId: string }> }) {
  const { postId } = await params; 
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPostDetails(postId));
  }, [dispatch, postId]);

  const { postDetails } = useAppSelector((store) => store.PostsReduser);

  return (
    <>
      {postDetails ? (
        <PostCard postInfo={postDetails} showAllComments={true} />
      ) : (
        <Loading />
      )}
    </>
  );
}
