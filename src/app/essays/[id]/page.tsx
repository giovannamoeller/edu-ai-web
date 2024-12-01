import MainLayout from '@/app/components/layout/MainLayout';
import EssayDetailsPage from '@/app/components/essay/EssayDetailsPage';

export default function Page({ params }: { params: { id: string } }) {
  return (
    <MainLayout>
      <EssayDetailsPage id={params.id} />
    </MainLayout>
  );
}