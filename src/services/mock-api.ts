import Essay from "@/types/Essay";

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
}

export const api = new MockAPI();