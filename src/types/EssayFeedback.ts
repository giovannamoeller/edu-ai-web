import CompetencyFeedback from "./CompetencyFeedback";

interface EssayFeedback {
  competencies: {
    [key: string]: CompetencyFeedback;
  };
  generalFeedback: string;
  totalScore: number;
}

export default EssayFeedback;