"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { authService } from "@/services/endpoints/authService";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
   Form,
   FormField,
   FormItem,
   FormControl,
   FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const schema = z
   .object({
      name: z.string().min(2, "Name must be at least 2 characters"),
      email: z.string().email("Enter a valid email"),
      password: z.string().min(6, "Password must be at least 6 characters"),
      confirmPassword: z.string(),
   })
   .refine((data) => data.password === data.confirmPassword, {
      path: ["confirmPassword"],
      message: "Passwords do not match",
   });

type SignupFormData = z.infer<typeof schema>;

export default function SignupPage() {
   const form = useForm<SignupFormData>({
      resolver: zodResolver(schema),
   });
   const router = useRouter();
   const [loading, setLoading] = useState(false);

   const onSubmit = async (data: SignupFormData) => {
      setLoading(true);
      try {
         const response = await authService.signup(data);

         if (response?.data?.success) {
            toast.success(
               response.data.message || "Account created successfully!"
            );
            router.push("/login");
         } else {
            toast.error(
               response?.data.message || "Signup failed. Please try again."
            );
         }
         // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
         toast.error(
            error?.response?.data?.message || "Signup failed. Please try again."
         );
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
         <Card className="w-full max-w-md shadow">
            <CardContent className="p-6">
               <h1 className="text-2xl font-bold text-center mb-4">
                  Create an Account
               </h1>

               <Form {...form}>
                  <form
                     onSubmit={form.handleSubmit(onSubmit)}
                     className="space-y-5"
                  >
                     <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                           <FormItem>
                              <Label>Name</Label>
                              <FormControl>
                                 <Input
                                    placeholder="Your full name"
                                    {...field}
                                 />
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
                                    placeholder="******"
                                    {...field}
                                 />
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
                              <Label>Confirm Password</Label>
                              <FormControl>
                                 <Input
                                    type="password"
                                    placeholder="******"
                                    {...field}
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     <Button
                        type="submit"
                        className="w-full"
                        disabled={loading}
                     >
                        {loading ? "Creating Account..." : "Signup"}
                     </Button>

                     <p className="text-sm text-center text-gray-600">
                        Already have an account?{" "}
                        <Link
                           href="/login"
                           className="text-blue-600 hover:underline"
                        >
                           Login
                        </Link>
                     </p>
                  </form>
               </Form>
            </CardContent>
         </Card>
      </div>
   );
}
