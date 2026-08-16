import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
	const t = useTranslations("Common");

	return (
		<div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
			<span className="text-8xl font-bold tracking-tighter text-orange-500">404</span>
			<h1 className="mt-4 text-3xl font-light tracking-tight text-white md:text-4xl">
				{t("pageNotFound")}
			</h1>
			<p className="mt-3 max-w-md text-sm text-white/50">
				{t("pageNotFoundDesc")}
			</p>
			<Link
				href="/"
				className="mt-8 inline-flex items-center justify-center rounded-full border border-orange-500/60 bg-orange-500/10 px-8 py-3 text-sm font-semibold uppercase tracking-wider text-orange-400 transition-colors hover:bg-orange-500 hover:text-white"
			>
				{t("backHome")}
			</Link>
		</div>
	);
}
