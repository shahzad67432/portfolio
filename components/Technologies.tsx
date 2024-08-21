import { technologies } from "@/data"

export const Tech = ()=>{
    return technologies.map((n) => (
        <div className="m-2 inline-flex">
            <button className="relative inline-flex h-12 w-[50%] md:w-44 md:mt-10  overflow-hidden rounded-lg p-[1px] focus:outline-none">
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                {/* remove px-3 py-1, add px-5 gap-2 */}
                <span
                className={`inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg
                    bg-slate-950 px-4 text-sm font-medium text-white backdrop-blur-3xl gap-2`}
                >
                {n.name}
                </span>
            </button>
        </div>
    ));
}