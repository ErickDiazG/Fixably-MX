"use client";

import React from "react"
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { loginAction } from "@/lib/actions/auth";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Briefcase,
  ArrowLeft,
  Loader2,
} from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Por favor, ingresa un correo válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("cliente");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    const result = await loginAction({
      ...data,
      role: activeTab as 'cliente' | 'profesional',
    });

    if (result?.error) {
      toast.error(result.error);
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-secondary/30 flex-1 flex flex-col min-h-screen">
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al inicio
          </Link>

          <Card className="border-0 shadow-xl overflow-hidden rounded-2xl">
            <CardHeader className="text-center pb-2 bg-primary/5 pt-8">
              <CardTitle className="text-2xl font-bold">Iniciar Sesión</CardTitle>
              <CardDescription>
                Accede a tu cuenta de Fixably-MX
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2 mb-8 bg-muted/50 p-1">
                  <TabsTrigger value="cliente" className="gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm">
                    <User className="h-4 w-4" />
                    Cliente
                  </TabsTrigger>
                  <TabsTrigger value="profesional" className="gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm">
                    <Briefcase className="h-4 w-4" />
                    Profesional
                  </TabsTrigger>
                </TabsList>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="email" className={errors.email ? "text-destructive" : ""}>Correo electrónico</Label>
                    <div className="relative group">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="tu@correo.com"
                        className={`pl-10 h-11 bg-muted/20 border-border focus-visible:ring-primary ${errors.email ? "border-destructive focus-visible:ring-destructive" : ""}`}
                        disabled={isLoading}
                        {...register("email")}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-xs text-destructive mt-1 font-medium">{errors.email.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password" className={errors.password ? "text-destructive" : ""}>Contraseña</Label>
                      <Link
                        href="#"
                        className="text-xs text-primary hover:text-primary/80 font-medium transition-colors"
                      >
                        ¿Olvidaste tu contraseña?
                      </Link>
                    </div>
                    <div className="relative group">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className={`pl-10 pr-10 h-11 bg-muted/20 border-border focus-visible:ring-primary ${errors.password ? "border-destructive focus-visible:ring-destructive" : ""}`}
                        disabled={isLoading}
                        {...register("password")}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        tabIndex={-1}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-xs text-destructive mt-1 font-medium">{errors.password.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-11 font-semibold text-base shadow-lg shadow-primary/20 transition-all hover:scale-[1.01] active:scale-[0.99]"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Verificando...
                      </>
                    ) : (
                      "Iniciar Sesión"
                    )}
                  </Button>

                  <div className="pt-2 text-center space-y-3">
                    <p className="text-sm text-muted-foreground">
                      {activeTab === "cliente" ? (
                        <>
                          ¿No tienes cuenta?{" "}
                          <Link
                            href="/publicar-proyecto"
                            className="text-primary hover:text-primary/80 font-bold transition-colors"
                          >
                            Publica tu proyecto
                          </Link>
                        </>
                      ) : (
                        <>
                          ¿No tienes cuenta?{" "}
                          <Link
                            href="/registro-profesional"
                            className="text-primary hover:text-primary/80 font-bold transition-colors"
                          >
                            Regístrate aquí
                          </Link>
                        </>
                      )}
                    </p>
                  </div>
                </form>
              </Tabs>
            </CardContent>
          </Card>

          <p className="text-center text-[10px] text-muted-foreground/60 mt-8 uppercase tracking-widest font-bold">
            Fixably-MX &bull; Seguridad Hardened &bull; 2026
          </p>
        </div>
      </main>
    </div>
  );
}
