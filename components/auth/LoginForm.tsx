"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import CardWrapper from "./CardWrapper";
import { CustomFormField } from "../FormComponents";

function LoginForm() {
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof loginFormSchema>) => {
    console.log(values);
    form.reset();
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
            />
            <CustomFormField
              control={form.control}
              name="password"
              placeholder="password"
              type="password"
            />
            {/* add form errors here*/}
            <Button type="submit" className="w-full">
              Login
            </Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
}
export default LoginForm;
