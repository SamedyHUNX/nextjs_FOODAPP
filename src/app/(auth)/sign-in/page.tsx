import { auth } from "@/lib/auth";
import React from "react";
import { Role } from "../../../../generated/prisma";
import { redirect } from "next/navigation";
import { SignInForm } from "./_components/sign-in-form";

const Page = async () => {
  const session = await auth();

  if (session?.user.role === Role.ADMIN)
    redirect("/admin/foods-management/foods");

  if (session?.user.role === Role.USER) redirect("/client/");

  return (
    <div className="flex min-h-screen justify-center items-center">
      <SignInForm />
    </div>
  );
};

export default Page;
