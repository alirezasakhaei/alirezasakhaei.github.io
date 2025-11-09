import type { NewsItem, Experience, Education, Publication, SocialLinks } from '../types'

export const newsItems: NewsItem[] = [
  {
    date: '2024-11-15',
    title: 'New Paper Accepted',
    description: 'Our latest research on machine learning has been accepted at a top-tier conference.'
  },
  {
    date: '2024-10-20',
    title: 'Keynote Speaker',
    description: 'Invited to give a keynote talk at the International Conference on AI.'
  },
  {
    date: '2024-09-10',
    title: 'Award Received',
    description: 'Received the Best Paper Award for outstanding contribution to the field.'
  }
]

export const experiences: Experience[] = [
  {
    title: 'Research Scientist',
    company: 'EPFL',
    location: 'Lausanne, Switzerland',
    period: '2022 - Present',
    description: [
      'Leading research projects in machine learning and artificial intelligence',
      'Published 15+ papers in top-tier conferences and journals',
      'Supervising PhD and Master students',
      'Collaborating with industry partners on cutting-edge projects'
    ]
  },
  {
    title: 'Postdoctoral Researcher',
    company: 'MIT',
    location: 'Cambridge, MA, USA',
    period: '2020 - 2022',
    description: [
      'Conducted research on deep learning architectures',
      'Developed novel algorithms for computer vision applications',
      'Collaborated with international research teams'
    ]
  },
  {
    title: 'PhD Student',
    company: 'Stanford University',
    location: 'Stanford, CA, USA',
    period: '2016 - 2020',
    description: [
      'Completed PhD in Computer Science',
      'Thesis on "Advanced Machine Learning Techniques"',
      'Teaching assistant for multiple courses'
    ]
  }
]

export const publications: Publication[] = [
  {
    title: 'Deep Learning for Computer Vision: A Comprehensive Survey',
    authors: 'Alireza Sakhaei, John Doe, Jane Smith',
    venue: 'CVPR 2024',
    year: '2024',
    links: {
      pdf: '#',
      arxiv: '#',
      code: '#'
    }
  },
  {
    title: 'Neural Architecture Search: Methods and Applications',
    authors: 'Alireza Sakhaei, Alice Johnson',
    venue: 'ICML 2024',
    year: '2024',
    links: {
      pdf: '#',
      code: '#'
    }
  },
  {
    title: 'Transformers in Natural Language Processing',
    authors: 'Alireza Sakhaei, Bob Wilson, Carol Brown',
    venue: 'NeurIPS 2023',
    year: '2023',
    links: {
      pdf: '#',
      arxiv: '#'
    }
  },
  {
    title: 'Reinforcement Learning for Autonomous Systems',
    authors: 'Alireza Sakhaei, David Lee',
    venue: 'AAAI 2023',
    year: '2023',
    links: {
      pdf: '#',
      code: '#'
    }
  }
]

export const socialLinks: SocialLinks = {
  email: 'mailto:alireza.sakhaei@epfl.ch',
  epfl: 'https://people.epfl.ch/alireza.sakhaei',
  linkedin: 'https://linkedin.com/in/alirezasakhaei',
  scholar: 'https://scholar.google.com/citations?user=YOUR_ID',
  github: 'https://github.com/alirezasakhaei'
}

export const education: Education[] = [
  {
    degree: 'Ph.D.',
    field: 'Computer Science',
    institution: 'Stanford University',
    location: 'Stanford, CA, USA',
    period: '2016 - 2020',
    gpa: '4.0/4.0',
    description: 'Specialized in Machine Learning and Artificial Intelligence',
    achievements: [
      'Summa Cum Laude',
      'Best Dissertation Award',
      'Published 8 papers during PhD',
      'Teaching Assistant of the Year'
    ]
  },
  {
    degree: 'M.Sc.',
    field: 'Computer Science',
    institution: 'MIT',
    location: 'Cambridge, MA, USA',
    period: '2014 - 2016',
    gpa: '3.95/4.0',
    description: 'Focus on Deep Learning and Neural Networks',
    achievements: [
      'Dean\'s List',
      'Research Excellence Award',
      'Graduate Fellowship Recipient'
    ]
  },
  {
    degree: 'B.Sc.',
    field: 'Computer Engineering',
    institution: 'Sharif University of Technology',
    location: 'Tehran, Iran',
    period: '2010 - 2014',
    gpa: '3.9/4.0',
    description: 'Top 5% of graduating class',
    achievements: [
      'Valedictorian',
      'Outstanding Student Award',
      'Multiple Academic Scholarships'
    ]
  }
]

export const personalInfo = {
  name: 'Alireza Sakhaei',
  title: 'Research Scientist at EPFL',
  bio: 'Passionate researcher working at the intersection of machine learning, artificial intelligence, and computer vision. Exploring novel algorithms and pushing the boundaries of what\'s possible.'
}

