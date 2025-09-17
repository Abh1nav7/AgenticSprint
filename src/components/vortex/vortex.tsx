import React from 'react'
import config from './vortex.json'

type VortexProps = {
	children?: React.ReactNode
	className?: string
}

// Minimal Aceternity-inspired Vortex background using animated gradients and dots
export function Vortex({ children, className }: VortexProps) {
	return (
		<div className={"relative overflow-hidden " + (className ?? '')}>
			<div className="pointer-events-none absolute inset-0 -z-10">
				{/* radial glow based on config */}
				<div
					className="absolute left-1/2 -translate-x-1/2 rounded-full blur-2xl"
					style={{
						top: config.glow.yOffsetPx,
						height: config.glow.radiusPx,
						width: config.glow.radiusPx,
						background:
							`radial-gradient(circle at center, rgba(226,255,101,${config.glow.intensity}), transparent 60%)`,
					}}
				/>
				{/* animated vortex rings */}
				<div className="absolute inset-0">
					{config.rings.map((ring, i) => (
						<div
							key={i}
							className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 ${ring.reverse ? 'animate-[spin_30s_linear_infinite_reverse]' : 'animate-[spin_30s_linear_infinite]'}`}
							style={{ height: ring.size, width: ring.size, animationDuration: `${ring.durationSec}s` }}
						/>
					))}
				</div>
				{/* starfield */}
				<div
					className="absolute inset-0"
					style={{
						background: `radial-gradient(ellipse at top, rgba(255,255,255,${config.starfield.opacity}), transparent 60%)`,
					}}
				/>
			</div>
			{children}
		</div>
	)
}


