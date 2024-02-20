"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import CardWrapper from "./CardWrapper";
import { Form } from "../ui/form";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomFormField } from "../FormComponents";
import { RegisterFormSchemaType, registerFormSchema } from "@/utils/schemas";
import { useToast } from "../ui/use-toast";
import { useTransition } from "react";
import { registerAction } from "@/actions/register";

function RegisterForm() {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

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
        toast({
          description: data.error,
          variant: "destructive",
        });
        return;
      }
      form.reset();
      toast({ title: "Success!", description: data.success });
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
