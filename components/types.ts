export interface Character {
    id: number;
    name: string;
    image: string;
    species: string;
    gender: string;
    status: string;
    episode: string[];
    created: string;
    origin: {
      name: string;
    };
    location: {
      name: string;
    };
    type?: string;
  }