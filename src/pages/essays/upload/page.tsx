import MainLayout from '../../../app/components/layout/MainLayout';
import EssayUpload from '../../../app/components/essay/EssayUpload';

export default function EssayUploadPage() {
  return (
    <MainLayout>
      <EssayUpload onClose={() => {}} />
    </MainLayout>
  );
}