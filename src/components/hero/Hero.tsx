import { BackgroundLines } from "@/components/ui/background-lines";
import { Spotlight } from "../ui/Spotlight";
import { FlipWords } from "../ui/flip-words";
import { SocialLinks } from "../shared/SocialLink";

export function Hero() {
  const words = [
    "Aspiring Software Engineer",
    "Full stack developer",
    "Problem Solver",
    "Gen AI Enthusiast",
  ];

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <BackgroundLines className="flex flex-col items-center justify-center w-full px-4 md:-mt-32">
        <div className="w-full h-full flex flex-col items-center justify-center relative">
          <Spotlight
            className="-top-40 left-0 md:-top-20 md:left-60 z-50"
            fill="white"
          />

          <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-8xl font-sans py-2 md:py-10 z-20 font-bold tracking-tight">
            Where Code, <br /> Meets Efficiency.
          </h2>

          <p className="text-center text-lg md:text-3xl mb-4 font-semibold font-mono">
            <FlipWords words={words} />
          </p>

          <p className="max-w-xl mx-auto text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center">
            Full-stack developer specializing in API optimization, real-time
            systems, and seamless deployment for impactful digital solutions.
          </p>

          <div className="flex justify-center gap-6 w-full mt-10">
            <button className="group relative overflow-hidden bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300 hover:scale-105 hover:-translate-y-1 min-w-[180px]">
              <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <div className="relative flex items-center gap-3">
                <svg
                  className="w-5 h-5 transition duration-300 group-hover:scale-110 group-hover:rotate-12"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <span className="font-semibold text-base">Download Resume</span>
                <svg
                  className="w-4 h-4 transition duration-300 transform translate-x-0 group-hover:translate-x-1 opacity-0 group-hover:opacity-100"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </button>

            <button className="group relative overflow-hidden bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300 hover:scale-105 hover:-translate-y-1 border border-gray-700 hover:border-gray-600 min-w-[180px]">
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center gap-3">
                <svg
                  className="w-5 h-5 transition duration-300 group-hover:scale-110"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                <span className="font-semibold text-base">Check My Work</span>
                <svg
                  className="w-4 h-4 transition duration-300 transform translate-x-0 group-hover:translate-x-1 opacity-0 group-hover:opacity-100"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
              <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-blue-500/0 group-hover:border-blue-500/50 transition-colors duration-500 rounded-tr-lg"></div>
            </button>
          </div>

          <div className="md:mt-32">
            <SocialLinks />
          </div>
        </div>
      </BackgroundLines>
    </div>
  );
}
