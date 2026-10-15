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
  citations?: string
  links?: {
    pdf?: string
    arxiv?: string
    code?: string
  }
}

export interface Honor {
  stat?: string
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
  X: string
  telegram: string
}

export interface Interest {
  emoji?: string
  title: string
  description: string
}

export interface DiaryEntry {
  id: string
  title: string
  year: number | null
  watchedDate: string
  rating: number | null
  liked: boolean
  rewatch: boolean
  review: string | null
  poster: string | null
  url: string
}

export interface WatchlistFilm {
  slug: string
  title: string
  year: number | null
  poster: string | null
  url: string
}

export interface DiaryResponse {
  username: string
  profile: string
  entries: DiaryEntry[]
  // null when the watchlist page couldn't be read
  watchlist: WatchlistFilm[] | null
}
