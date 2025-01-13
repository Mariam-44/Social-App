"use client";
import * as React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  CardActions,
  IconButton,
  Typography,
  Divider,
  Box,
  Button,
  TextField,
} from "@mui/material";
import {
  ThumbUp as ThumbUpIcon,
  Share as ShareIcon,
  Comment as CommentIcon,
  MoreVert as MoreVertIcon,
} from "@mui/icons-material";
import { Post } from "@/types/posts.types";
import Image from "next/image";
import CommentCard from "../CommentCard/CommentCard";
import Link from "next/link";

export default function PostCard({
  postInfo,
  showAllComments = false,
}: {
  postInfo: Post;
  showAllComments?: boolean;
}) {
  const [liked, setLiked] = React.useState(false); 

  const postKey = `liked_${postInfo._id}`;


  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLiked = localStorage.getItem(postKey);
      setLiked(storedLiked === "true");
    }
  }, [postKey]);

 
  const toggleLike = () => {
    const newLikedState = !liked;
    setLiked(newLikedState);

    if (typeof window !== "undefined") {
      localStorage.setItem(postKey, String(newLikedState));
    }
  };

  return (
    <Card sx={{ maxWidth: "75%", mx: "auto", mt: 3 }}>
      <CardHeader
        avatar={
          <Image
            src={postInfo.user.photo}
            width={50}
            height={50}
            alt={`${postInfo.user.name} profile image`}
          />
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={postInfo.user.name}
        subheader={new Date(postInfo.createdAt).toLocaleDateString()}
      />
      <CardContent>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {postInfo.body}
        </Typography>
      </CardContent>
      {postInfo.image && (
        <CardMedia
          component="img"
          height="250"
          image={postInfo.image}
          alt="Post image"
        />
      )}

      <CardActions disableSpacing>
        <IconButton
          aria-label="like"
          onClick={toggleLike}
          sx={{ color: liked ? "blue" : "inherit" }}
        >
          <ThumbUpIcon />
        </IconButton>
        <IconButton aria-label="comment">
          <CommentIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
      <Divider>Comments</Divider>
      <Box sx={{ p: 2 }}>
        {postInfo.comments?.length > 0 && !showAllComments && (
          <CommentCard commentInfo={postInfo.comments[0]} />
        )}
        {postInfo.comments?.length > 1 &&
          showAllComments &&
          postInfo.comments.map((comment) => (
            <CommentCard key={comment._id} commentInfo={comment} />
          ))}
        {!showAllComments && postInfo.comments.length > 1 && (
          <Link href={`/post/${postInfo._id}`} passHref>
            <Button variant="contained" fullWidth sx={{ my: 2 }}>
              Show More Comments
            </Button>
          </Link>
        )}

        <TextField
          multiline
          fullWidth
          minRows={2}
          placeholder="Add your comment"
          sx={{ mt: 1 }}
        />
      </Box>
    </Card>
  );
}
