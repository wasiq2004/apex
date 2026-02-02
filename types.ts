
export interface Course {
  id: string;
  title: string;
  category: string;
  description: string;
  rating: number;
  enrollments: string;
  modules: number;
  duration: string;
  isBestSeller?: boolean;
}

export interface Mentor {
  id: string;
  name: string;
  organization: string;
  image: string;
  linkedIn: string;
  bio?: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  speaker: string;
  participants: string;
  isPast: boolean;
  recordingUrl?: string;
}

export interface Job {
  id: string;
  role: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Internship' | 'Contract';
  description: string;
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  image: string;
}

export enum Category {
  ComputerScience = 'Computer Science',
  Management = 'Management',
  ECE = 'ECE',
  BioTech = 'Bio Technology',
  Civil = 'Civil',
  Mechanical = 'Mechanical'
}
