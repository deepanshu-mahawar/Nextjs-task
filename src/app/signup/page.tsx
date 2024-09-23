"use client"
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import React from "react";
import * as Yup from 'yup';
import styled from "styled-components";
import { signIn, useSession } from "next-auth/react";

import {
    TextField,
    Button,
    Typography,
    Box,
    Link,
  } from '@mui/material';

interface RegistrationFormValues{
    firstname: string;
    lastname: string;
    phone: string;
    email: string;
    password: string;
    cpassword: string;
}

export default function Signup (){

    const router = useRouter();

    const {data: session} = useSession();
    console.log(session);

    const initialValues: RegistrationFormValues = {
    firstname: '',
    lastname: '',
    phone: '',
    email: '',
    password: '',
    cpassword: '',
    };

    const validationSchema = Yup.object({
        firstname: Yup.string()
        .required("Required"),

        lastname: Yup.string()
        .required("Required"),

        phone: Yup.string()
        .matches(/^\d{10}$/, "Phone number must be 10 digits")
        .required("Required"),

        email: Yup.string()
        .email("invalid email")
        .required("Required"),

        password: Yup.string()
        .required("Required")
        .min(8, "Password must be at least 8 character")
        .matches(/[!@#$%^&*(),.?":{}|<>]/, "contain atleast one symbol")
        .matches(/[0-9]/, "contain atleast one number")
        .matches(/[A-Z]/,"contain atleast one uppercase letter")
        .matches(/[a-z]/,"contain atleast one lowercase letter"),

        cpassword: Yup.string()
        .oneOf([Yup.ref("password")], "Password must match")
        .required("Required")
    });

    const onSubmit = ( values: RegistrationFormValues) => {
        console.log("Form data", values);
        router.push('/');
    };

    const formik = useFormik({
        initialValues, validationSchema, onSubmit,
    });



    return(
        
            <Box sx={{backgroundColor: "white", width: "400px", borderRadius: "20px", padding: "35px 50px", boxShadow: "0px 0px 20px 5px rgba(117, 117, 117, 0.692)"}}>
                <Typography variant="h4" sx={{textAlign: "center", color: "black"}}>Sign Up</Typography>

                <form onSubmit={formik.handleSubmit}>
                    <TextField sx={{width: "100%",  marginTop: "20px"}} id="firstname" label="Firstname" variant="outlined" 
                    {...formik.getFieldProps('firstname')} 
                    error={formik.touched.firstname && Boolean(formik.errors.firstname)}
                    helperText={formik.touched.firstname && formik.errors.firstname}/>

                    <TextField sx={{width: "100%", marginTop: "10px"}} id="lastname" label="Lastname" variant="outlined"
                    {...formik.getFieldProps('lastname')} 
                    error={formik.touched.lastname && Boolean(formik.errors.lastname)}
                    helperText={formik.touched.lastname && formik.errors.lastname}/>
                    
                    <TextField sx={{width: "100%", marginTop: "10px"}} id="phone" label="Phone" variant="outlined"
                    {...formik.getFieldProps('phone')} 
                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                    helperText={formik.touched.phone && formik.errors.phone}/>
                    
                    <TextField sx={{width: "100%", marginTop: "10px"}} id="email" label="Email" variant="outlined"
                    {...formik.getFieldProps('email')} 
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}/>
                    
                    <TextField sx={{width: "100%", marginTop: "10px"}} id="password" label="Password" variant="outlined"
                    {...formik.getFieldProps('password')} 
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}/>
                    
                    <TextField sx={{width: "100%", marginTop: "10px"}} id="cpassword" label="Confirm Password" variant="outlined"
                    {...formik.getFieldProps('cpassword')} 
                    error={formik.touched.cpassword && Boolean(formik.errors.cpassword)}
                    helperText={formik.touched.cpassword && formik.errors.cpassword}/>

                    <Typography sx={{textAlign: "center", color: "black", marginTop: "20px", marginBottom: "20px"}}>Can't have an account?<Link sx={{textDecoration: "none", cursor: "pointer"}} href="/login" > Sign In</Link></Typography>

                    <Button sx={{width: "100%", height: "50px"}} variant="contained" color="primary" type="submit" onClick={()=>"/"}>Login</Button>

                    <div className="line"><hr className="hr1"/><p style={{color: "black"}}>Or</p><hr className="hr2"/></div>

                </form>

                <div className="mainbtndiv">
                <div className="imgdiv">
                    <img src="" alt="" />
                </div>
                <button className="btn" onClick={()=>signIn("google")}>Sign up with google</button>
             </div>
            </Box>
        

    )
}