"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/context/AuthContext";

const schema = z
   .object({
      name: z.string().min(2, "Name must be at least 2 characters"),
      email: z.string().email("Enter a valid email"),
      password: z.string().min(6, "Password must be at least 6 characters"),
      role: z.enum(["CUSTOMER", "HOTEL_OWNER"]),
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
      defaultValues: {
         role: "CUSTOMER"
      }
   });

   const { signup } = useAuth();

   const router = useRouter();
   const [loading, setLoading] = useState(false);

   const onSubmit = async (data: SignupFormData) => {
      setLoading(true);
      try {
         await signup(data);
         toast.success("Successfully Sign Up!");
         router.push("/login");
         router.refresh();
         // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
         if (error?.response?.data?.message) {
            toast.error(error.response.data.message);
         } else {
            toast.error("Signup failed! try again");
         }
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
                        name="role"
                        render={({ field }) => (
                           <FormItem>
                              <Label>Account Type</Label>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                 <FormControl>
                                    <SelectTrigger>
                                       <SelectValue placeholder="Select your account type" />
                                    </SelectTrigger>
                                 </FormControl>
                                 <SelectContent>
                                    <SelectItem value="CUSTOMER">Customer</SelectItem>
                                    <SelectItem value="HOTEL_OWNER">Hotel Owner</SelectItem>
                                 </SelectContent>
                              </Select>
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
