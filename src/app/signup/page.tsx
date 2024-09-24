"use client"
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import React from "react";
import * as Yup from 'yup';
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
    <Box className="bg-white rounded-2xl"
    sx={{width: "400px", padding: "35px 50px", boxShadow: "0px 0px 20px 5px rgba(117, 117, 117, 0.692)"}}>
        <Typography variant="h4" className="text-center text-black">Sign Up</Typography>
        <form onSubmit={formik.handleSubmit}>
        <TextField className="w-full mt-3" id="firstname" label="Firstname" variant="outlined" 
        {...formik.getFieldProps('firstname')} 
        error={formik.touched.firstname && Boolean(formik.errors.firstname)}
        helperText={formik.touched.firstname && formik.errors.firstname}/>

        <TextField className="w-full mt-3" id="lastname" label="Lastname" variant="outlined"
        {...formik.getFieldProps('lastname')} 
        error={formik.touched.lastname && Boolean(formik.errors.lastname)}
        helperText={formik.touched.lastname && formik.errors.lastname}/>
                    
        <TextField className="w-full mt-3" id="phone" label="Phone" variant="outlined"
        {...formik.getFieldProps('phone')} 
        error={formik.touched.phone && Boolean(formik.errors.phone)}
        helperText={formik.touched.phone && formik.errors.phone}/>
                    
        <TextField className="w-full mt-3" id="email" label="Email" variant="outlined"
        {...formik.getFieldProps('email')} 
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}/>
                    
        <TextField className="w-full mt-3" id="password" label="Password" variant="outlined"
        {...formik.getFieldProps('password')} 
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}/>
                    
        <TextField className="w-full mt-3" id="cpassword" label="Confirm Password" variant="outlined"
        {...formik.getFieldProps('cpassword')} 
        error={formik.touched.cpassword && Boolean(formik.errors.cpassword)}
        helperText={formik.touched.cpassword && formik.errors.cpassword}/>

        <Typography 
        className="text-center text-black mt-3 mb-3">Can't have an account?
        <Link className="no-underline cursor-pointer" href="/login" > Sign In</Link></Typography>

        <Button className="w-full" sx={{height: "50px"}} variant="contained" color="primary" type="submit" onClick={()=>"/"}>Login</Button>

        <div className="flex justify-center items-center mt-3">
            <hr className="size-2 w-full mr-5"/>
            <p style={{color: "black"}}>Or</p>
            <hr className="size-2 w-full ml-5"/></div>
            </form>

        <div className="mt-2 w-full border-2 border-solid border-[#484848] rounded flex justify-center items-center" style={{height: "50px"}}>
        <div className="imgdiv">
            <img src="" alt="" />
        </div>
        <button className="text-black" onClick={()=>signIn("google")}>Sign up with google</button>
        </div>

        <div className="mt-3 w-full border-2 border-solid border-[#484848] rounded flex justify-center items-center" style={{height : '50px' }}>
        <div className="imgdiv1">
            <img src="" alt="" />
        </div>
        <button className="text-black" onClick={()=>signIn("Facebook")}>Sign up with Facebook</button>
        </div>
            </Box>
        

    )
}