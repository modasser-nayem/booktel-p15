"use client";

import { adminService } from "@/services/api";
import { useEffect, useState } from "react";
import { TGetBookings } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminBookings() {
   const [bookings, setBookings] = useState<TGetBookings>([]);

   useEffect(() => {
      adminService
         .getAllBookings()
         .then((res) => {
            setBookings(res.data.data.data);
         })
         .catch((err) => console.log(err.message || "server error"));
   }, []);

   return (
      <div>
         <h1> Admin Bookings</h1>
         <div className="flex flex-col gap-4">
            {bookings.map((booking) => (
               <Card key={booking.id}>
                  <CardHeader>
                     <CardTitle>{booking.id}</CardTitle>
                     <CardContent>
                        <p>{booking.createdAt}</p>
                        <p>{booking.status}</p>
                        <p>{booking.fromDate}</p>
                        <p>{booking.toDate}</p>
                     </CardContent>
                  </CardHeader>
               </Card>
            ))}
         </div>
      </div>
   );
}
