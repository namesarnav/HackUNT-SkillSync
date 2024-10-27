interface Session {
    id: string;
    teacherId: string;
    studentId: string;
    subject: string;
    startTime: Date;
    duration: number;
    status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
    zoomLink: string;
    price: number;
    notes: {
      id: string;
      content: string;
      createdBy: string;
      isPrivate: boolean;
      createdAt: Date;
    }[];
    resources: {
      id: string;
      name: string;
      url: string;
      type: 'link' | 'file';
      addedBy: string;
      addedAt: Date;
    }[];
    feedback?: {
      rating: number;
      comment: string;
      givenBy: string;
      givenAt: Date;
    };
  }