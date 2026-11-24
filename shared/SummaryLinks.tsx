const prompt =
  "Summarise this studio in two sentences. Trumark is a creative and technology partner in Kathmandu. Its areas of expertise are strategy, branding and design, development, and marketing.";
const assistants = [
  {
    name: "Claude",
    url: "https://claude.ai/new?q=",
    icon: "/assets/claude.a3101f3047a1.svg",
  },
  {
    name: "ChatGPT",
    url: "https://chatgpt.com/?q=",
    icon: "/assets/chatgpt.a595df6b4239.svg",
  },
  {
    name: "Perplexity",
    url: "https://www.perplexity.ai/search?q=",
    icon: "/assets/perplexity.c66c64e9e3c2.svg",
  },
  {
    name: "Gemini",
    url: "https://gemini.google.com/app?prompt=",
    icon: "/assets/gemini.8ab0a9bafec1.svg",
  },
];
export function SummaryLinks({ icons = false }: { icons?: boolean }) {
  return (
    <div className="summary-links">
      {assistants.map(({ name, url, icon }) => (
        <a
          key={name}
          href={url + encodeURIComponent(prompt)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={icons ? `Ask ${name} about Trumark` : undefined}
        >
          {icons ? <img loading="lazy" src={icon} alt="" /> : name}
        </a>
      ))}
    </div>
  );
}
