"use client";

import { useState, useTransition } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { object, string } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signUp } from "@/lib/auth-client";

const registerSchema = object({
  name: string({
    invalid_type_error: "El nombre debe ser una cadena de texto",
    required_error: "El nombre es obligatorio",
    message: "El nombre es obligatorio",
  })
    .min(2, {
      message: "El nombre debe tener al menos 2 caracteres",
    })
    .max(100, {
      message: "El nombre no puede tener más de 100 caracteres",
    })
    .trim(),
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
  confirmPassword: string({
    invalid_type_error: "La confirmación de contraseña debe ser una cadena de texto",
    required_error: "La confirmación de contraseña es obligatoria",
    message: "La confirmación de contraseña es obligatoria",
  })
    .min(6, {
      message: "La confirmación de contraseña debe tener al menos 6 caracteres",
    })
    .max(100, {
      message: "La confirmación de contraseña no puede tener más de 100 caracteres",
    }),
}).refine(({ password, confirmPassword }) => password === confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

const RegisterPage = () => {
  const [showFirst, setShowFirst] = useState<boolean>(false);
  const [showSecond, setShowSecond] = useState<boolean>(false);

  const { push } = useRouter();

  const form = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const { error } = await signUp.email({
      email: data.email,
      password: data.password,
      name: data.name,
    });

    if (error) {
      toast.error(error.message ?? "Error al registrar usuario");
      return;
    }

    toast.success("Usuario registrado correctamente");

    form.reset();
    form.clearErrors();
    push("/login");
  });

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl">Registrarse</CardTitle>
          <CardDescription>
            Crea una cuenta para acceder a todas las funcionalidades.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={onSubmit} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input placeholder="Juan Pérez" autoComplete="name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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

              <div className="grid gap-2.5 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contraseña</FormLabel>
                      <FormControl>
                        <div className="relative w-full">
                          <Input
                            type={showFirst ? "text" : "password"}
                            autoComplete="current-password"
                            aria-disabled={form.formState.isSubmitting}
                            placeholder="********"
                            {...field}
                          />
                          <Button
                            type="button"
                            className="absolute top-0.5 right-0"
                            variant="ghost"
                            size="icon"
                            onClick={() => setShowFirst(!showFirst)}
                            aria-label={showFirst ? "Ocultar contraseña" : "Mostrar contraseña"}
                          >
                            {showFirst ? <EyeOffIcon /> : <EyeIcon />}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirmar contraseña</FormLabel>
                      <FormControl>
                        <div className="relative w-full">
                          <Input
                            type={showSecond ? "text" : "password"}
                            autoComplete="current-password"
                            aria-disabled={form.formState.isSubmitting}
                            placeholder="********"
                            {...field}
                          />
                          <Button
                            type="button"
                            className="absolute top-0.5 right-0"
                            variant="ghost"
                            size="icon"
                            onClick={() => setShowSecond(!showSecond)}
                            aria-label={showSecond ? "Ocultar contraseña" : "Mostrar contraseña"}
                          >
                            {showSecond ? <EyeOffIcon /> : <EyeIcon />}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex items-center justify-between">
                <Button asChild variant="secondary">
                  <Link href="/login">Ya tengo cuenta</Link>
                </Button>

                <Button isLoading={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? "Registrando..." : "Registrarme"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
export default RegisterPage;
