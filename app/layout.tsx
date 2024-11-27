import "@radix-ui/themes/styles.css";
import "./globals.css";
import { Providers } from "./Providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" >
      <body
        className={`antialiased overflow-x-hidden`}
      >

        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
