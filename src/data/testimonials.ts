import type { Testimonial } from '../types';

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Thomas Lefebvre',
    role: 'Développeur Fullstack',
    company: 'Startup SaaS',
    content:
      "Avant cette formation, Docker me faisait peur et je déployais mes apps à la main. Maintenant j'ai un pipeline CI/CD complet qui se déclenche à chaque push. La formation est dense, très pratique et orientée terrain. Rien de théorique pour rien.",
    rating: 5,
    formation: 'Formation DevOps pour développeurs',
  },
  {
    id: '2',
    name: 'Camille Durand',
    role: 'Lead Developer',
    company: 'Agence web',
    content:
      'Je cherchais à structurer notre infra pour l\'équipe. Cette formation m\'a donné toutes les clés : Nginx, Docker Compose, GitHub Actions, monitoring. Maintenant on a une vraie culture DevOps dans l\'équipe.',
    rating: 5,
    formation: 'Formation DevOps pour développeurs',
  },
  {
    id: '3',
    name: 'Yassine Benali',
    role: 'Freelance Backend',
    company: 'Indépendant',
    content:
      'En tant que freelance, je devais proposer du déploiement à mes clients mais je ne savais pas par où commencer. Cette formation est complète, bien structurée, et le projet fil rouge est exactement ce dont on a besoin en conditions réelles.',
    rating: 5,
    formation: 'Formation DevOps pour développeurs',
  },
  {
    id: '4',
    name: 'Julie Marchand',
    role: 'Développeuse React',
    company: 'Scale-up',
    content:
      'Le module monitoring avec Grafana était une révélation. Je savais coder mais la prod était une boite noire. Maintenant je sais exactement ce qui se passe sur mes serveurs. Formation excellent rapport qualité/prix.',
    rating: 5,
    formation: 'Formation DevOps pour développeurs',
  },
  {
    id: '5',
    name: 'Marc Thibault',
    role: 'CTO',
    company: 'SaaS B2B',
    content:
      'Recommandé à toute mon équipe dev. Le contenu est professionnel, on sent que c\'est quelqu\'un qui a vraiment déployé des apps en prod. Les scripts et templates fournis sont réutilisables directement en projet réel.',
    rating: 5,
    formation: 'Formation DevOps pour développeurs',
  },
  {
    id: '6',
    name: 'Amira Khelil',
    role: 'Développeuse Node.js',
    company: 'Fintech',
    content:
      'J\'avais déjà touché à Docker mais sans vraiment comprendre. Là je comprends enfin la logique complète : de l\'image à la prod, en passant par le CI/CD et la sécurité. Formation de très haute qualité.',
    rating: 5,
    formation: 'Formation DevOps pour développeurs',
  },
];
