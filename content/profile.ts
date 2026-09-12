export const profile = {
  name: "Muhammad Shahzad Ali",
  short: "Shahzad",
  role: "Full stack applied AI engineer",
  location: "Lahore, Pakistan",
  study: "BS Artificial Intelligence, UMT, class of 2027",
  email: "shahzad.exec@gmail.com",
  statement: {
    before: "I build ",
    marked: "products",
    after: " with agents, and write down what breaks.",
  },
  blurb:
    "Final year AI undergraduate in Lahore. I ship full stack products end to end, most of them with Claude Code sitting inside the repo, and I publish the parts that went wrong.",
  links: {
    github: "https://github.com/shahzad67432",
    twitter: "https://x.com/shahzadexec",
    linkedin:
      "https://www.linkedin.com/in/muhammad-shahzad-ali-225893298/",
  },
} as const;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
] as const;
