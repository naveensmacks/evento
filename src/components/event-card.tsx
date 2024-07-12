"use client";
import { EventoEvent } from "@prisma/client";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";

type EventCardProps = {
  event: EventoEvent;
};

const MotionLink = motion(Link);

export default function EventCard({ event }: EventCardProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.5 1"],
  });
  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.3, 1]);

  const date = new Date(event.date);
  //turn date into day of month with leading zero
  const day = date.toLocaleString("en-US", { day: "2-digit" });
  const month = date
    .toLocaleString("default", { month: "short" })
    .toUpperCase();

  return (
    <MotionLink
      ref={ref}
      href={`/event/${event.slug}`}
      className="flex-1 basis-80 h-[380px] max-w-[500px]"
      //@ts-ignore
      style={{ scale: scaleProgress, opacity: opacityProgress }}
      initial={{ scale: 0.8, opacity: 0 }}
    >
      <section className="h-full w-full relative flex flex-col bg-white/[3%] rounded-xl overflow-hidden state-effects">
        <Image
          src={event.imageUrl}
          alt={event.name}
          width={500}
          height={280}
          className="h-[60%] object-cover"
        />
        <div className="flex flex-col flex-1 justify-center items-center">
          <h2 className="text-2xl font-semibold">{event.name}</h2>
          <p className="italic text-white/75"> By {event.organizerName}</p>
          <p className="text-sm text-white/50 mt-4">{event.location}</p>
        </div>
        <section className="bg-black/30 p-3 absolute top-3 left-3 rounded-md h-[45px] w-[45px] flex flex-col justify-center items-center">
          <p className="text-xl font-bold -mb-[5px]">{day}</p>
          <p className="text-xs text-accent">{month}</p>
        </section>
      </section>
    </MotionLink>
  );
}
