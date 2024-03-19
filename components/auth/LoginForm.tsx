"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import CardWrapper from "./CardWrapper";
import { CustomFormField } from "../FormComponents";
import { LoginFormSchemaType, loginFormSchema } from "@/types/types";
import { startTransition, useTransition } from "react";
import { loginAction } from "@/actions/login";
import { toast } from "sonner";

function LoginForm() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<LoginFormSchemaType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof loginFormSchema>) => {
    console.log(values);

    startTransition(async () => {
      const data = await loginAction(values);
      if (data?.error) {
        toast.error(data.error);
        return;
      }
      form.reset();
      toast.success("success fully logged in");
    });
  };

  return (
    <CardWrapper
      headerLabel="Sign In"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/register"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="spac-y-6">
          <div className="space-y-4">
            <CustomFormField
              control={form.control}
              name="email"
              placeholder="son.goku@gmail.com"
              type="email"
              disabled={isPending}
            />
            <CustomFormField
              control={form.control}
              name="password"
              placeholder="password"
              type="password"
              disabled={isPending}
            />
            {/* add form errors here*/}
            <Button type="submit" className="w-full" disabled={isPending}>
              Login
            </Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
}
export default LoginForm;
