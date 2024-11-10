import "./globals.css";
import Layout from './components/layout';

export const metadata = {
  title: "Mythic Chest",
  description: "Board Game Database",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  );
}
