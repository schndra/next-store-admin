"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import CardWrapper from "./CardWrapper";
import { Form } from "../ui/form";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomFormField } from "../FormComponents";
import { RegisterFormSchemaType, registerFormSchema } from "@/utils/schemas";

function RegisterForm() {
  const form = useForm<RegisterFormSchemaType>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof registerFormSchema>) => {
    console.log(values);
  };

  return (
    <CardWrapper
      headerLabel="Create an account"
      backButtonLabel="Already have an account?"
      backButtonHref="/auth/login"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="spac-y-6">
          <div className="space-y-4">
            <CustomFormField
              control={form.control}
              name="name"
              placeholder="song goku"
            />
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
            {/* error messages */}
            <Button type="submit" className="w-full">
              Create an account
            </Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
}
export default RegisterForm;
