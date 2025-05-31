"use client";

import { useEffect, useRef, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import HCaptcha from "@hcaptcha/react-hcaptcha";
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
import { REDIRECT_LINKS } from "@/constants/links";
import { clientEnv } from "@/env/client";
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
  const [token, setToken] = useState<string | null>(null);

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
      fetchOptions: {
        headers: {
          "x-captcha-response": token ?? "",
        },
      },
    });

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
    push(
      REDIRECT_LINKS[
        // @ts-expect-error
        (login.user?.role as keyof typeof REDIRECT_LINKS) ?? "user"
      ],
    );
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
              <div className="flex items-center justify-between gap-2">
                <FormLabel>Contraseña</FormLabel>

                <Link
                  href="/forgot-password"
                  className="text-muted-foreground text-sm hover:text-primary hover:underline hover:underline-offset-2"
                >
                  Restaurar contraseña
                </Link>
              </div>
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
                    className="absolute top-0.5 right-0"
                    variant="ghost"
                    size="icon"
                    onClick={() => setShow(!show)}
                    aria-label={
                      show ? "Ocultar contraseña" : "Mostrar contraseña"
                    }
                  >
                    {show ? <EyeOffIcon /> : <EyeIcon />}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {process.env.NODE_ENV === "production" && (
          <div className="mx-auto max-w-max">
            <HCaptcha
              sitekey={clientEnv.NEXT_PUBLIC_HCAPTCHA_SITE_KEY}
              onVerify={setToken}
            />
          </div>
        )}

        <div className="flex flex-col-reverse items-start justify-between gap-6 sm:flex-row sm:items-center">
          <Button isLoading={form.formState.isSubmitting} fullWidth>
            {form.formState.isSubmitting
              ? "Iniciando sesión..."
              : "Iniciar sesión"}
          </Button>
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

        <Separator className="my-4" />

        <div className="mx-auto max-w-max">
          <Button asChild variant="link-neutral">
            <Link href="/register">No tengo cuenta</Link>
          </Button>
        </div>
      </form>
    </Form>
  );
};
