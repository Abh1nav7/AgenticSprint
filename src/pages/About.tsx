import React from 'react'
import { Button } from '@/components/ui/button'
import { BackgroundGradient } from '@/components/ui/background-gradient'
import { Vortex } from '@/components/ui/vortex'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Users, 
  Heart, 
  Brain, 
  Shield, 
  ArrowLeft,
  Github,
  Linkedin,
  Twitter
} from 'lucide-react'

const TeamMember: React.FC<{ name: string; role: string; image: string }> = ({ name, role, image }) => (
  <div className="group relative">
    <div className="relative h-80 w-full overflow-hidden rounded-2xl">
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/0 transition-opacity group-hover:opacity-80" />
      <img
        src={image}
        alt={name}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute bottom-6 left-6 right-6">
        <h3 className="text-xl font-semibold text-white">{name}</h3>
        <p className="mt-2 text-sm text-white/80">{role}</p>
      </div>
    </div>
  </div>
)

const ValueCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({
  icon,
  title,
  description,
}) => (
  <div className="group rounded-2xl border border-white/10 bg-white/5 p-6 transition-all hover:bg-white/[0.07]">
    <div className="flex items-start gap-4">
      <div className="rounded-xl bg-primary/20 p-3 text-primary">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-white">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-white/60">
          {description}
        </p>
      </div>
    </div>
  </div>
)

export const About: React.FC = () => {
  return (
    <main className="min-h-screen bg-black text-white">
      <Vortex>
        {/* Back Button */}
        <div className="absolute left-4 top-4 z-20">
          <Button variant="ghost" onClick={() => (window.location.href = '/')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </div>

        {/* Hero Section */}
        <section className="relative overflow-hidden pt-24">
          <div className="mx-auto max-w-6xl px-6 pb-24 pt-12 text-center">
            <h1 className="mx-auto max-w-3xl bg-gradient-to-b from-white to-white/60 bg-clip-text text-5xl font-bold tracking-tight text-transparent md:text-7xl">
              Advancing Healthcare Through AI Innovation
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-white/60">
              We're a team of healthcare professionals, data scientists, and engineers working together
              to make advanced medical diagnostics more accessible and accurate.
            </p>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-24">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-center text-3xl font-bold">Our Values</h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-white/60">
              Guided by our commitment to improving healthcare outcomes through responsible innovation.
            </p>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              <ValueCard
                icon={<Heart className="h-6 w-6" />}
                title="Patient-First Approach"
                description="Every feature and decision is made with patient wellbeing as our top priority, ensuring the highest standards of care."
              />
              <ValueCard
                icon={<Brain className="h-6 w-6" />}
                title="Continuous Innovation"
                description="We're constantly pushing the boundaries of what's possible with AI in healthcare diagnostics."
              />
              <ValueCard
                icon={<Shield className="h-6 w-6" />}
                title="Ethical AI"
                description="Our commitment to responsible AI development ensures transparent, unbiased, and accountable solutions."
              />
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-24">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-center text-3xl font-bold">Our Team</h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-white/60">
              Meet the experts behind MediAI, bringing together decades of experience in healthcare and artificial intelligence.
            </p>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              <TeamMember
                name="Dr. Sarah Chen"
                role="Chief Medical Officer"
                image="/team/member1.jpg"
              />
              <TeamMember
                name="Dr. James Wilson"
                role="AI Research Lead"
                image="/team/member2.jpg"
              />
              <TeamMember
                name="Dr. Maria Rodriguez"
                role="Clinical Director"
                image="/team/member3.jpg"
              />
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="relative py-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid gap-12 md:grid-cols-2">
              {/* Contact Info */}
              <div>
                <h2 className="text-3xl font-bold">Get in Touch</h2>
                <p className="mt-4 text-white/60">
                  Have questions about our AI diagnostic solutions? Our team is here to help.
                </p>

                <div className="mt-8 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="rounded-xl bg-primary/20 p-3 text-primary">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-medium text-white">Email Us</p>
                      <p className="mt-1 text-white/60">contact@mediai.com</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="rounded-xl bg-primary/20 p-3 text-primary">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-medium text-white">Call Us</p>
                      <p className="mt-1 text-white/60">+1 (888) 123-4567</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="rounded-xl bg-primary/20 p-3 text-primary">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-medium text-white">Visit Us</p>
                      <p className="mt-1 text-white/60">
                        100 Innovation Drive<br />
                        San Francisco, CA 94105
                      </p>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="mt-8 flex gap-4">
                  <a
                    href="#"
                    className="rounded-full bg-white/5 p-3 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a
                    href="#"
                    className="rounded-full bg-white/5 p-3 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a
                    href="#"
                    className="rounded-full bg-white/5 p-3 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <BackgroundGradient className="overflow-hidden rounded-2xl">
                  <form className="space-y-6 p-6">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-white/80">
                        Name
                      </label>
                      <input
                        type="text"
                        className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm outline-none ring-primary transition-all hover:border-white/20 focus:ring-2"
                        placeholder="Your name"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-white/80">
                        Email
                      </label>
                      <input
                        type="email"
                        className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm outline-none ring-primary transition-all hover:border-white/20 focus:ring-2"
                        placeholder="Your email"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-white/80">
                        Message
                      </label>
                      <textarea
                        rows={4}
                        className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm outline-none ring-primary transition-all hover:border-white/20 focus:ring-2"
                        placeholder="Your message"
                      />
                    </div>

                    <Button className="w-full">Send Message</Button>
                  </form>
                </BackgroundGradient>
              </div>
            </div>
          </div>
        </section>
      </Vortex>
    </main>
  )
}