import MainLayout from '@/app/components/layout/MainLayout';
import EssayDetailsPage from '@/app/components/essay/EssayDetailsPage';

type Props = {
  params: { id: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default async function Page({ params }: Props) {
  return (
    <MainLayout>
      <EssayDetailsPage id={params.id} />
    </MainLayout>
  );
}