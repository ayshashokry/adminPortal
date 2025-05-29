import { ReactNode, Suspense } from "react";
import "./globals.css";
import QueryProvider from "./providers/QueryProvider";
import Loading from "@/components/layout/Loading";


export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        
         <QueryProvider>
                    <Suspense fallback={<Loading/>}>

 {children}</Suspense></QueryProvider>
      </body>
    </html>
  );
}



