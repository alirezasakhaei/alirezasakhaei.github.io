import type { NewsItem, Experience, Education, Publication, SocialLinks, Honor } from '../types'

export const honors: Honor[] = [
  {
    title: 'Ranked 1st in Iran University Entrance Exam (Konkur)',
    year: '2019'
  },
  {
    title: 'Ranked 2nd in Electrical Engineering Class at Sharif University',
    description: 'Out of 165 students'
  }
]

export const newsItems: NewsItem[] = [
  // News items to be added later
]

export const experiences: Experience[] = [
  {
    title: 'Backend and AI Engineer',
    company: 'Worm',
    location: 'Remote',
    period: 'Jul 2025 - Present',
    description: [
      // Details to be added
    ]
  },
  {
    title: 'SRE and AI Developer',
    company: 'Rastar Co',
    location: 'Tehran, Iran',
    period: 'Jan 2025 - Jul 2025',
    description: [
      // Details to be added
    ]
  },
  {
    title: 'Algorithmic Trader - Classic and AI',
    company: 'Azhman Investment Co',
    location: 'Tehran, Iran',
    period: 'Jan 2024 - Dec 2024',
    description: [
      // Details to be added
    ]
  },
  {
    title: 'Research Assistant',
    company: 'EPFL NLP Lab',
    location: 'Switzerland',
    period: 'Jul 2023 - Sep 2023',
    description: [
      // Details to be added
    ]
  }
]

export const publications: Publication[] = [
  {
    title: 'Paper One',
    authors: 'Details to be added',
    venue: 'To be added',
    year: 'TBA',
    links: {}
  },
  {
    title: 'Paper Two',
    authors: 'Details to be added',
    venue: 'To be added',
    year: 'TBA',
    links: {}
  }
]

export const socialLinks: SocialLinks = {
  email: 'mailto:alirezasakhaeirad@gmail.com',
  epfl: 'https://people.epfl.ch/alireza.sakhaei',
  linkedin: 'https://linkedin.com/in/alireza-sakhaei-899800205',
  scholar: 'https://scholar.google.com/citations?user=pYhjrV4AAAAJ',
  github: 'https://github.com/Alireza-Sampour'
}

export const education: Education[] = [
  {
    degree: 'M.Sc.',
    field: 'Electrical Engineering',
    institution: 'EPFL',
    location: 'Lausanne, Switzerland',
    period: '2025 - Present',
    description: 'Specialization in Artificial Intelligence'
  },
  {
    degree: 'B.Sc.',
    field: 'Electrical Engineering',
    institution: 'Sharif University of Technology',
    location: 'Tehran, Iran',
    period: '2019 - 2024',
    gpa: '19.43/20'
  }
]

export const personalInfo = {
  name: 'Alireza Sakhaeirad',
  title: 'Electrical Engineering Student · AI Enthusiast',
  bio: 'I am an Electrical Engineering student at EPFL specializing in AI. My interests include machine learning, natural language processing, and algorithmic trading. I enjoy working on challenging problems at the intersection of theory and practice.'
}

