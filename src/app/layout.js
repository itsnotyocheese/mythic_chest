import "./globals.css";

export const metadata = {
  title: "Mythic Chest",
  description: "Board Game Database",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
