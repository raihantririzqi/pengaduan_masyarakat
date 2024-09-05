"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/login/web", {
        username: username,
        password: password
      });
      router.push('/dashboard');
      document.cookie = `token=${response.data.id_petugas}`;
    } catch (err) {
      console.error('Login error:', err);
      toast.error("Login Gagal");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[100vh] flex justify-center items-center">
      <Card className="w-[30rem]">
        <CardHeader>
          <Label className="font-bold text-lg text-center">LOGIN PAGE</Label>
        </CardHeader>
        <CardContent className="p-10">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-4">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex justify-center w-full">
              {isLoading ? (
                <Button size={"default"} className="w-[200px] h-[40px] gap-2" disabled>
                  Loading
                  <LoaderCircle className="animate-spin" />
                </Button>
              ) : (
                <Button
                  size={"default"}
                  className="w-[200px] h-[40px] gap-2"
                  onClick={handleLogin}
                >
                  Login
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
