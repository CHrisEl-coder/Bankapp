"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { CustomInput } from "./Reusable/CustomInput";
import { AuthformSchema } from "@/lib/utils";
import { signIn, signUp } from "@/lib/actions/userActions";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import PropTypes from "prop-types";
import { PlaidLink } from "./Reusable/PlaidLink";

const AuthForm = ({ type }) => {
  const router = useRouter();

  const [user, setUser] = useState();

  const [isLoading, setIsLoading] = useState(false);

  const formSchema = AuthformSchema(type);

  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      city: "",
      state: "",
      ssn: "",
      firstName: "",
      lastName: "",
      address1: "",
      postalCode: "",
      dateofBirth: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (data) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setIsLoading(true);

    try {
      switch (type) {
        case "sign-up": {
          const newUser = await signUp(data);
          setUser(newUser);

          break;
        }

        case "sign-in": {
          const existingUser = await signIn(data);
          if (!existingUser) {
            throw new Error("User not found");
          }
          setUser(existingUser);
          router.push("/");

          break;
        }

        default:
          break;
      }

      // Reset the form after successful submission
      form.reset();
    } catch (error) {
      console.error("Error", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-dom px-4 py-2 rounded-lg">
      <header className=" flex flex-col gap-6">
        <Link href="/" className="flex items-center  cursor-pointer gap-2">
          <Image
            src="/icons/logo.svg"
            width={34}
            height={34}
            alt="Banking app logo"
            className=" size-[16px] max-xl:size-14"
          />

          <h1 className="text-lg font-bold font-exile text-sec">Transact</h1>
        </Link>

        <div className=" flex flex-col gap-1 md:gap-3 mb-6">
          <h1 className=" text-24 lg:text-36 font-medium text-secondary font-sans text-center">
            {user != null
              ? "Link Account"
              : type === "sign-in"
              ? "Sign-In"
              : "Sign-Up"}

            <p className="text-12 font-normal text-neutral-500 mt-2">
              {user
                ? "Link Your Account To Get Started"
                : "Please Enter Your Details"}
            </p>
          </h1>
        </div>
      </header>

      {user ? (
        <PlaidLink user={user} variant="primary" />
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=" flex flex-col gap-6"
          >
            {type === "sign-in" ? (
              <div className=" flex flex-col gap-4">
                <CustomInput
                  control={form.control}
                  label="Email"
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                />

                <CustomInput
                  control={form.control}
                  label="Password"
                  type="password"
                  placeholder="Password"
                  name="password"
                />
              </div>
            ) : (
              <div className=" flex flex-col gap-4">
                <div className=" flex gap-4">
                  <CustomInput
                    control={form.control}
                    label="Firstname"
                    type="text"
                    placeholder="Firstname"
                    name="firstName"
                  />

                  <CustomInput
                    control={form.control}
                    label="Lastname"
                    type="text"
                    placeholder="Lastname"
                    name="lastName"
                  />
                </div>

                <CustomInput
                  control={form.control}
                  label="Address"
                  type="text"
                  placeholder="Enter your specific address"
                  name="address1"
                />

                <CustomInput
                  control={form.control}
                  label="City"
                  type="text"
                  placeholder="Enter your city"
                  name="city"
                />

                <div className=" flex gap-4">
                  <CustomInput
                    control={form.control}
                    label="State"
                    type="text"
                    placeholder="NY"
                    name="state"
                  />

                  <CustomInput
                    control={form.control}
                    label="Postal Code"
                    type="number"
                    placeholder="11101"
                    name="postalCode"
                  />
                </div>

                <div className=" flex gap-4">
                  <CustomInput
                    control={form.control}
                    label="DOB"
                    type="date"
                    placeholder="Date of Birth"
                    name="dateOfBirth"
                  />

                  <CustomInput
                    control={form.control}
                    label="SSN"
                    type="ssn"
                    placeholder="123123"
                    name="ssn"
                  />
                </div>

                <CustomInput
                  control={form.control}
                  label="Email"
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                />

                <CustomInput
                  control={form.control}
                  label="Password"
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                />
              </div>
            )}

            <Button type="submit" className="form-btn" disabled={isLoading}>
              {isLoading ? (
                <div className=" flex gap-3">
                  <Loader2 className="animate-spin" size={20} />
                  Loading...
                </div>
              ) : type === "sign-in" ? (
                "Sign-in"
              ) : (
                "Sign-up"
              )}
            </Button>
          </form>

          {type === "sign-in" ? (
            <div className="flex gap-4 items-center justify-center mt-6">
              <p className=" text-14 font-semibold">
                {" "}
                Don&lsquo;t have an account?{" "}
              </p>
              <Link
                href="/sign-up"
                className=" text-12 font-bold border-b-2 border-sec text-sec hover:scale-95 transition-all duration-300 ease-in-out"
              >
                Sign-up
              </Link>
            </div>
          ) : (
            <div className=" flex gap-4 justify-center items-center mt-6">
              <p className="text-14 font-semibold"> Have an account ? </p>
              <Link
                href="/sign-in"
                className="text-12 border-b-2 border-sec text-sec font-bold hover:scale-95 transition-allduration-300 ease-in-out"
              >
                Log-in
              </Link>
            </div>
          )}
        </Form>
      )}
    </div>
  );
};

AuthForm.propTypes = {
  type: PropTypes.string,
};

export default AuthForm;
