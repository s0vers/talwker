import { getTranslations } from "next-intl/server";
import Navbar from "./navbar";
import type { NavbarCopy } from "./navbar-copy";

export default async function NavbarServer() {
	const t = await getTranslations("Navbar");
	const copy: NavbarCopy = {
		about: t("about"),
		contact: t("contact"),
		destinations: t("destinations"),
		destinationsCinematic: t("destinationsCinematic"),
		destinationsCinematicDesc: t("destinationsCinematicDesc"),
		destinationsStage: t("destinationsStage"),
		destinationsStageDesc: t("destinationsStageDesc"),
		destinationsStandard: t("destinationsStandard"),
		destinationsStandardDesc: t("destinationsStandardDesc"),
		home: t("home"),
		homeAtelier: t("homeAtelier"),
		homeAtelierDesc: t("homeAtelierDesc"),
		homeJournal: t("homeJournal"),
		homeJournalDesc: t("homeJournalDesc"),
		homeObservatory: t("homeObservatory"),
		homeObservatoryDesc: t("homeObservatoryDesc"),
		letsTalk: t("letsTalk"),
		mobileNav: t("mobileNav"),
		stories: t("stories"),
		toggleMenu: t("toggleMenu"),
		tours: t("tours")
	};
	return <Navbar copy={copy} />;
}
