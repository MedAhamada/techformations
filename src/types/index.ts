export interface Formation {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  category: FormationCategory;
  level: FormationLevel;
  duration: string;
  price: number;
  priceLabel: string;
  badge?: string;
  featured?: boolean;
  available: boolean;
  comingSoon?: boolean;
  technologies: string[];
  outcomes: string[];
  image?: string;
  color: string;
  accentColor: string;
  modules?: FormationModule[];
  instructor?: Instructor;
  stats?: FormationStats;
}

export type FormationCategory =
  | 'devops'
  | 'cloud'
  | 'containers'
  | 'cicd'
  | 'monitoring'
  | 'security'
  | 'linux'
  | 'architecture';

export type FormationLevel = 'débutant' | 'intermédiaire' | 'avancé';

export interface FormationModule {
  id: string;
  title: string;
  duration: string;
  lessons: FormationLesson[];
}

export interface FormationLesson {
  title: string;
  type: 'video' | 'practice' | 'quiz' | 'project';
  duration?: string;
}

export interface Instructor {
  name: string;
  title: string;
  bio: string;
  avatar?: string;
  experience: string;
  specialties: string[];
  linkedin?: string;
  github?: string;
}

export interface FormationStats {
  students: number;
  rating: number;
  reviews: number;
  completionRate: number;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number | null;
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  cta: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar?: string;
  content: string;
  rating: number;
  formation: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}
