import { Contact } from "@/components/home/Contact";
import { Hero } from "@/components/home/Hero";
import { NowNote } from "@/components/home/NowNote";
import { ResearchObject } from "@/components/home/ResearchObject";
import { WorkCollage } from "@/components/home/WorkCollage";

export default function HomePage() {
  return (
    <div className="mx-auto w-full max-w-desk px-5 sm:px-8">
      <Hero />
      <NowNote />
      <WorkCollage />
      <ResearchObject />
      <Contact />
    </div>
  );
}
