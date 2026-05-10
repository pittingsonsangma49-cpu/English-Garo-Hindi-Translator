export default function About() {
  return (
    <div className="fade-page min-h-screen py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.3em] text-[#2E75B6]">About the project</p>
            <h1 className="text-4xl font-semibold text-[#1A1A2E]">Preserving Garo through modern language learning.</h1>
            <p className="text-lg text-[#555555]">Garo is spoken by approximately one million A·chik people primarily in Meghalaya and Assam, Northeast India. This tool is designed to support learners and speakers with a clear translator, searchable dictionary, and grammar guide.</p>
          </div>

          <div className="grid gap-6 rounded-[12px] border border-slate-200 bg-white p-8 shadow-[0_2px_12px_rgba(0,0,0,0.07)]">
            <div>
              <h2 className="text-2xl font-semibold text-[#1A1A2E]">Garo language</h2>
              <p className="mt-3 text-base leading-7 text-[#555555]">Garo is an Austroasiatic language historically spoken by the A·chik people. Its grammar uses subject-object-verb order and rich verbal suffixes.</p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-[#1A1A2E]">Cultural context</h2>
              <p className="mt-3 text-base leading-7 text-[#555555]">The A·chik community follows a matrilineal clan system called Mahari. This tool aims to support the preservation of their language while making it accessible to new learners.</p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-[#1A1A2E]">Project mission</h2>
              <p className="mt-3 text-base leading-7 text-[#555555]">Built to teach and preserve the Garo language, the site offers a modern, responsive learning environment with vocabulary, phrase reference, and grammar systems in one place.</p>
            </div>
          </div>

          <div className="rounded-[12px] border border-[#2E75B6] bg-[#E8F0FF] p-8">
            <h2 className="text-2xl font-semibold text-[#1A1A2E]">Credits</h2>
            <ul className="mt-4 space-y-3 text-[#555555]">
              <li>Design and UI: Garo Translator team</li>
              <li>Language data: A·chik community and project contributors</li>
              <li>Built with React, Vite, and local Garo dictionary data</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
