
//import { Form, Button, Container, Card } from 'react-bootstrap';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardTitle, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function Login()
{

  const _initialForm = {
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(_initialForm);
  const [isLoading, setisLoading] = useState(false);

  const handleChange = (e) =>
  {
    console.log(`Input change ${e.target.name} = ${e.target.value}`);

    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = (e) =>
  {
    e.preventDefault();
    setisLoading(true);
    setTimeout(() =>
    {
      setisLoading(false);
      navigate("/dashboard");

    }, 1000);
  };

  return (
    <>
      <div className=" flex flex-col min-h-screen items-center justify-center bg-muted/40 p-4">
        <div className="w-full max-w-md space-y-4">
          <div className="mb-6 flex flex-col items-center text-center">
            <div className='mb-2 flex h-12 w-12 items-start justify-center rounded-sm shadow'></div>
          </div>
          <h1 className='text-2xl font-bold tracking-tight mb-5'>Point Of Sales | PPKD JP</h1>
          {/* <p className='text-sm text-muted'>Point Of Sales</p> */}
        </div>

        <Card className="shadow-lg border-border px-4 pb-10 pt-4 w-50">
          <CardHeader className="pb-4 space-y-2 items-start text-left">
            <CardTitle className="text-lg font-semibold">Sign In Your Account </CardTitle>
            <CardDescription>Enter Your Credential</CardDescription>
          </CardHeader>

          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              <div className='space-y-2'>
                <Label>Email</Label>
                <Input id="email" name="email" type="text"
                  value={formData.email} onChange={handleChange} placeholder='Enter your email' className="rounded-xl placeholder:text-gray-400" required />
              </div>
              <div className='space-y-2'>
                <Label>Password</Label>
                <Input id="password" name="password" type="password"
                  value={formData.password} onChange={handleChange} placeholder='Enter your password' className="rounded-xl placeholder:text-gray-400" required />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-3 pt-3 " >
              <Button type="submit" className="w-full rounded-xl text-white bg-blue-500 hover:bg-slate-500 hover:text-white transition-colors">
                Sign In</Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </>
  );
};

  // {/* <Container className="d-flex align-items-center justify-content-center min-vh-100">
  //             <div className="w-100 d-flex align-items-center justify-content-center">
  //                 <Card className="shadow" style={{ width: "400px" }}>
  //                     <Card.Body className="p-4">
  //                         <h2 className="font-weight-bold text-center mb-4">Login Form</h2>

  //                         <Form>
  //                             <Form.Group className="mb-3">
  //                                 <Form.Label>Email</Form.Label>
  //                                 <Form.Control name="email" type="email" value={formData.email} onChange={handleChange} required />
  //                             </Form.Group>

  //                             <Form.Group className="mb-3">
  //                                 <Form.Label>Password</Form.Label>
  //                                 <Form.Control name="password" type="password" value={formData.password} onChange={handleChange} required />
  //                             </Form.Group>

  //                             <Form.Group>
  //                                 <Button variant="primary" type="submit" className="w-100" onClick={handleLogin}>
  //                                     {isLoading ? "Loading..." : "Sign In"}
  //                                 </Button>
  //                             </Form.Group>
  //                         </Form>
  //                     </Card.Body>
  //                 </Card>
  //             </div>

  //         </Container>
  //          */
  // }