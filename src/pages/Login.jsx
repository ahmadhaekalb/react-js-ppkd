//import { Form, Button, Container, Card } from 'react-bootstrap';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardTitle, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

export default function Login()
{
  const navigate = useNavigate();
  const _initialForm = {
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(_initialForm);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) =>
  {
    console.log(`Input change ${e.target.name} = ${e.target.value}`);

    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) =>
  {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch('http://localhost:3000/api/auth/login', {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message || "Please check your email and password!");
      }
      localStorage.setItem("", result.data.token);
      setTimeout(() =>
      {
        setIsLoading(false);
        navigate("/dashboard");
      }, 0);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }

  };

  return (
    <div className="w-full flex flex-col min-h-screen items-center justify-center bg-muted/40 p-4">
      <div className="w-full max-w-md space-y-4">
        {/* <div className="mb-6 flex flex-col items-center text-center ">
                        <div className='mb-2 flex h-12 w-12 items-start justify-center rounded-sm shadow'>kurenag</div>
                    </div> */}
        <h1 className='text-2xl font-bold tracking-tight mb-5 text-center'>Point Of Sales | PPKD JP</h1>
        {/* <p className='text-sm text-muted'>Point Of Sales</p> */}
      </div>
      <Card className="w-full max-w-md shadow-lg border-border text-left p-8">
        <CardHeader className=" space-y-1 pb-4">
          <CardTitle className="text-xl font-semibold">Sign In Your Account </CardTitle>
          <CardDescription>Enter Your Credential</CardDescription>
          {errorMsg && <p className="text-red-900">{errorMsg}</p>}
        </CardHeader>

        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className='space-y-2'>
              <Label>Email</Label>
              <Input id="email" name="email" type="text"
                value={formData.email} onChange={handleChange} placeholder='Enter your email' required />
            </div>
            <div className='space-y-2'>
              <Label>Password</Label>
              <Input id="password" name="password" type="password"
                value={formData.password} onChange={handleChange} placeholder='Enter your password' required />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-3 pt-3" >
            <Button type="submit" className="w-full text-white bg-slate-500">
              {isLoading ? "Please wait...." : "Sign In"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}