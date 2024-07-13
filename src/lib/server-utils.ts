import "server-only";
import { unstable_cache } from "next/cache";
import { notFound } from "next/navigation";
import prisma from "./db";
import { capilitalize } from "./utils";

export const getEvents = unstable_cache(async (city: string, page = 1) => {
  /* 
  const response = await fetch(
    `https://bytegrad.com/course-assets/projects/evento/api/events?city=${city}`,
    {
      //clear cache every 5 minutes
      next: {
        revalidate: 300,
      },
      //or to opt out of cache use 'cache: "no-store"'
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
});

export const getEvent = unstable_cache(async (slug: string) => {
  const event = await prisma.eventoEvent.findUnique({
    where: { slug: slug },
  });

  if (!event) {
    return notFound();
  }
  return event;
});
