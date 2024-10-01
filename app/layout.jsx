

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import UserProvider from "./utils/context/UserContext";
import "./globals.css";

export const metadata = {
  title: "Katushka n Da Rats",
  description: "Art Gallery",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/Logo.png" sizes="any" />
      </head>
      <body>
        <UserProvider>
          <Navbar />
          {children}
          <Footer />
        </UserProvider>
      </body>
    </html>
  );
}
