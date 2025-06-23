"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
   Form,
   FormField,
   FormItem,
   FormMessage,
   FormControl,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { useState } from "react";
import PublicRoute from "@/components/layout/PublicRoute";

const schema = z.object({
   email: z.string().email("Enter a valid email"),
   password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof schema>;

export default function LoginPage() {
   const form = useForm<LoginFormData>({
      resolver: zodResolver(schema),
   });
   const { login } = useAuth();
   const router = useRouter();
   const [loading, setLoading] = useState(false);

   const onSubmit = async (values: LoginFormData) => {
      setLoading(true);
      try {
         await login(values.email, values.password);
         toast.success("Logged in successfully!");
         router.push("/dashboard");
         router.refresh();
         // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
         if (error?.response?.data?.message) {
            toast.error(error.response.data.message);
         } else {
            toast.error("Login failed. Check credentials.");
         }
      } finally {
         setLoading(false);
      }
   };

   return (
      <PublicRoute>
         <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <Card className="w-full max-w-md shadow">
               <CardContent className="p-6">
                  <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>

                  <Form {...form}>
                     <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-5"
                     >
                        <FormField
                           control={form.control}
                           name="email"
                           render={({ field }) => (
                              <FormItem>
                                 <Label>Email</Label>
                                 <FormControl>
                                    <Input
                                       placeholder="you@example.com"
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
                                 <Label>Password</Label>
                                 <FormControl>
                                    <Input
                                       type="password"
                                       placeholder="********"
                                       {...field}
                                    />
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />

                        <div className="flex justify-end">
                           <Link
                              href="/forgot-password"
                              className="text-sm text-blue-600 hover:underline"
                           >
                              Forgot your password?
                           </Link>
                        </div>

                        <Button
                           type="submit"
                           className="w-full"
                           disabled={loading}
                        >
                           {loading ? "Logging in..." : "Login"}
                        </Button>

                        <p className="text-sm text-center text-gray-600">
                           Don&apos;t have an account?{" "}
                           <Link
                              href="/signup"
                              className="text-blue-600 hover:underline"
                           >
                              Signup
                           </Link>
                        </p>
                     </form>
                  </Form>
               </CardContent>
            </Card>
         </div>
      </PublicRoute>
   );
}
