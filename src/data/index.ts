import type { NewsItem, Experience, Education, Publication, SocialLinks, Honor, Interest } from '../types'

export const honors: Honor[] = [
  {
    title: 'Ranked 2nd in Electrical Engineering Class at Sharif University',
    description: 'Out of 165 students'
  },
  {
    title: 'Ranked 1st in Iran University Entrance Exam (Konkur) in 150K participants',
    year: '2019'
  },
]

export const newsItems: NewsItem[] = [
  {
    date: '2026-01-01',
    title: 'Joined Schole AI as an AI Engineer!',
    description: ''
  },
  {
    date: '2025-09-01',
    title: 'Started my Master\'s degree at EPFL!',
    description: ''
  }
]

export const experiences: Experience[] = [
  {
    title: 'AI Engineer',
    company: 'Schole AI',
    location: 'Lausanne, Switzerland',
    period: 'Jan 2026 - Present',
    description: [
      'Building document processing infrastructure that handles messy real world files at scale, from ingestion pipelines to AI powered analysis. I work across the stack here: designing backend systems for large scale document storage and retrieval, wiring up multi modal AI models for understanding, classification, and content extraction, and building the frontend interfaces that let people actually use all of it. It\'s a fun mix of research-y AI work and solid engineering.'
    ]
  },
  {
    title: 'Backend and AI Engineer',
    company: 'Worm',
    location: 'Remote',
    period: 'Jul 2025 - Jan 2026',
    description: [
      'Working on an AI powered prediction market platform built on Solana. I\'ve been building various AI systems using LangChain and LangGraph, from simple ones to more complex setups with RAG. Also built the Django backend that handles all the AI and data services. One of the more interesting projects has been developing a market making system that does high frequency trading. It\'s pretty fascinating watching these algorithms make decisions in milliseconds.'
    ]
  },
  {
    title: 'Software and AI Engineer',
    company: 'Rastar Co',
    location: 'Tehran, Iran',
    period: 'Jan 2025 - Jul 2025',
    description: [
      'Built backends for online games using Django and FastAPI, with Redis for caching and Celery for handling async tasks. Led a small team, did sprint planning, code reviews, and helped junior developers learn and grow. Also handled server infrastructure, deployment pipelines, and keeping systems running smoothly. Added some AI features to the games, which was a fun challenge combining backend work with machine learning.'
    ]
  },
  {
    title: 'Algorithmic Trader',
    company: 'Azhman Investment Co',
    location: 'Tehran, Iran',
    period: 'Jan 2024 - Dec 2024',
    description: [
      'Built high frequency trading algorithms for the Iranian stock market and crypto. Worked with different strategies like statistical arbitrage, spread trading, and market making. Also developed AI powered trading systems that use machine learning to predict prices and generate signals. Spent a lot of time optimizing execution to reduce slippage and manage risk across different assets. Every millisecond counts in this kind of work.'
    ]
  },
  {
    title: 'Research Assistant',
    company: 'EPFL NLP Lab',
    location: 'Switzerland',
    period: 'Jul 2023 - Sep 2023',
    description: [
      'Worked on fine tuning large language models (up to 70B parameters) for specific domains. Studied how LLMs could be used in education and healthcare, looking at both what works and what doesn\'t. Experimented with different prompting techniques like few shot learning and chain of thought reasoning. Got to work with researchers from different backgrounds, which taught me a lot about how people from different fields approach AI problems. This experience really got me interested in doing more research.'
    ]
  },
  {
    title: 'Math Tutor',
    company: 'Self Employed',
    location: 'Remote',
    period: '2019 - 2022',
    description: [
      'Taught geometry and calculus to high school students preparing for university entrance exams.'
    ]
  }
]

export const publications: Publication[] = [
  {
    title: 'Meditron 70b: Scaling medical pretraining for large language models',
    authors: 'Zeming Chen, Alejandro Hernández Cano, Angelika Romanou, Antoine Bonnet, Kyle Matoba, Francesco Salvi, Matteo Pagliardini, Simin Fan, Andreas Köpf, Amirkeivan Mohtashami, Alexandre Sallinen, Alireza Sakhaeirad, et al.',
    venue: 'arXiv preprint',
    year: '2023',
    citations: '515 citations',
    links: {
      arxiv: 'https://arxiv.org/pdf/2311.16079'
    }
  },
  {
    title: 'Could ChatGPT get an engineering degree? Evaluating higher education vulnerability to AI assistants',
    authors: 'Beatriz Borges, Negar Foroutan, Deniz Bayazit, Anna Sotnikova, Syrielle Montariol, Tanya Nazaretzky, Mohammadreza Banaei, Alireza Sakhaeirad, Philippe Servant, Seyed Parsa Neshaei, et al.',
    venue: 'Proceedings of the National Academy of Sciences (PNAS)',
    year: '2024',
    citations: '23 citations',
    links: {
      pdf: 'https://www.pnas.org/doi/full/10.1073/pnas.2414955121'
    }
  },
  {
    title: 'Beyond Pattern Matching: Evaluating Cultural Conceptual Reasoning in Persian Language Models',
    authors: 'Alireza Sakhaeirad, Ali Ma\'manpoosh, Arshia Hemmat',
    venue: 'SilkroadNLP Workshop at EACL',
    year: '2026',
    links: {
      arxiv: 'https://arxiv.org/abs/2602.17623'
    }
  },
  {
    title: 'CriteriaPO: Criteria Preference Optimization from Fine-Grained AI Feedback',
    authors: 'Beatriz Borges, Alireza Sakhaeirad, Silin Gao, Syrielle Montariol, Antoine Bosselut',
    venue: 'ICML Submission',
    year: '2026'
  }
]

export const socialLinks: SocialLinks = {
  email: 'mailto:alirezasakhaeirad@gmail.com',
  epfl: 'https://people.epfl.ch/alireza.sakhaeirad',
  linkedin: 'https://linkedin.com/in/alireza-sakhaei-899800205',
  scholar: 'https://scholar.google.com/citations?user=pYhjrV4AAAAJ',
  github: 'https://github.com/Alirezasakhaei',
  X: 'https://X.com/Alireza_skhr',
  telegram: 'https://t.me/Alirezasakhaei'
}

export const education: Education[] = [
  {
    degree: 'M.Sc.',
    field: 'Electrical Engineering',
    institution: 'EPFL',
    location: 'Lausanne, Switzerland',
    period: '2025 - Present',
    description: 'Specialization in Artificial Intelligence · Minor in Data Science'
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

export const interests: Interest[] = [
  {
    emoji: '🤖',
    title: 'LLM Scaling & Optimization',
    description: 'Researching efficient ways to scale language models and optimize their performance under resource constraints. Interested in parameter efficient fine tuning, quantization, and inference optimization techniques'
  },
  {
    emoji: '🧠',
    title: 'AI Reasoning & Agentic Systems',
    description: 'Studying how AI systems reason and make decisions. Exploring chain of thought mechanisms, RAG, multi agent architectures, and how to build systems that can break down complex problems autonomously'
  },
  {
    emoji: '🎮',
    title: 'Reinforcement Learning',
    description: 'Studying how agents learn through interaction with environments. Interested in policy optimization, multi agent RL, and how reinforcement learning can be combined with language models for complex decision making'
  },
  {
    emoji: '⚙️',
    title: 'Intelligent Automation',
    description: 'Exploring how AI can automate complex workflows and decision making processes. From automating data pipelines to building systems that can handle multi step tasks with minimal human intervention'
  },
  {
    emoji: '📊',
    title: 'AI for Financial Markets',
    description: 'Researching algorithmic trading strategies and market microstructure. Interested in how machine learning can be applied to price prediction, risk management, and automated trading systems'
  },
  {
    emoji: '⚡',
    title: 'Efficient ML Systems',
    description: 'Studying GPU architectures, distributed training, and how to make ML systems faster and more efficient. Interested in the intersection of hardware and software optimization for AI workloads'
  }
]

export const personalInfo = {
  name: 'Alireza Sakhaeirad',
  title: 'AI & Full-Stack Engineer · MSc of AI at EPFL',
  bio: 'At 6 I wanted to be an astronaut, at 12 an athlete, at 15 a poet, at 17 a mathematician, but turned out an AI engineer and software developer :) I still enjoy poems and work out regularly. My native language is Persian, I\'m fluent in English, and I consider myself A2 in French (but I\'m A1 tbh). I also speak a little bit of Spanish. Got something cool in mind? Text me!'
}

