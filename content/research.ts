/**
 * The one paper. Every number here is from the accepted manuscript, so the page
 * can print them without softening: each figure is a before and an after.
 */

export type ResearchFigure = {
  id: string;
  /** What was measured. */
  label: string;
  /** The baseline. */
  from: string;
  /** The result. */
  to: string;
  /** The conditions, spelled out. */
  note: string;
};

export type ResearchStatus = "In review" | "Accepted" | "Published";

export type Research = {
  slug: string;
  title: string;
  /** His position on the paper. */
  authorship: string;
  venue: string;
  venueLong: string;
  location: string;
  /** Human span for the conference. Render this, not `start`. */
  dates: string;
  /** ISO, first and last day of the conference. */
  start: string;
  end: string;
  status: ResearchStatus;
  proceedings: string;
  indexing: readonly string[];
  /** One string per paragraph, his voice. */
  abstract: readonly string[];
  figures: readonly ResearchFigure[];
  stack: readonly string[];
  body: readonly string[];
};

export const research: Research = {
  slug: "adaptive-hybrid-quantum-classical-healthcare",
  title:
    "Adaptive Hybrid Quantum-Classical Framework with Byzantine-Robust Federated Learning and Noise-Aware QAOA for Trustworthy AI-Driven Healthcare",
  authorship: "First author",
  venue: "ICATCICT 2026",
  venueLong:
    "International Conference on Advanced Trends in Computing, Information and Communication Technologies",
  location: "Dubai, UAE",
  dates: "25 to 27 November 2026",
  start: "2026-11-25",
  end: "2026-11-27",
  status: "Accepted",
  proceedings: "AIP Conference Proceedings",
  indexing: ["Scopus", "Web of Science"],
  abstract: [
    "Quantum hardware in 2026 is noisy and the noise moves. Most hybrid quantum-classical work picks a circuit depth once and lives with whatever the machine does to it that day. This paper reads live IBM Eagle calibration before each call and chooses the depth that machine can carry right now.",
    "The second half is federated learning that does not trust the clients training it. A two stage defence, QDS followed by FLTrust, sits between the clients and the aggregate and takes poisoning down to a level where an attacker gets very little for the effort.",
    "There is a third result on genomic selection, and a rule that decides when the quantum path is worth taking at all. When the hardware falls outside the stated envelope, the framework stops pretending and runs classical Tabu search instead.",
  ],
  figures: [
    {
      id: "scheduling-gap",
      label: "Operating room scheduling, optimality gap",
      from: "5.1%",
      to: "0.9%",
      note: "Noise-Adaptive QAOA picking circuit depth per call from live IBM Eagle calibration. Runtime came down from 186s to 142s in the same run.",
    },
    {
      id: "poisoning",
      label: "Poisoning success rate",
      from: "3.8%",
      to: "0.6%",
      note: "QDS and FLTrust as a two stage defence, at 2.1 ms overhead. 8 clients, 2 of them Byzantine, NIH ChestX-ray14 split non-IID.",
    },
    {
      id: "genomic-auroc",
      label: "Genomic selection AUROC, TCGA-BRCA",
      from: "0.884",
      to: "0.901",
      note: "Against an L1 regularised logistic regression baseline, and on 30.4 selected features against the baseline's 47.3.",
    },
  ],
  stack: ["Qiskit 0.46", "PennyLane 0.33", "PyTorch 2.1"],
  body: [
    "The paper has three parts that share one question: what has to be true about the hardware and the participants before a hybrid quantum-classical system can be trusted with a hospital's decisions.",
    "The first part is Noise-Adaptive QAOA. Circuit depth is chosen per call from live IBM Eagle calibration data rather than fixed in advance, because the same depth that is optimal at nine in the morning is noise at four in the afternoon. On operating room scheduling this took the optimality gap from 5.1% to 0.9% and the runtime from 186s to 142s.",
    "The second part is the Hardware Readiness Envelope, which is the rule for when not to run quantum at all. CX error below 1.1e-2 and T1 above 120 microseconds, measured live. Outside that envelope the framework falls back to classical Tabu search rather than returning a result the noise wrote.",
    "The third part is Byzantine-robust federated learning. QDS and FLTrust run as two stages on the same update stream, tested with 8 clients, 2 of them Byzantine, on NIH ChestX-ray14 held non-IID. Poisoning success fell from 3.8% to 0.6% at 2.1 ms of overhead per round.",
    "The genomic selection experiment runs on TCGA-BRCA and reaches AUROC 0.901 with 30.4 features, against an L1 regularised logistic regression baseline at 0.884 with 47.3 features. Fewer features and a better score, which matters when the features are assays somebody has to pay for.",
    "Built on Qiskit 0.46, PennyLane 0.33 and PyTorch 2.1. Accepted at ICATCICT 2026 in Dubai, 25 to 27 November 2026, and due to appear in AIP Conference Proceedings, which is indexed by Scopus and Web of Science.",
  ],
};
