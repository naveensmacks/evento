import H1 from "@/components/h1";
import { EventoEvent } from "@/lib/types";
import Image from "next/image";

type EventPageProps = {
  params: {
    slug: string;
  };
};
export default async function EventPage({ params }: EventPageProps) {
  const slug = params.slug;
  const response = await fetch(
    `https://bytegrad.com/course-assets/projects/evento/api/events/${slug}`
  );
  const event: EventoEvent = await response.json();
  return (
    <main>
      <section className="relative h-[361px] overflow-hidden flex items-center justify-center">
        <Image
          className="object-cover z-0 blur-3xl"
          src={event.imageUrl}
          alt={event.name}
          fill
          quality={50}
          sizes="(max-width: 1280px) 100vw, 1280px"
          priority
        />
        <div className="absolute top-16 z-1 flex gap-x-6 ">
          <Image
            className="rounded-md border border-white/50"
            src={event.imageUrl}
            alt={event.name}
            width={300}
            height={201}
          />
          <div className="flex flex-col justify-between relative">
            {/*display date in day name comma name of the Month and then day number of month 
             for eg: Friday, July 12*/}
            <div className="flex flex-col">
              <p className="text-white/50 text-sm">
                {new Date(event.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <H1 className="mb-1 text-2xl lg:text-5xl">{event.name}</H1>
              <p className="text-white/50 text-sm">
                Organized by{" "}
                <span className="italic">{event.organizerName}</span>
              </p>
            </div>

            <button className="bg-white/20 text-white rounded-md px-5 py-2 w-full">
              Get Tickets
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
