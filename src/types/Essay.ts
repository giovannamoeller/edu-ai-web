import EssayFeedback from "./EssayFeedback";

interface Essay {
  id: string;
  subject: string;
  createdAt: Date;
  totalScore?: number;
  feedback: EssayFeedback;
  rawContent: string;
  url: string;
}

export default Essay;