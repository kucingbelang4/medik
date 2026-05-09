import './globals.css';
import { Inter } from 'next/font/google';
import { Disclaimer } from '@/components/disclaimer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Medik | Professional Health Search Portal',
  description: 'Access clinical information on medicines, conditions, and health services.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="light" lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.className} bg-background text-on-surface selection:bg-primary-fixed selection:text-on-primary-fixed min-h-screen flex flex-col`}>
        {children}
        <Disclaimer>
          <div className="fixed bottom-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-sm border-t border-outline-variant py-sm">
            <div className="max-w-7xl mx-auto text-center font-label-sm text-label-sm text-on-surface-variant px-margin">
              Informasi ini hanya untuk tujuan edukasi. Ini BUKAN nasihat medis. 
              Selalu konsultasikan dengan dokter atau apoteker sebelum mengonsumsi obat apapun. 
              Dalam keadaan darurat, hubungi layanan darurat setempat.
            </div>
          </div>
        </Disclaimer>
      </body>
    </html>
  );
}