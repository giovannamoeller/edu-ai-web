import Essay from "./Essay";
import EssayFeedback from "./EssayFeedback";

interface EssayWithFeedback extends Essay {
  feedback?: EssayFeedback;
}

export default EssayWithFeedback;