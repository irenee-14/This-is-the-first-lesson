import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useUserStore } from "@/stores/useUserStore";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { userId, setUserId, setUserName } = useUserStore();
  const [inputId, setInputId] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  useEffect(() => {
    if (userId) {
      navigate("/characters");
    }
  }, [userId, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // /api/v1/login
    //     {
    //   "email": "test@test.com",
    //   "password": "123456"
    // }
    const res = await fetch("/api/v1/login", {
      method: "POST",
      body: JSON.stringify({ email: inputId, password: inputPassword }),
      headers: { "Content-Type": "application/json" },
    });

    const user = await res.json();

    if (!res.ok) {
      alert("Login failed");
      return;
    }

    if (user) {
      setUserId(user.data.user.userId);
      setUserName(user.data.user.name);
    }
  };

  return (
    <div className="p-6 min-h-screen flex flex-col items-center justify-center bg-phone">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-xs flex flex-col gap-4"
      >
        <Input
          shape="square"
          placeholder="User Email을 입력하세요"
          value={inputId}
          onChange={(e) => setInputId(e.target.value)}
          className="w-full"
        />
        <Input
          type="password"
          shape="square"
          placeholder="User Password을 입력하세요"
          value={inputPassword}
          onChange={(e) => setInputPassword(e.target.value)}
          className="w-full"
        />
        <div className="flex w-full">
          <Button
            type="submit"
            width="full"
            size="l"
            variant="primary"
            className="mt-2"
          >
            Login
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Home;
