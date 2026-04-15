"use client";

import React from "react"

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  HardHat,
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Briefcase,
  ArrowLeft,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("cliente");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (activeTab === "cliente") {
      router.push("/dashboard/cliente");
    } else {
      router.push("/dashboard/profesional");
    }
  };

  return (
    <div className="bg-secondary/30 flex-1">
      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al inicio
          </Link>

          <Card className="border-0 shadow-xl">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-2xl">Iniciar Sesión</CardTitle>
              <CardDescription>
                Accede a tu cuenta para continuar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="cliente" className="gap-2">
                    <User className="h-4 w-4" />
                    Cliente
                  </TabsTrigger>
                  <TabsTrigger value="profesional" className="gap-2">
                    <Briefcase className="h-4 w-4" />
                    Profesional
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="cliente">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email-cliente">Correo electrónico</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email-cliente"
                          type="email"
                          placeholder="tu@correo.com"
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password-cliente">Contraseña</Label>
                        <Link
                          href="#"
                          className="text-sm text-primary hover:underline"
                        >
                          ¿Olvidaste tu contraseña?
                        </Link>
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="password-cliente"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="pl-10 pr-10"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isLoading}
                    >
                      {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
                    </Button>

                    <p className="text-center text-sm text-muted-foreground">
                      ¿No tienes cuenta?{" "}
                      <Link
                        href="/publicar-proyecto"
                        className="text-primary hover:underline font-medium"
                      >
                        Publica tu proyecto
                      </Link>
                    </p>
                  </form>
                </TabsContent>

                <TabsContent value="profesional">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email-pro">Correo electrónico</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email-pro"
                          type="email"
                          placeholder="tu@correo.com"
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password-pro">Contraseña</Label>
                        <Link
                          href="#"
                          className="text-sm text-primary hover:underline"
                        >
                          ¿Olvidaste tu contraseña?
                        </Link>
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="password-pro"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="pl-10 pr-10"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isLoading}
                    >
                      {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
                    </Button>

                    <p className="text-center text-sm text-muted-foreground">
                      ¿Eres profesional y no tienes cuenta?{" "}
                      <Link
                        href="/registro-profesional"
                        className="text-primary hover:underline font-medium"
                      >
                        Regístrate aquí
                      </Link>
                    </p>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <p className="text-center text-xs text-muted-foreground mt-6">
            Al iniciar sesión, aceptas nuestros{" "}
            <Link href="#" className="underline hover:text-foreground">
              Términos de Servicio
            </Link>{" "}
            y{" "}
            <Link href="#" className="underline hover:text-foreground">
              Política de Privacidad
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
