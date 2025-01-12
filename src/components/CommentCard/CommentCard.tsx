import { Box, CardHeader, IconButton, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Comment } from "@/types/posts.types";
import userPhoto from "../../assets/imgs/user.png"
export default function CommentCard({ commentInfo }: { commentInfo: Comment }) {
  
  function handleImgPath(path:string){
    if(path.includes("undefined")) return userPhoto
    else return path
  }
  
  return (
    <>
      <Box sx={{bgcolor:"#f1f1f1" , px:2 ,pb:2 , borderRadius:"8px" , my:2}}>
        <CardHeader
          avatar={
            <Image
              src={handleImgPath(commentInfo.commentCreator.photo)}
              width={50}
              height={50}
              alt={`${commentInfo.commentCreator.name} `}
            />
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={commentInfo.commentCreator.name}
          subheader={new Date(commentInfo.createdAt).toLocaleDateString()}
        />
        <Typography component={"p"} sx={{pl:5}}> {commentInfo.content}</Typography>
      </Box>
    </>
  );
}
