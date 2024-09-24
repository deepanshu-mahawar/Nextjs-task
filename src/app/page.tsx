import {
  Link,
} from '@mui/material';

export default function Home() {
  
  return (
    <div className="justify-center items-center">
      <h1 className="text-center mb-2">Home Page</h1>
      <button className="border-2 border-solid py-1 px-2 rounded-lg mx-1"><Link className="no-underline" href="/login">Login</Link></button>
      <button className="border-2 border-solid py-1 px-2 rounded-lg mx-1"><Link className="no-underline" href="/signup">Signin</Link></button>
    </div>
    
  );
}
