"use client";

import { useState } from "react";
import { Download, FileText, CheckCircle2 } from "lucide-react";
import { PRESS_KIT_ASSETS } from "../content/press-copy";

export function PressKits() {
	const [downloadingId, setDownloadingId] = useState<string | null>(null);

	const handleDownload = (id: string, fileName: string) => {
		setDownloadingId(id);
		setTimeout(() => {
			// Simulate trigger download
			const element = document.createElement("a");
			const file = new Blob([`Simulated asset download for ${fileName}`], { type: "text/plain" });
			element.href = URL.createObjectURL(file);
			element.download = fileName;
			document.body.appendChild(element);
			element.click();
			document.body.removeChild(element);
			setDownloadingId(null);
		}, 600);
	};

	return (
		<section id="press-kits" className="bg-[#050505] text-white py-16 md:py-24 border-t border-white/6">
			<div className="pad-x mx-auto max-w-[1600px]">
				<div className="mb-12">
					<p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-orange-500">
						Brand Assets & Resources
					</p>
					<h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
						Downloadable Press Kits
					</h2>
				</div>

				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
					{PRESS_KIT_ASSETS.map((asset) => (
						<div
							key={asset.id}
							className="flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0a0a0a] p-7 transition-all hover:border-white/20"
						>
							<div className="space-y-3">
								<div className="flex items-center justify-between">
									<div className="rounded-xl bg-orange-500/10 p-2.5 text-orange-500">
										<FileText className="h-5 w-5" />
									</div>
									<span className="rounded-full bg-white/5 border border-white/10 px-2.5 py-0.5 text-[10px] text-white/50">
										{asset.format} · {asset.size}
									</span>
								</div>
								<h3 className="text-lg font-bold tracking-tight text-white">{asset.title}</h3>
								<p className="text-xs leading-relaxed text-white/60">{asset.description}</p>
							</div>

							<div className="mt-6 pt-4 border-t border-white/10">
								<button
									type="button"
									onClick={() => handleDownload(asset.id, asset.fileName)}
									disabled={downloadingId === asset.id}
									className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition-all hover:bg-orange-500 hover:border-orange-500 disabled:opacity-50"
								>
									{downloadingId === asset.id ? (
										<>
											<CheckCircle2 className="h-4 w-4 animate-spin text-white" /> Preparing...
										</>
									) : (
										<>
											<Download className="h-4 w-4 text-orange-500 group-hover:text-white" /> Download Asset
										</>
									)}
								</button>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
