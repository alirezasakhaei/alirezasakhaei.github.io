import Hero from './Hero'
import Honors from './Honors'
import { honors } from '../data'

export default function Home() {
  return (
    <section id="home" className="px-4 sm:px-6 lg:px-8 pt-28 sm:pt-36 pb-16">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_20rem] gap-12 lg:gap-16 items-start">
        <Hero />
        <div className="space-y-10 lg:pt-10">
          <div className="relative w-56 sm:w-64 lg:w-full mx-auto lg:mx-0">
            <img
              src="/me.jpeg"
              alt="Alireza Sakhaeirad"
              className="relative w-full aspect-square object-cover border-2 border-ink shadow-hard-coral -rotate-2"
            />
          </div>
          <Honors honors={honors} />
        </div>
      </div>
    </section>
  )
}
