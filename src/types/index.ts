export interface NewsItem {
  date: string
  title: string
  description: string
}

export interface Experience {
  title: string
  company: string
  location: string
  period: string
  description: string[]
}

export interface Education {
  degree: string
  field: string
  institution: string
  location: string
  period: string
  description?: string
  achievements?: string[]
  gpa?: string
}

export interface Publication {
  title: string
  authors: string
  venue: string
  year: string
  links?: {
    pdf?: string
    arxiv?: string
    code?: string
  }
}

export interface Honor {
  title: string
  year?: string
  description?: string
}

export interface SocialLinks {
  email: string
  epfl: string
  linkedin: string
  scholar: string
  github: string
}
