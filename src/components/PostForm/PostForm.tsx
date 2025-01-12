import { Box, Button, TextField } from "@mui/material";
import React, { useRef } from "react";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SendIcon from "@mui/icons-material/Send";
import { useAppSelector } from "@/hooks/store.hooks";
import axios from "axios";
import toast from "react-hot-toast";

export default function PostForm() {
  const { token } = useAppSelector((store) => store.userReducer);
  const postContentRef = useRef<HTMLInputElement>(null);
  const postFileRef = useRef<HTMLInputElement>(null);

  async function createPost() {

    const content = postContentRef.current?.value || "";
    const file = postFileRef.current?.files?.[0];
    
    const postData = new FormData();
    postData.append("body", content);
    if (file) {
      postData.append("image", file);
    }
   console.log(token);
      const options = {
        
        
        url: `https://linked-posts.routemisr.com/posts`,
        method: "POST",
        headers: {
          token
        },
        data: postData,
      };

      let { data } = await axios.request(options);
      console.log(data);

      if (data.message === "success") {
        toast.success("Post has been created");
      } 
      else {
        toast.error(data.message || "Failed to create post");
      }
   
  }

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });
  return (
    <>
      <Box sx={{ width: "75%", mx: "auto" }}>
        <TextField
          fullWidth
          multiline
          minRows={5}
          placeholder="What's on your mind "
          inputRef={postContentRef}
        />
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            Upload files
            <VisuallyHiddenInput type="file" ref={postFileRef} />
          </Button>
          <Button
            onClick={createPost}
            variant="contained"
            endIcon={<SendIcon />}
          >
            Post
          </Button>
        </Box>
      </Box>
    </>
  );
}
