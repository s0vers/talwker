"use client";
import Image from "next/image";
import React, { Suspense, useEffect, useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "../ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const HeroSection: React.FC<BannerProps>  = (({ banners }) => {
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

    const handleSelect = () => {
      setCurrent(api.selectedScrollSnap() + 1);
    };

    api.on("select", handleSelect);

    return () => {
      api.off("select", handleSelect);
    };
  }, [api, banners?.length]);

  return (
    <div className="relative">
      <Carousel
        setApi={setApi}
        opts={{ align: "center", loop: true }}
        plugins={[plugin.current]}
      >
        <CarouselContent>
          {banners &&
            banners.length > 0 &&
            banners.map((item, index) => (
              <CarouselItem key={index} className="relative">
       
                <Image
                  src={item.image}
                  alt="plane Image"
                  width={1800}
                  height={400}
                  className="w-full h-dvh object-cover"
                  placeholder="blur"
                  blurDataURL="/image.jpg"
                  priority
                />
        
                <div className="absolute bottom-14 w-full cursor-default text-white flex flex-col md:flex-row px-7 align-middle md:items-center justify-between">
                  <div>
                    <span className="rounded-3xl bg-slate-600/40 px-6 py-2 text-xl font-semibold cursor-pointer text-[#2a9d8f]">
                      {item.category}
                    </span>
                    <h1 className="text-4xl font-bold my-4">{item.title}</h1>
                    <p className=" max-w-2xl">{item.description}</p>
                  </div>
                  <div className="flex flex-col md:items-end pt-4 md:pt-0">
                    <div className="flex align-middle items-center gap-4">
                      <Avatar>
                        <AvatarImage src={item.author.avatar} />
                        <AvatarFallback>{item.author.name}</AvatarFallback>
                      </Avatar>
                      <h2 className="text-xl font-medium md:hidden">
                        {item.author.name}
                      </h2>
                    </div>
                    <h2 className="text-xl font-medium hidden md:flex">
                      {item.author.name}
                    </h2>
                    <div className="md:hidden flex items-center align-middle gap-4 mt-2">
                      <p>{item.date}</p>
                      <p className="text-sm font-semibold text-white/50">
                        {item.readTime} min read
                      </p>
                    </div>
                    <p className="hidden md:flex">{item.date}</p>
                    <p className="text-sm font-semibold text-white/50 hidden md:flex">
                      {item.readTime} min read
                    </p>
                  </div>
                </div>
              </CarouselItem>
            ))}
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
          />
        ))}
      </div>
    </div>
  );
});


export default HeroSection;
