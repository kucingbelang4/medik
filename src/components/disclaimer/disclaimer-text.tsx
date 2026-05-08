import React from 'react';
import { DISCLAIMER } from '../../types/drug';

interface DisclaimerTextProps {
  language?: 'en' | 'id';
}

export function DisclaimerText({ language = 'id' }: DisclaimerTextProps) {
  // Default Indonesian disclaimer
  const indonesianText = "Informasi ini hanya untuk tujuan edukasi. Ini BUKAN nasihat medis. Selalu konsultasikan dengan dokter atau apoteker sebelum mengonsumsi obat apapun. Dalam keadaan darurat, hubungi layanan darurat setempat.";

  const text = language === 'en' ? DISCLAIMER : indonesianText;

  return (
    <p className="disclaimer-text">
      {text}
    </p>
  );
}

export default DisclaimerText;