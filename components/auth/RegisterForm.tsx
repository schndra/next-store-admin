"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import CardWrapper from "./CardWrapper";
import { Form } from "../ui/form";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomFormField } from "../FormComponents";
import { RegisterFormSchemaType, registerFormSchema } from "@/app/_types/types";
import { useTransition } from "react";
import { registerAction } from "@/actions/register";
import { toast } from "sonner";

function RegisterForm() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<RegisterFormSchemaType>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const handleSubmit = (values: RegisterFormSchemaType) => {
    console.log(values);
    startTransition(async () => {
      const data = await registerAction(values);
      if (data.error) {
        toast.error(data.error);
        return;
      }
      form.reset();
      toast.success(data.success);
    });
  };

  return (
    <CardWrapper
      headerLabel="Create an account"
      backButtonLabel="Already have an account?"
      backButtonHref="/auth/login"
      showSocial={false}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="spac-y-6">
          <div className="space-y-4">
            <CustomFormField
              control={form.control}
              name="name"
              placeholder="son goku"
              disabled={isPending}
            />
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
            {/* error messages */}
            <Button type="submit" className="w-full" disabled={isPending}>
              Create an account
            </Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
}
export default RegisterForm;
