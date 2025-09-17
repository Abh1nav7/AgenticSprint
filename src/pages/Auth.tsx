import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { BackgroundGradient } from '@/components/ui/background-gradient'
import { ShootingStars } from '@/components/ui/shooting-stars'
import { StarsBackground } from '@/components/ui/stars-background'
import { PasswordInput } from '@/components/ui/password-input'
import { validatePassword, validateEmail } from '@/lib/validation'
import { motion } from 'framer-motion'
import { Toast } from '@/components/ui/toast'
import { useToast } from '@/contexts/ToastContext'
import { useAuth } from '@/contexts/AuthContext'
import { getAuthErrorMessage } from '@/lib/errorMessages'

type AuthMode = 'login' | 'signup'

export const Auth: React.FC<{}> = (): JSX.Element => {
	const { user, signIn, signUp } = useAuth()
	const { show: showToast } = useToast()
	const [redirecting, setRedirecting] = useState(false)

	// Redirect if already logged in
	useEffect(() => {
		if (user) {
			window.location.href = '/dashboard'
		}
	}, [user])

	const [mode, setMode] = useState<AuthMode>('login')
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState<string | null>(null)
	const [emailValidation, setEmailValidation] = useState<{ isValid: boolean; suggestions: string[] }>({ isValid: true, suggestions: [] })
	const [passwordStrength, setPasswordStrength] = useState<{ score?: number; level: string; suggestions: string[] }>({ level: '', suggestions: [] })
	const [loading, setLoading] = useState(false)

	// Update validation state when inputs change
	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newEmail = e.target.value
		setEmail(newEmail)
		setEmailValidation(validateEmail(newEmail))
	}

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newPassword = e.target.value
		setPassword(newPassword)
		setPasswordStrength(validatePassword(newPassword))
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setError(null)
		setLoading(true)
		
		try {
			if (!email || !password || (mode === 'signup' && !name)) {
				throw new Error('All fields are required')
			}

			if (!emailValidation.isValid) {
				throw new Error('Please enter a valid email address')
			}

			if (mode === 'signup' && passwordStrength.score && passwordStrength.score < 3) {
				throw new Error('Please choose a stronger password')
			}

			if (mode === 'signup') {
				const { error } = await signUp(email, password, name)
				if (error) throw new Error(error)
				showToast('Account created successfully!', 'success')
			} else {
				const { error } = await signIn(email, password)
				if (error) throw new Error(error)
				showToast('Welcome back!', 'success')
				setRedirecting(true)
				setTimeout(() => {
					window.location.href = '/dashboard'
				}, 1000)
			}
		} catch (err: any) {
			console.error('Auth error:', err)
			setError(err.message)
			showToast(
				err.message,
				'error'
			)
		} finally {
			setLoading(false)
		}

	}

	return (
		<div className="relative min-h-screen w-full overflow-hidden">
			{/* Toast notifications are now handled by ToastContext */}
			
			{/* Back to landing */}
			<div className="absolute left-4 top-4 z-20">
				<Button variant="ghost" onClick={() => (window.location.href = '/')}>← Back to Home</Button>
			</div>

			{/* Background animation */}
			<ShootingStars />
			<StarsBackground />
			
			<div className="flex h-full min-h-screen items-center justify-center">
				<div className="w-full max-w-6xl px-4">
					<BackgroundGradient 
						containerClassName="w-full transform transition-all duration-500 hover:scale-[1.01]" 
						className="rounded-2xl border border-white/10 bg-black/90 backdrop-blur-xl p-8 shadow-2xl"
					>
						<div className="flex flex-col lg:flex-row gap-8 bg-black/80 p-6 rounded-xl">
							{/* Left side - Image */}
							<div className="hidden lg:flex items-center justify-center">
								<motion.img 
									src="/undraw_doctor_aum1.png" 
									alt="Healthcare Professional"
									initial={{ opacity: 0, x: -20 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ duration: 0.6 }}
									className="max-h-[400px] w-auto object-contain"
								/>
							</div>

							{/* Right side - Auth Form */}
							<div className="flex-1">
							{/* Brand header */}
							<div className="mb-8 text-center">
								<div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20 text-primary text-2xl">
									<motion.div
										initial={{ scale: 0.5, opacity: 0 }}
										animate={{ scale: 1, opacity: 1 }}
										transition={{ duration: 0.5 }}
									>
										🏥
									</motion.div>
								</div>
								<div>
									<motion.div
										initial={{ y: 10, opacity: 0 }}
										animate={{ y: 0, opacity: 1 }}
										transition={{ delay: 0.2, duration: 0.5 }}
										className="text-lg font-semibold"
									>
										Medi<span className="text-primary">AI</span>
									</motion.div>
									<motion.div
										initial={{ y: 10, opacity: 0 }}
										animate={{ y: 0, opacity: 1 }}
										transition={{ delay: 0.3, duration: 0.5 }}
										className="text-sm text-white/60"
									>
										Healthcare provider access
									</motion.div>
								</div>
							</div>

							<motion.div 
								initial={{ y: 10, opacity: 0 }}
								animate={{ y: 0, opacity: 1 }}
								transition={{ delay: 0.4, duration: 0.5 }}
								className="mb-8 flex rounded-lg bg-black/95 p-1 text-sm"
							>
								<button 
									onClick={() => setMode('login')} 
									className={`flex-1 rounded-md px-4 py-3 font-medium transition-all duration-200 ${
										mode === 'login' 
											? 'bg-primary text-black shadow-lg shadow-primary/20' 
											: 'text-white/80 hover:text-white hover:bg-white/5'
									}`}
								>
									Login
								</button>
								<button 
									onClick={() => setMode('signup')} 
									className={`flex-1 rounded-md px-4 py-3 font-medium transition-all duration-200 ${
										mode === 'signup' 
											? 'bg-primary text-black shadow-lg shadow-primary/20' 
											: 'text-white/80 hover:text-white hover:bg-white/5'
									}`}
								>
									Sign up
								</button>
							</motion.div>

							<motion.form 
								onSubmit={handleSubmit} 
								initial={{ y: 20, opacity: 0 }}
								animate={{ y: 0, opacity: 1 }}
								transition={{ delay: 0.5, duration: 0.5 }}
								className="space-y-5"
							>
								{mode === 'signup' && (
									<div>
										<label className="mb-1.5 block text-sm font-medium text-white/80">Name</label>
										<motion.div
											initial={{ x: -20, opacity: 0 }}
											animate={{ x: 0, opacity: 1 }}
											transition={{ duration: 0.3 }}
										>
											<input 
												value={name} 
												onChange={(e) => setName(e.target.value)} 
												required 
												className="w-full rounded-xl border border-white/10 bg-black/95 px-4 py-3 text-sm outline-none ring-primary focus:ring-2 transition-all hover:border-white/20" 
												placeholder="Enter your name"
											/>
										</motion.div>
									</div>
								)}
								<div>
									<label className="mb-1.5 block text-sm font-medium text-white/80">Email</label>
									<input 
										type="email" 
										value={email} 
										onChange={handleEmailChange}
										required 
										placeholder="Enter your email"
										className={`w-full rounded-xl border px-4 py-3 text-sm outline-none ring-primary focus:ring-2 transition-all hover:border-white/20 ${
											email && !emailValidation.isValid
												? 'border-red-500/50 bg-red-500/5 focus:ring-red-500/30'
												: 'border-white/10 bg-black/40'
										}`}
									/>
									{email && emailValidation.suggestions.length > 0 && (
										<motion.div 
											initial={{ opacity: 0, y: -10 }}
											animate={{ opacity: 1, y: 0 }}
											className="mt-2 text-xs text-amber-500/80 flex items-center gap-2"
										>
											<span className="text-lg">⚠️</span>
											{emailValidation.suggestions[0]}
										</motion.div>
									)}
								</div>
								<div>
									<label className="mb-1.5 block text-sm font-medium text-white/80">Password</label>
									<PasswordInput 
										value={password} 
										onChange={handlePasswordChange}
										required 
										className={`rounded-xl border px-4 py-3 text-sm outline-none ring-primary focus:ring-2 transition-all hover:border-white/20 ${
											password && passwordStrength.level === 'weak'
												? 'border-red-500/50 bg-red-500/5 focus:ring-red-500/30'
												: 'border-white/10 bg-black/40'
										}`}
									/>
									{password && (
										<motion.div 
											initial={{ opacity: 0, height: 0 }}
											animate={{ opacity: 1, height: 'auto' }}
											className="mt-3 space-y-2"
										>
											{/* Password strength indicator */}
											<div className="flex gap-1.5">
												{['weak', 'medium', 'strong', 'very-strong'].map((level, i) => (
													<div 
														key={level}
														className={`h-1 flex-1 rounded-full transition-all duration-500 ${
															['bg-red-500/50', 'bg-amber-500/50', 'bg-green-500/50', 'bg-primary/50'][i]
														} ${passwordStrength.level === level ? 'opacity-100' : 'opacity-20'}`}
													/>
												))}
											</div>
											{/* Strength label */}
											<div className="flex justify-between items-center text-xs">
												<span className={
													passwordStrength.level === 'weak' ? 'text-red-400' :
													passwordStrength.level === 'medium' ? 'text-amber-400' :
													passwordStrength.level === 'strong' ? 'text-green-400' :
													passwordStrength.level === 'very-strong' ? 'text-primary' :
													'text-white/40'
												}>
													{passwordStrength.level ? `Password strength: ${passwordStrength.level}` : 'Enter password'}
												</span>
											</div>
											{/* Show first suggestion if any */}
											{passwordStrength.suggestions.length > 0 && (
												<motion.div 
													initial={{ opacity: 0, x: -10 }}
													animate={{ opacity: 1, x: 0 }}
													className="text-xs text-amber-500/80 flex items-center gap-2"
												>
													<span className="text-lg">💡</span>
													{passwordStrength.suggestions[0]}
												</motion.div>
											)}
										</motion.div>
									)}
								</div>
								{error && (
									<motion.div 
										initial={{ opacity: 0, scale: 0.95 }}
										animate={{ opacity: 1, scale: 1 }}
										className="rounded-xl bg-red-500/10 p-3 text-sm text-red-400 flex items-center gap-2"
									>
										<span className="text-lg">❌</span>
										{error}
									</motion.div>
								)}
								<motion.div
									initial={{ y: 20, opacity: 0 }}
									animate={{ y: 0, opacity: 1 }}
									transition={{ delay: 0.1 }}
								>
									<Button 
										type="submit" 
										className="w-full py-6 text-base font-medium transition-transform active:scale-[0.98]"
										disabled={loading}
									>
										{loading 
											? (mode === 'login' ? 'Logging in...' : 'Creating account...') 
											: (mode === 'login' ? 'Login' : 'Create account')}
									</Button>
								</motion.div>
							</motion.form>
							</div>
						</div>
					</BackgroundGradient>
				</div>
			</div>
		</div>
	)
}