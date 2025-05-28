"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon, KeyRound } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { object, string } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { oneTap, signIn } from "@/lib/auth-client";

const loginSchema = object({
  email: string({
    required_error: "El correo electrónico es obligatorio",
    invalid_type_error: "El correo electrónico debe ser una cadena de texto",
    message: "El correo electrónico es obligatorio",
  })
    .min(4, "El correo electrónico es obligatorio")
    .max(255, "El correo electrónico no puede exceder los 255 caracteres")
    .email("Invalid email address")
    .trim(),
  password: string({
    invalid_type_error: "La contraseña debe ser una cadena de texto",
    required_error: "La contraseña es obligatoria",
    message: "La contraseña es obligatoria",
  })
    .min(6, {
      message: "La contraseña debe tener al menos 6 caracteres",
    })
    .max(100, {
      message: "La contraseña no puede tener más de 100 caracteres",
    }),
});

export const LoginForm = () => {
  const [show, setShow] = useState<boolean>(false);

  const { push } = useRouter();

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const { error, data: login } = await signIn.email({
      email: data.email,
      password: data.password,
      rememberMe: true,
    });

    console.log(login);
    console.log(error);

    if (error) {
      toast.error(error.message ?? "Error al iniciar sesión");
      return;
    }

    toast.success("Sesión iniciada correctamente");

    if (login.redirect && login.url) {
      push(login.url);
    }

    form.reset();
    form.clearErrors();
    push("/dashboard");
  });

  useEffect(() => {
    oneTap();
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo electrónico</FormLabel>
              <FormControl>
                <Input
                  placeholder="correo@ejemplo.com"
                  type="email"
                  autoComplete="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <div className="relative w-full">
                  <Input
                    type={show ? "text" : "password"}
                    autoComplete="current-password"
                    aria-disabled={form.formState.isSubmitting}
                    placeholder="********"
                    {...field}
                  />
                  <Button
                    type="button"
                    className="absolute top-0.5 right-1"
                    variant="ghost"
                    size="icon"
                    onClick={() => setShow(!show)}
                    aria-label={show ? "Ocultar contraseña" : "Mostrar contraseña"}
                  >
                    {show ? <EyeOffIcon /> : <EyeIcon />}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col-reverse items-start sm:flex-row gap-6 sm:items-center justify-between">
          <Button asChild variant="destructive">
            <Link href="/register">No tengo cuenta</Link>
          </Button>

          <div className="space-x-1 flex flex-row-reverse sm:flex-row">
            <Button asChild variant="link">
              <Link href="/forgot-password">Restaurar contraseña</Link>
            </Button>

            <Button isLoading={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Iniciando sesión..." : "Iniciar sesión"}
            </Button>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Button
            variant="outline"
            type="button"
            onClick={async () => {
              await signIn.social({
                provider: "google",
              });
            }}
          >
            Google
          </Button>
          <Button variant="outline" type="button">
            <KeyRound />
            Passkey
          </Button>
        </div>
      </form>
    </Form>
  );
};
