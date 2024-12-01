import Essay from "@/types/Essay";
import EssayFeedback from "@/types/EssayFeedback";
import EssayWithFeedback from "@/types/EssayWithFeedback";

let mockEssays: Essay[] = [
  {
    id: '1',
    subject: 'Impact of Social Media on Brazilian Youth Identity',
    status: 'completed',
    createdAt: new Date('2024-01-15T10:00:00Z'),
    score: 850
  },
  {
    id: '2',
    subject: 'Digital Inclusion Challenges in Contemporary Brazil',
    status: 'completed',
    createdAt: new Date('2024-02-01T15:30:00Z'),
    score: 920
  },
  {
    id: '3',
    subject: 'Combating Misinformation in the Digital Age',
    status: 'completed',
    createdAt: new Date('2024-02-15T09:15:00Z'),
    score: 780
  },
  {
    id: '4',
    subject: 'Environmental Preservation Strategies for the Amazon',
    status: 'completed',
    createdAt: new Date('2024-03-01T14:20:00Z'),
    score: 880
  },
  {
    id: '5',
    subject: 'Education\'s Role in Fighting Social Inequality',
    status: 'completed',
    createdAt: new Date('2024-03-10T11:20:00Z'),
    score: 840
  }
];

const generateEssayFeedback = (totalScore: number): EssayFeedback => {
  return {
    competencies: {
      'Text Structure and Organization': {
        score: generateCompetencyScore(totalScore),
        feedback: [
          'Clear paragraph organization with logical progression.',
          'Good structure but transitions could be smoother.',
          'Well-organized text with effective paragraph division.',
          'Basic structure present but needs better organization.',
          'Strong organizational skills demonstrated throughout.'
        ][Math.floor(Math.random() * 5)]
      },
      'Topic Development': {
        score: generateCompetencyScore(totalScore),
        feedback: [
          'In-depth analysis of the main arguments.',
          'Good topic exploration but needs more supporting evidence.',
          'Clear understanding of the theme demonstrated.',
          'Adequate development with room for deeper analysis.',
          'Comprehensive coverage of the subject matter.'
        ][Math.floor(Math.random() * 5)]
      },
      'Language Usage': {
        score: generateCompetencyScore(totalScore),
        feedback: [
          'Sophisticated vocabulary and proper grammar usage.',
          'Good command of language with minor improvements needed.',
          'Clear writing style with some grammar issues.',
          'Appropriate language use but could be more precise.',
          'Strong technical writing with few errors.'
        ][Math.floor(Math.random() * 5)]
      },
      'Argument Quality': {
        score: generateCompetencyScore(totalScore),
        feedback: [
          'Strong arguments supported by relevant examples.',
          'Good reasoning but could address counterpoints better.',
          'Clear position with adequate supporting evidence.',
          'Valid arguments that need stronger backing.',
          'Excellent critical thinking displayed.'
        ][Math.floor(Math.random() * 5)]
      },
      'Solution Proposal': {
        score: generateCompetencyScore(totalScore),
        feedback: [
          'Innovative and practical solutions presented.',
          'Reasonable proposals that need more detail.',
          'Good suggestions with implementation gaps.',
          'Creative solutions but need more feasibility analysis.',
          'Well-thought-out interventions proposed.'
        ][Math.floor(Math.random() * 5)]
      }
    },
    generalFeedback: [
      'Your essay demonstrates strong analytical skills and good understanding of the topic. Focus on developing more detailed examples and maintaining consistent argument quality throughout.',
      'The essay presents valid arguments with clear organization. Consider strengthening your conclusion and providing more specific examples to support your main points.',
      'Good overall structure and language usage. Work on developing deeper analysis and more concrete solution proposals.',
      'Strong technical writing skills displayed. Areas for improvement include addressing counterarguments and providing more detailed implementation strategies.',
      'Well-researched and thoughtfully presented arguments. Consider adding more diverse perspectives and strengthening the connections between ideas.'
    ][Math.floor(Math.random() * 5)],
    totalScore
  };
};

const generateCompetencyScore = (baseScore: number): number => {
  const baseCompetencyScore = Math.floor((baseScore / 1000) * 200);
  const variation = Math.floor(Math.random() * 3 - 1) * 20; // -20, 0, or +20
  const score = Math.round((baseCompetencyScore + variation) / 20) * 20;
  return Math.min(200, Math.max(0, score));
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const generateRandomScore = () => Math.floor(Math.random() * (950 - 650 + 1)) + 650;

class MockAPI {
  async fetchEssays(): Promise<Essay[]> {
    // Simulate network delay
    await delay(1000);

    return [...mockEssays].sort((a, b) => 
      b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async uploadEssay(file: File, subject: string): Promise<Essay> {
    await delay(2000); // Simulate upload delay

    const newEssay: Essay = {
      id: String(Date.now()),
      subject,
      status: 'processing',
      createdAt: new Date(),
    };

    mockEssays.push(newEssay);

    // Handle the processing state change
    setTimeout(() => {
      const index = mockEssays.findIndex(e => e.id === newEssay.id);
      if (index !== -1) {
        mockEssays[index] = {
          ...mockEssays[index],
          status: 'completed',
          score: generateRandomScore()
        };
      }
    }, 10000); // 10 seconds

    return newEssay;
  }

  async getEssay(id: string): Promise<Essay> {
    await delay(500);
    
    const essay = mockEssays.find(e => e.id === id);
    if (!essay) {
      throw new Error('Essay not found');
    }
    
    return essay;
  }

  async clearEssays(): Promise<void> {
    mockEssays = [];
  }

  async getEssayWithFeedback(id: string): Promise<EssayWithFeedback> {
    await delay(500);
    
    const essay = mockEssays.find(e => e.id === id);
    if (!essay) {
      throw new Error('Essay not found');
    }
    
    if (essay.status === 'processing') {
      return essay;
    }

    return {
      ...essay,
      feedback: generateEssayFeedback(essay.score || 0)
    };
  }
}

export const api = new MockAPI();