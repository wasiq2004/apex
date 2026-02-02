import { Course, Mentor, Event, Job, BlogPost, Category } from './types';

export { Category };

export const PARTNERS = [
  {
    name: "Google",
    logo: "/assest/google-icon-logo-svgrepo-com.svg",
  },
  {
    name: "Microsoft",
    logo: "/assest/microsoft-svgrepo-com.svg",
  },
  {
    name: "Meta",
    logo: "/assest/microsoft-svgrepo-com.svg",
  },
  {
    name: "Razorpay",
    logo: "/assest/google-icon-logo-svgrepo-com.svg",
  },
  {
    name: "IBM",
    logo: "/assest/microsoft-svgrepo-com.svg",
  },
  {
    name: "Adobe",
    logo: "/assest/google-icon-logo-svgrepo-com.svg",
  },
];

export const COURSES: Course[] = [
  {
    id: '1',
    title: 'Full Stack Web Development',
    category: Category.ComputerScience,
    description: 'Master frontend and backend technologies to build scalable enterprise-grade web applications.',
    rating: 4.9,
    enrollments: '15K+',
    modules: 12,
    duration: '1-3 Months',
    isBestSeller: true
  },
  {
    id: '2',
    title: 'Python Programming & Automation',
    category: Category.ComputerScience,
    description: 'Learn Python for scripting, automation, and core development with hands-on project exposure.',
    rating: 4.8,
    enrollments: '12K+',
    modules: 10,
    duration: '2 Months',
    isBestSeller: true
  },
  {
    id: '3',
    title: 'Data Science & Analytics',
    category: Category.ComputerScience,
    description: 'Transform raw data into strategic assets. Learn predictive modeling and ethical AI at scale.',
    rating: 4.7,
    enrollments: '20K+',
    modules: 11,
    duration: '3 Months',
    isBestSeller: true
  },
  {
    id: '4',
    title: 'AI & Machine Learning',
    category: Category.ComputerScience,
    description: 'Master the next frontier of intelligence. Built for architects looking to dominate the AI landscape.',
    rating: 4.9,
    enrollments: '35K+',
    modules: 14,
    duration: '3 Months',
    isBestSeller: true
  },
  {
    id: '5',
    title: 'Digital Marketing & Growth',
    category: Category.Management,
    description: 'Strategies for growth, SEO, SEM, and performance marketing in a digital-first economy.',
    rating: 4.6,
    enrollments: '8K+',
    modules: 8,
    duration: '2 Months'
  },
  {
    id: '6',
    title: 'HR Fundamentals',
    category: Category.Management,
    description: 'Understand modern workplace dynamics, talent acquisition, and professional management protocol.',
    rating: 4.8,
    enrollments: '5K+',
    modules: 12,
    duration: '2 Months'
  }
];

// Added MENTORS constant to resolve export error
export const MENTORS: Mentor[] = [
  {
    id: 'm1',
    name: 'Dr. Arjun Mehta',
    organization: 'Google',
    image: 'https://i.pravatar.cc/150?u=m1',
    linkedIn: '#',
    bio: 'Senior Software Architect with 15+ years of experience in distributed systems and cloud infrastructure.'
  },
  {
    id: 'm2',
    name: 'Sarah Jenkins',
    organization: 'Microsoft',
    image: 'https://i.pravatar.cc/150?u=m2',
    linkedIn: '#',
    bio: 'Cloud Infrastructure Lead specializing in Azure, Kubernetes, and global DevOps transformation.'
  },
  {
    id: 'm3',
    name: 'Priya Sharma',
    organization: 'Razorpay',
    image: 'https://i.pravatar.cc/150?u=m3',
    linkedIn: '#',
    bio: 'Product Management expert focused on fintech ecosystems and high-scale growth strategies.'
  },
  {
    id: 'm4',
    name: 'Michael Chen',
    organization: 'Meta',
    image: 'https://i.pravatar.cc/150?u=m4',
    linkedIn: '#',
    bio: 'AI Research Scientist working on large language models and real-time computer vision systems.'
  }
];

// Added BLOGS constant to resolve export error
export const BLOGS: BlogPost[] = [
  {
    id: 'b1',
    title: 'The Future of Full Stack Development in 2026',
    category: 'Technology',
    date: 'Oct 24, 2025',
    excerpt: 'Exploring the shift towards AI-augmented development, edge computing, and serverless architectures.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'b2',
    title: 'Mastering the Modern HR Landscape',
    category: 'Management',
    date: 'Nov 12, 2025',
    excerpt: 'How data analytics and employee experience platforms are transforming talent acquisition.',
    image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'b3',
    title: 'AI Ethics and Corporate Responsibility',
    category: 'AI/ML',
    date: 'Dec 05, 2025',
    excerpt: 'Navigating the complex world of ethical AI implementation and safety in enterprise settings.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200'
  }
];

export const TESTIMONIALS = [
  { text: "The training programs helped me gain practical exposure and interview confidence.", author: "Learner" },
  { text: "The internship structure was well-planned with meaningful project work.", author: "Intern" },
  { text: "Career support sessions were professional and effective.", author: "Early Professional" }
];

export const JOBS: Job[] = [
  {
    id: 'j1',
    role: 'Skill Development Intern',
    department: 'Technical',
    location: 'Bengaluru | Remote',
    type: 'Internship',
    description: 'Project-based internship simulating real-world work environments with mentor guidance.'
  }
];

export const FAQS = [
  {
    question: "What is the duration of internship programs?",
    answer: "Our project-based internships typically last between 1 to 3 months, featuring guided project assignments and performance reviews."
  }
];
