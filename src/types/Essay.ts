interface Essay {
  id: string;
  subject: string;
  status: string;
  createdAt: Date;
  score?: number;
  //fileName: string;
  //fileType: string;
}

export default Essay;