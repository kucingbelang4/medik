import './globals.css';
import { Inter } from 'next/font/google';
import { Disclaimer } from '@/components/disclaimer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Medik - Indonesian Drug Information',
  description: 'Search for drug information by symptom, illness, or drug name',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={inter.className} style={{ backgroundColor: '#faf8ff' }}>
        {/* Disclaimer always visible at bottom */}
        <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm p-4 border-t z-50">
          <div className="max-w-4xl mx-auto text-sm text-center" style={{ color: '#334155' }}>
            Informasi ini hanya untuk tujuan edukasi. Ini BUKAN nasihat medis. 
            Selalu konsultasikan dengan dokter atau apoteker sebelum mengonsumsi obat apapun. 
            Dalam keadaan darurat, hubungi layanan darurat setempat.
          </div>
        </div>
        {/* Main content with bottom padding to account for fixed disclaimer */}
        <div className="pb-20">
          {children}
        </div>
      </body>
    </html>
  );
}