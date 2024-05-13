import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Image from 'next/image'
import React from 'react'


export default function CarouselContent({item}: {item: Banner}) {
  return (
   <>
   
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
   </>
  )
}
