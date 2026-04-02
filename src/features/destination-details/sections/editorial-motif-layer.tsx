type Props = {
	label: string;
	dense?: boolean;
};

export function EditorialMotifLayer({ label, dense = false }: Props) {
	return (
		<div
			aria-hidden="true"
			className="pointer-events-none absolute inset-0 overflow-hidden"
			style={{ opacity: dense ? 0.32 : 0.22 }}
		>
			<svg className="h-full w-full" viewBox="0 0 1200 1800" fill="none">
				<path
					d="M32 126 C204 58 331 236 482 248 C638 262 744 120 920 188 C1040 236 1130 332 1168 492 C1214 686 1010 718 920 846 C816 988 852 1166 706 1308 C554 1456 306 1400 180 1548 C122 1618 106 1700 100 1766"
					stroke="currentColor"
					className="text-white/30"
					strokeWidth={dense ? 3 : 2}
					strokeLinecap="round"
				/>
				<text x="68" y="1700" className="fill-white/40 text-[42px] tracking-[0.4em] uppercase">
					{label}
				</text>
			</svg>
		</div>
	);
}
