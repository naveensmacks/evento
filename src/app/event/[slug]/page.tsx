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
      <section className="relative overflow-hidden flex items-center justify-center py-8 lg:py-14">
        <Image
          className="object-cover z-0 blur-3xl"
          src={event.imageUrl}
          alt={event.name}
          fill
          quality={50}
          sizes="(max-width: 1280px) 100vw, 1280px"
          priority
        />
        <div className="relative z-1 flex flex-col gap-6 lg:gap-16 lg:flex-row">
          <Image
            className="rounded-xl border-2 border-white/50 w-full lg:w-[300px]"
            src={event.imageUrl}
            alt={event.name}
            width={300}
            height={201}
          />
          <div className="flex flex-col">
            <p className="text-white/75 text-xl">
              {/*display date in day name comma name of the Month and 
                  then day number of month for eg: Friday, July 12*/}
              {new Date(event.date).toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </p>
            <H1 className="mb-2 mt-1 whitespace-nowrap lg:text-5xl">
              {event.name}
            </H1>
            <p className="text-white/75 text-xl whitespace-nowrap">
              Organized by <span className="italic">{event.organizerName}</span>
            </p>

            <button className="bg-white/20 text-lg capitalize bg-blur rounded-md mt-5 lg:mt-auto sm:w-full py-2 border-white/10  border-2 state-effects">
              Get Tickets
            </button>
          </div>
        </div>
      </section>
      <div className="min-h-[75vh] text-center px-5 py-16">
        <Section>
          <Sectionheading>About this event</Sectionheading>
          <SectionContent>{event.description}</SectionContent>
        </Section>
        <Section>
          <Sectionheading>Location</Sectionheading>
          <SectionContent>{event.location}</SectionContent>
        </Section>
      </div>
    </main>
  );
}

function Section({ children }: { children: React.ReactNode }) {
  return <section className="mb-12">{children}</section>;
}
function Sectionheading({ children }: { children: React.ReactNode }) {
  return <h3 className="text-2xl mb-8">{children}</h3>;
}

function SectionContent({ children }: { children: React.ReactNode }) {
  return (
    <p className="max-w-4xl mx-auto text-lg leading-8 text-white/75">
      {children}
    </p>
  );
}
