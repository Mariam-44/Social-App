'use client';

import Loading from "@/components/Loading/Loading";
import PostCard from "@/components/PostCard/PostCard";
import { useAppDispatch, useAppSelector } from "@/hooks/store.hooks";
import { getPostDetails } from "@/store/features/posts.slice";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: Promise<{ postId: string }> }) {
 
  const [resolvedParams, setResolvedParams] = useState<{ postId: string } | null>(null);

  useEffect(() => {

    params.then((data) => {
      setResolvedParams(data);
    });
  }, [params]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (resolvedParams?.postId) {
      dispatch(getPostDetails(resolvedParams.postId));
    }
  }, [dispatch, resolvedParams]);

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
