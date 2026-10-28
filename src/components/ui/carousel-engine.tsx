"use client";

import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { CarouselApi } from "./carousel";

type EmblaParameters = Parameters<typeof useEmblaCarousel>;
type Plugins = EmblaParameters[1];

type CarouselEngineProps = {
	viewport: HTMLElement;
	opts: EmblaParameters[0];
	orientation: "horizontal" | "vertical";
	plugins?: Plugins | (() => Promise<Plugins>);
	onApi: (api: CarouselApi) => void;
};

export default function CarouselEngine({
	viewport,
	opts,
	orientation,
	plugins,
	onApi
}: CarouselEngineProps) {
	const [loadedPlugins, setLoadedPlugins] = useState<Plugins>();
	useEffect(() => {
		if (typeof plugins !== "function") return;
		let disposed = false;
		void plugins().then(result => {
			if (!disposed) setLoadedPlugins(result);
		});
		return () => {
			disposed = true;
		};
	}, [plugins]);

	const [attachViewport, api] = useEmblaCarousel(
		{ ...opts, axis: orientation === "horizontal" ? "x" : "y" },
		typeof plugins === "function" ? loadedPlugins : plugins
	);

	useEffect(() => {
		attachViewport(viewport);
		return () => attachViewport(null);
	}, [attachViewport, viewport]);

	useEffect(() => {
		onApi(api);
		return () => onApi(undefined);
	}, [api, onApi]);

	return null;
}
