import React, { useState } from 'react'
import { Vortex } from '@/components/ui/vortex'
import { Button } from '@/components/ui/button'
import { HoverBorderGradient } from '@/components/ui/hover-border-gradient'
import { LineChart, ShieldCheck, Sparkles, Github, Linkedin, Twitter, Brain, FileSearch, BellRing, LayoutDashboard, FileBarChart } from 'lucide-react'
import { HowItWorks } from '@/components/sections/how-it-works'

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; desc: string }> = ({ icon, title, desc }) => (
	<div className="group relative rounded-xl border border-white/10 bg-white/5 p-6 transition hover:border-white/20 hover:bg-white/[0.07]">
		<div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-primary">
			{icon}
		</div>
		<h3 className="mb-2 text-lg font-semibold text-white">{title}</h3>
		<p className="text-sm text-white/70">{desc}</p>
		<div className="pointer-events-none absolute inset-0 -z-10 rounded-xl opacity-0 ring-1 ring-primary/30 blur-2xl transition group-hover:opacity-100" />
	</div>
)

export const Landing: React.FC = () => {
	return (
		<main className="relative min-h-screen bg-black text-white">
			<Vortex className="pb-24">
				<header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
					<div className="text-xl font-bold tracking-tight text-white">Medi<span className="text-primary">AI</span></div>
					<HoverBorderGradient
						containerClassName="rounded-full hidden md:inline-flex"
						className="dark:bg-black bg-black text-white"
						onClick={() => (window.location.href = '/auth')}
					>
						Get Started
					</HoverBorderGradient>
				</header>

				<section id="home" className="mx-auto mt-12 w-full max-w-6xl px-6 text-center">
					<h1 className="mx-auto max-w-5xl text-5xl font-extrabold tracking-tight md:text-7xl">
						Evidence-Based Diagnostics. Faster Care.
					</h1>
					<p className="mx-auto mt-4 max-w-3xl text-lg text-white/70 md:text-xl">
						An AI-powered diagnostic assistant that synthesizes patient data into comprehensive, evidence-based diagnostic insights with full auditability and traceability.
					</p>
					<div className="mt-8 flex items-center justify-center gap-4">
						<HoverBorderGradient
							containerClassName="rounded-full"
							className="dark:bg-black bg-black text-white px-6 py-3"
							onClick={() => (window.location.href = '/auth')}
						>
							Get Started
						</HoverBorderGradient>
						<Button 
							size="lg" 
							variant="outline"
							onClick={() => (window.location.href = '/learn-more')}
						>
							Learn More
						</Button>
					</div>
				</section>

				<section id="features" className="mx-auto mt-24 w-full max-w-6xl px-6">
					<h2 className="mb-6 text-center text-2xl font-semibold tracking-tight text-white/90 md:text-3xl">Features</h2>
					<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
						<FeatureCard
							icon={<Brain className="h-5 w-5" />}
							title="Smart Diagnostics"
							desc="Synthesize patient history, symptoms, vitals, labs, and clinical notes into comprehensive diagnostic summaries."
						/>
						<FeatureCard
							icon={<ShieldCheck className="h-5 w-5" />}
							title="Clinical Validation"
							desc="Evidence-based insights with full traceability to source data and clinical references."
						/>
						<FeatureCard
							icon={<BellRing className="h-5 w-5" />}
							title="Urgent Detection"
							desc="Proactive identification of red-flag conditions requiring immediate clinical attention."
						/>
					</div>
				</section>

				{/* How It Works - Infinite scrolling cards */}
				<HowItWorks />

				{/* Why Choose Us – interactive split layout */}
				<section id="why" className="mx-auto mt-24 w-full max-w-6xl px-6">
					<div className="mb-8 text-center">
						<h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">Clinical Excellence</h2>
						<p className="mx-auto mt-3 max-w-3xl text-sm text-white/70 md:text-base">Built for healthcare providers who demand accuracy, speed, and evidence-based insights.</p>
					</div>
					{(() => {
						const items = [
							{ key: 'diagnostic', icon: <Brain className="h-4 w-4" />, title: 'Advanced Diagnostics', desc: 'AI-powered analysis of comprehensive patient data.' },
							{ key: 'evidence', icon: <FileSearch className="h-4 w-4" />, title: 'Evidence-Based', desc: 'All insights linked to clinical data and research.' },
							{ key: 'triage', icon: <BellRing className="h-4 w-4" />, title: 'Smart Triage', desc: 'Immediate detection of urgent clinical conditions.' },
							{ key: 'confidence', icon: <LineChart className="h-4 w-4" />, title: 'Confidence Scoring', desc: 'Ranked diagnoses with statistical confidence levels.' },
							{ key: 'interface', icon: <LayoutDashboard className="h-4 w-4" />, title: 'Intuitive Interface', desc: 'Streamlined workflow for faster clinical decisions.' },
							{ key: 'reports', icon: <FileBarChart className="h-4 w-4" />, title: 'Clinical Reports', desc: 'Comprehensive summaries for healthcare teams.' },
						] as const

						const [active, setActive] = useState<(typeof items)[number]['key']>('diagnostic')
						const selected = items.find(i => i.key === active)!

						return (
							<div className="grid grid-cols-1 gap-8 md:grid-cols-2">
								{/* Dynamic illustration panel */}
								<div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-[#0b0b0b] to-[#0f0f0f] p-6">
									<div className="absolute -left-28 -top-28 h-64 w-64 rounded-full bg-[radial-gradient(circle_at_center,rgba(226,255,101,0.15),transparent_60%)] blur-2xl" />
									<div className="absolute -right-24 -bottom-24 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,rgba(226,255,101,0.12),transparent_60%)] blur-2xl" />
									<div className="relative z-10 grid h-[320px] place-items-center rounded-xl border border-white/10 bg-black/40">
										<div className="flex flex-col items-center text-center">
											<span className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20 text-primary">{selected.icon}</span>
											<h3 className="text-lg font-semibold">{selected.title}</h3>
											<p className="mt-1 max-w-md text-sm text-white/70">{selected.desc}</p>
											<div className="mt-6 grid w-full max-w-md grid-cols-6 items-end gap-2">
												{[6,12,9,14,8,11].map((h, idx) => (
													<div key={idx} className="h-24 w-full rounded-sm bg-white/5">
														<div className="w-full rounded-sm bg-primary/70" style={{height: `${h * 4}px`}} />
													</div>
												))}
											</div>
										</div>
									</div>
								</div>

								{/* Value props list */}
								<ul className="space-y-4">
									{items.map((item) => (
										<li key={item.key}>
											<button onClick={() => setActive(item.key)} className={`w-full rounded-xl border p-4 text-left transition ${active === item.key ? 'border-primary/40 bg-primary/10' : 'border-white/10 bg-white/[0.04] hover:border-white/20 hover:bg-white/[0.06]'}`}>
												<div className="flex gap-3">
													<span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-md bg-primary/20 text-primary">{item.icon}</span>
													<div>
														<h3 className="text-sm font-semibold">{item.title}</h3>
														<p className="text-sm text-white/70">{item.desc}</p>
													</div>
												</div>
											</button>
										</li>
									))}
								</ul>
							</div>
						)
					})()}
				</section>

				<footer className="mt-24 w-full border-t border-white/10 bg-black">
					<div className="mx-auto w-full max-w-6xl px-6 py-16">
						<div className="grid grid-cols-1 gap-16 md:grid-cols-4">
							{/* Company Info - Left aligned */}
							<div className="space-y-4">
								<div className="text-xl font-bold tracking-tight text-white">Medi<span className="text-primary">AI</span></div>
								<p className="text-sm text-white/60">AI-Powered Healthcare Diagnostics.</p>
								
								{/* Social Links - Below company info */}
								<div className="flex items-center gap-4 pt-6">
									<a aria-label="LinkedIn" href="#" className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-white/5 text-white/80 hover:bg-white/10">
										<Linkedin className="h-4 w-4" />
									</a>
									<a aria-label="GitHub" href="#" className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-white/5 text-white/80 hover:bg-white/10">
										<Github className="h-4 w-4" />
									</a>
									<a aria-label="Twitter" href="#" className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-white/5 text-white/80 hover:bg-white/10">
										<Twitter className="h-4 w-4" />
									</a>
								</div>
							</div>

							{/* Quick Links - Organized in columns */}
							<div className="space-y-4">
								<h3 className="text-sm font-semibold text-white">Solutions</h3>
								<nav className="flex flex-col items-start gap-3 text-sm">
									<a className="text-white/70 hover:text-white transition" href="#features">Clinical AI</a>
									<a className="text-white/70 hover:text-white transition" href="#pricing">Medical Imaging</a>
									<a className="text-white/70 hover:text-white transition" href="#integrations">Lab Analytics</a>
									<a className="text-white/70 hover:text-white transition" href="#updates">Research</a>
								</nav>
							</div>

							<div className="space-y-4">
								<h3 className="text-sm font-semibold text-white">Company</h3>
								<nav className="flex flex-col items-start gap-3 text-sm">
									<a className="text-white/70 hover:text-white transition" href="/about">About</a>
									<a className="text-white/70 hover:text-white transition" href="/about#team">Clinical Team</a>
									<a className="text-white/70 hover:text-white transition" href="/about#careers">Careers</a>
									<a className="text-white/70 hover:text-white transition" href="/about#press">Publications</a>
								</nav>
							</div>

							<div className="space-y-4">
								<h3 className="text-sm font-semibold text-white">Support</h3>
								<nav className="flex flex-col items-start gap-3 text-sm">
									<a className="text-white/70 hover:text-white transition" href="#docs">Documentation</a>
									<a className="text-white/70 hover:text-white transition" href="#help">Clinical Support</a>
									<a className="text-white/70 hover:text-white transition" href="#community">Provider Portal</a>
									<a className="text-white/70 hover:text-white transition" href="#contact">Contact</a>
								</nav>
							</div>
						</div>
					</div>
				</footer>
			</Vortex>
		</main>
	)
}


