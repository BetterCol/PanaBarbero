import { RegisterForm } from "@/components/auth/form/register-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const RegisterPage = () => {
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
          <RegisterForm />
        </CardContent>
      </Card>
    </div>
  );
};
export default RegisterPage;
