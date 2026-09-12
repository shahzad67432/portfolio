import { profile } from "@/content/profile";
import { DeskObject } from "@/components/objects/DeskObject";
import { Highlighter } from "@/components/objects/Highlighter";
import { Handwriting } from "@/components/objects/Handwriting";

export default function HomePage() {
  return (
    <div className="mx-auto w-full max-w-desk px-5 sm:px-8">
      <section className="relative min-h-[70vh] pb-24 pt-10 sm:pt-16">
        <div className="relative z-10 mx-auto max-w-[760px] text-center">
          <h1 className="font-display text-[2.25rem] leading-[1.15] text-ink sm:text-display md:text-hero">
            {profile.statement.before}
            <Highlighter>{profile.statement.marked}</Highlighter>
            {profile.statement.after}
          </h1>
          <p className="mx-auto mt-6 max-w-[36ch] text-small text-ink-meta sm:text-body">
            Based in {profile.location}. {profile.study}.
          </p>
        </div>

        <DeskObject
          id="hero-note"
          order={1}
          className="mx-auto mt-16 w-full max-w-[520px]"
        >
          <div className="shadow-rest rounded-sm bg-[#FBFAF6] p-6 sm:p-8">
            <p className="font-display text-title text-ink">
              What I am building right now
            </p>
            <ul className="mt-4 space-y-3">
              {[
                "Cetus, a multi-provider AI media platform, live in production",
                "A paper on noise-adaptive QAOA, presenting in Dubai in November",
                "This site, rebuilt from an empty repo",
              ].map((line, i) => (
                <li key={line} className="flex gap-3">
                  <span className="font-hand text-lg text-ink-meta">
                    {i + 1}.
                  </span>
                  <Handwriting id={`todo-${i}`} className="leading-snug">
                    {line}
                  </Handwriting>
                </li>
              ))}
            </ul>
          </div>
        </DeskObject>
      </section>
    </div>
  );
}
