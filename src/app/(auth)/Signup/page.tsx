"use client";

import { Box, Button, Paper, TextField, MenuItem } from "@mui/material";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { signup } from "@/store/features/user.slice";
import { useAppDispatch } from "@/hooks/store.hooks";
import toast from "react-hot-toast";

export default function Page() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
    },
    onSubmit: (values) => {
           dispatch(signup(values)).then((res)=>{
               if(res.payload.message === "success"){
                   setTimeout(()=>{
                       router.push("/Login")
                   },2000)
               }
           }).catch((error)=>{
               console.log({error});
               
           })
           
       },
  });

  return (
    <Box sx={{ width: "600px", mx: "auto", p: 2 }}>
      <Paper elevation={6} sx={{ p: 4, mt: 5 }}>
        <form
          onSubmit={formik.handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "15px" }}
        >
          <TextField
            fullWidth
            variant="outlined"
            label="Name"
            type="text"
            value={formik.values.name}
            onChange={formik.handleChange}
            name="name"
          />
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
          <TextField
            fullWidth
            variant="outlined"
            label="Confirm Password"
            type="password"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            name="rePassword"
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Date of Birth"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formik.values.dateOfBirth}
            onChange={formik.handleChange}
            name="dateOfBirth"
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Gender"
            select
            value={formik.values.gender}
            onChange={formik.handleChange}
            name="gender"
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
          </TextField>
          <Button type="submit" variant="contained">
            Signup
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
