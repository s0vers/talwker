"use client";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function TestComponent({ banners }: any) {
  const plugin = useRef(Autoplay({ delay: 10000, stopOnInteraction: true }));
  const [count, setCount] = useState(0);
  const [current, setCurrent] = useState(0);
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) {
      return;
    }
    setCount(banners?.length);
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api, banners?.length]);

  return (
    <div className="relative w-full">
      <Carousel
        setApi={setApi}
        opts={{ align: "center", loop: true }}
        plugins={[plugin.current]}
      >
        <CarouselContent>
          {banners ? (
            banners.length > 0 &&
            banners.map((item: any, i: number) => (
              <CarouselItem
                key={i}
                className="relative flex w-full cursor-pointer items-center justify-center align-middle"
              >
                <div className="relative">
                  <Image
                    src={item.image}
                    alt="banner Image"
                    width={1800}
                    height={400}
                    className="w-full h-dvh object-cover"
                  />
                  <div className="absolute bottom-8 w-full cursor-default text-white flex align-middle items-center justify-between">
                    <div className="mx-6">
                      <span className="rounded-3xl bg-slate-600/40 px-6 py-2 text-black text-xl font-semibold cursor-pointer">
                        {item.category}
                      </span>
                      <h1 className="text-4xl font-bold my-4">{item.title}</h1>
                      <p className=" max-w-2xl">{item.description}</p>
                    </div>
                    <div className="flex flex-col items-end mx-6">
                      <div className="flex align-middle items-center gap-4">
                        <Avatar>
                          <AvatarImage src={item.author.avatar} />
                          <AvatarFallback>{item.author.name}</AvatarFallback>
                        </Avatar>
                      </div>
                      <h2 className="text-xl font-medium">
                        {item.author.name}
                      </h2>
                      <p>{item.date}</p>
                      <p className="text-sm font-semibold text-white/50">
                        {item.readTime} minutes read
                      </p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))
          ) : (
            <CarouselItem className="relative flex w-full cursor-pointer items-center justify-center align-middle">
              <Image
                src="/loading.gif"
                alt="banner1"
                width={1920}
                height={500}
                loading="lazy"
                className="h-64 w-64 object-contain"
              />
            </CarouselItem>
          )}
        </CarouselContent>
      </Carousel>
      <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 transform justify-center space-x-2">
        {Array.from({ length: count }).map((_, i) => (
          <div
            onClick={() => api?.scrollTo(i)}
            key={i}
            className={`h-3 w-3 rounded-full ${
              current === i + 1 ? "bg-primary" : "bg-yellow-600 dark:bg-white"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}
