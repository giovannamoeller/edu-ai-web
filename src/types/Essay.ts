interface Essay {
  id: string;
  subject: string;
  status: 'completed' | 'processing';
  createdAt: Date;
  score?: number;
}

export default Essay;