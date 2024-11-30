'use client';

import MainLayout from '@/app/components/layout/MainLayout';
import EssayUpload from '@/app/components/essay/EssayUpload';
import { useRouter } from 'next/navigation';

export default function EssayUploadPage() {
  const router = useRouter();
  
  const handleClose = () => {
    router.push('/essays');
  };

  return (
    <MainLayout>
      <EssayUpload onClose={handleClose} />
    </MainLayout>
  );
}