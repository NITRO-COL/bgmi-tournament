import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Battleground Arena Admin",
  description: "Admin dashboard for Battleground Arena Tournament Organizer",
  icons: {
    icon: '/bgmi-logo.png',
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-950">
      {children}
    </div>
  );
}