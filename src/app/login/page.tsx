"use client"
import { signIn, useSession } from "next-auth/react";
import { useFormik } from "formik";
import React from "react";
import * as Yup from 'yup';
import styled from "styled-components";
import { useRouter } from "next/navigation";


import {
    TextField,
    Button,
    Typography,
    Box,
    Link,
} from '@mui/material';


interface RegistrationFormValues{
    email: string;
    password: string;
}

export default function Login (){

    const router = useRouter();

    const {data: session} = useSession();
    console.log(session);

    const initialValues: RegistrationFormValues = {
        email: '',
        password: '',
    };

    const validationSchema = Yup.object({
        email: Yup.string()
        .email()
        .required(),

        password: Yup.string()
        .required()
        .min(6),
    });

    const onSubmit = ( values: RegistrationFormValues) => {
        console.log("Form data", values);
        router.push('/');
    };

    const formik = useFormik({
        initialValues, validationSchema, onSubmit,
    });

    return(
    <Box sx={{backgroundColor: "white", width: "400px", borderRadius: "20px", padding: "35px 50px", border: "2px solid", boxShadow: "0px 0px 20px 5px rgba(117, 117, 117, 0.692)"}}>
        <Typography variant="h4" sx={{textAlign: "center", color: "black"}}>Login</Typography>
            <form onSubmit={formik.handleSubmit}>
            <TextField sx={{width: "100%", marginTop: "20px"}} id="email" label="Email" variant="outlined" 
            {...formik.getFieldProps('email')} 
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}/>

            <TextField sx={{width: "100%", marginTop: "10px"}} id="password" label="Password" variant="outlined" 
            {...formik.getFieldProps('password')} 
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}/>
                    
            <Typography sx={{textAlign: "center", color: "black", marginTop: "20px", marginBottom: "20px"}}>Can't have an account?<Link sx={{textDecoration: "none", cursor: "pointer"}} href="/signup"> Sign In</Link></Typography>

            <Button sx={{width: "100%", height: "50px"}} variant="contained" color="primary" type="submit">Login</Button>

            <div className="line"><hr  className="hr1"/><p style={{color: "black"}}>Or</p><hr className="hr2"/></div>
            </form>

            <div className="mainbtndiv">
                <div className="imgdiv">
                    <img src="" alt="" />
                </div>
                <button className="btn" onClick={()=>signIn("google")}>Sign up with google</button>
            </div>

            <div className="mainbtndiv1">
                <div className="imgdiv1">
                    <img src="" alt="" />
                </div>
                <button className="btn1" onClick={()=>signIn("Facebook")}>Sign up with Facebook</button>
             </div>
            </Box>
        

    )
}