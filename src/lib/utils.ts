import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import prisma from "./db";
import { notFound } from "next/navigation";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function capilitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export async function getEvents(city: string, page = 1) {
  /* 
  const response = await fetch(
    `https://bytegrad.com/course-assets/projects/evento/api/events?city=${city}`,
    {
      //clear cache every 5 minutes
      next: {
        revalidate: 300,
      },
    }
  );
  const events: EventoEvent[] = await response.json();
  */
  const events = await prisma.eventoEvent.findMany({
    //where: { city: {equals: city , mode: "insensitive"} }, mode doesnt work in sqlLite
    where: {
      city: city === "all" ? undefined : capilitalize(city),
    },
    //sort by date asc
    orderBy: { date: "asc" },
    //pagination of 6 events
    skip: (page - 1) * 6,
    take: 6,
  });

  const totalCount = await prisma.eventoEvent.count({
    where: {
      city: city === "all" ? undefined : capilitalize(city),
    },
  });
  return [events, totalCount] as const;
}

export async function getEvent(slug: string) {
  const event = await prisma.eventoEvent.findUnique({
    where: { slug: slug },
  });

  if (!event) {
    return notFound();
  }
  return event;
}
