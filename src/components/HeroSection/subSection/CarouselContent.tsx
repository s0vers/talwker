import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import React from "react";

export default function CarouselBanner({ item }: { item: Banner }) {
	return (
		<>
			<Image
				src={item.image}
				alt="plane Image"
				width={1800}
				height={400}
				className="h-dvh w-full object-cover"
				placeholder="blur"
				blurDataURL="/image.jpg"
				priority
			/>

			<div className="absolute bottom-14 flex w-full cursor-default flex-col justify-between px-7 align-middle text-white md:flex-row md:items-center">
				<div>
					<span className="cursor-pointer rounded-3xl bg-slate-600/40 px-6 py-2 text-xl font-semibold text-[#2a9d8f]">
						{item.category}
					</span>
					<h1 className="my-4 text-4xl font-bold">{item.title}</h1>
					<p className=" max-w-2xl">{item.description}</p>
				</div>
				<div className="flex flex-col pt-4 md:items-end md:pt-0">
					<div className="flex items-center gap-4 align-middle">
						<Avatar>
							<AvatarImage src={item.author.avatar} />
							<AvatarFallback>{item.author.name}</AvatarFallback>
						</Avatar>
						<h2 className="text-xl font-medium md:hidden">
							{item.author.name}
						</h2>
					</div>
					<h2 className="hidden text-xl font-medium md:flex">
						{item.author.name}
					</h2>
					<div className="mt-2 flex items-center gap-4 align-middle md:hidden">
						<p>{item.date}</p>
						<p className="text-sm font-semibold text-white/50">
							{item.readTime} min read
						</p>
					</div>
					<p className="hidden md:flex">{item.date}</p>
					<p className="hidden text-sm font-semibold text-white/50 md:flex">
						{item.readTime} min read
					</p>
				</div>
			</div>
		</>
	);
}
