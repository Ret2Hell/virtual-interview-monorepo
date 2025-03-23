"use client";
import { CustomFormField } from "@/components/CustomFormField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { UserLoginFormData, userLoginSchema } from "@/lib/schemas";
import { useLoginUserMutation } from "@/state/api";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";

const LoginPage = () => {
  const [loginUser, { isLoading }] = useLoginUserMutation();

  const methods = useForm<UserLoginFormData>({
    resolver: zodResolver(userLoginSchema),
    defaultValues: {
      email: "test@gmail.com",
      password: "Aa123456@",
    },
  });
  const onSubmit = async (data: UserLoginFormData) => {
    try {
      const response = await loginUser(data).unwrap();
      console.log("Login response:", response);
    } catch (error) {
      console.error("Failed to log in:", error);
    }
  };

  return (
    <div className="min-w-80 p-4">
      <Form {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="mt-5 flex flex-col justify-between">
            <div className="mt-4 space-y-4">
              <CustomFormField
                name="email"
                label="Email"
                type="email"
                placeholder="example@gmail.com"
                className="border-none"
              />
            </div>
            <div className="mt-4 space-y-4">
              <CustomFormField
                name="password"
                label="Password"
                type="password"
                placeholder="********"
                className="border-none"
              />
            </div>
            <Link href="/forgot-password">
              <p className="text-primary-600 hover:text-primary-500 ml-5 mt-2 text-xs hover:underline">
                Forgot Password?
              </p>
            </Link>
            <Button variant="outline" type="submit">
              Sign in
            </Button>
            <p className="mt-2 text-center text-xs">
              <span>New on our platform? </span>
              <Link href="/register">
                <span className="text-primary-600 hover:text-primary-500 hover:underline">
                  Create an account
                </span>
              </Link>
            </p>

            <div className="text-customgreys-dirtyGrey flex items-center justify-center space-x-2 py-4 text-sm">
              <div className="bg-primary-500 h-px w-full" />
              <span>OR</span>
              <div className="bg-primary-500 h-px w-full" />
            </div>
            <Button className="w-full" type="button">
              <Image
                src="/google-icon.svg"
                alt="Google"
                width={20}
                height={20}
                className="mr-2"
              />
              Continue with Google
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LoginPage;
