"use client"
import { signIn, useSession } from "next-auth/react";
import { useFormik } from "formik";
import React from "react";
import * as Yup from 'yup';
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
    <Box
    sx={{width: "400px", padding: "35px 50px", boxShadow: "0px 0px 20px 5px rgba(117, 117, 117, 0.692)"}}
    className="bg-white rounded-2xl">
        <Typography variant="h4" className="text-center text-black">Login</Typography>
            <form onSubmit={formik.handleSubmit}>
            <TextField className="w-full mt-3" id="email" label="Email" variant="outlined" 
            {...formik.getFieldProps('email')} 
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}/>

            <TextField className="w-full mt-3" id="password" label="Password" variant="outlined" 
            {...formik.getFieldProps('password')} 
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}/>
                    
            <Typography 
            className="text-center text-black mt-3 mb-3">Can't have an account?
            <Link className="no-underline cursor-pointer" href="/signup"> Sign In</Link>
            </Typography>

            <Button className="w-full" style={{height: "50px"}} variant="contained" color="primary" type="submit">Login</Button>

            <div 
            className="flex justify-center items-center mt-3">
                <hr  
                className="size-2 w-full mr-5"/>
                <p style={{color: "black"}}>Or</p>
                <hr 
                className="size-2 w-full ml-5"/></div>
            </form>

            <div 
            className="mt-2 w-full border-2 border-solid border-[#484848] rounded flex justify-center items-center" style={{height: "50px"}}>
                <div className="imgdiv">
                    <img src="" alt="" />
                </div>
                <button 
                className="text-black" onClick={ async ()=>await signIn("google", {callbackUrl: `${window.location.origin}`})}>Sign up with google</button>
            </div>

            <div 
            className="mt-3 w-full border-2 border-solid border-[#484848] rounded flex justify-center items-center" style={{height : '50px' }}>
                <div className="imgdiv1">
                    <img src="" alt="" />
                </div>
                <button 
                className="text-black" onClick={ async ()=> await signIn("Facebook", {callbackUrl: `${window.location.origin}`})}>Sign up with Facebook</button>
             </div>
            </Box>
        

    )
}