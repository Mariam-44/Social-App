"use client"
import { login } from "@/store/features/user.slice";
import { store } from "@/store/store";
import { Box, Button, Paper, TextField } from "@mui/material";
import { RootState } from "@/store/store";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "@/hooks/store.hooks";
import { useRouter } from "next/navigation";
import { error } from "console";

export default function page() {
    const dispatch = useAppDispatch()
    const router = useRouter()

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
        dispatch(login(values)).then((res)=>{
            if(res.payload.message === "success"){
                setTimeout(()=>{
                    router.push("/")
                },2000)
            }
        }).catch((error)=>{
            console.log({error});
            
        })
        
    },
  });
  return (
    <>
      <Box sx={{ width: "600px", mx: "auto", p: 2 }}>
        <Paper elevation={6} sx={{ p: 4, mt: 5 }}>
          <form
          onSubmit={formik.handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "15px" }}
          >
            <TextField
              fullWidth
              variant="outlined"
              label="Email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              name="email"
            />
            <TextField
              fullWidth
              variant="outlined"
              label="Password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              name="password"
            />
            <Button type="submit" variant="contained">Login</Button>
          </form>
        </Paper>
      </Box>
    </>
  );
}
