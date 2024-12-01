'use client';

import MainLayout from '@/app/components/layout/MainLayout';
import EssayDetailsPage from '@/app/components/essay/EssayDetailsPage';
import { useParams } from 'next/navigation';

export default function Page() {
  const params = useParams();
  const id = params?.id as string;

  return (
    <MainLayout>
      <EssayDetailsPage id={id} />
    </MainLayout>
  );
}