 export interface Challenge {
    id: string;
    title: string;
    startDate: string;
    endDate: string;
    description: string;
    CountCreations: number;
  }


  export interface Winner {
    imageUrl: string;
    user?: {
      name: string;
    };
    votes: number;
  }