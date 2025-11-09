import Hero from './Hero'
import News from './News'
import { newsItems } from '../data'

export default function Home() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start lg:items-center">
          <Hero />
          <News newsItems={newsItems} />
        </div>
      </div>
    </section>
  )
}

