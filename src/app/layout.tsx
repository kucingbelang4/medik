export const metadata = {
  title: "Medik - Indonesian Drug Information",
  description: "Search for drug information by symptom, illness, or drug name",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
