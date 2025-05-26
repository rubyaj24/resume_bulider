import { Geist, Geist_Mono, Red_Hat_Display } from "next/font/google";
import Head from "next/head";
import "../styles/home.css";
import { Router, useRouter } from "next/router";
import { use } from "react";

const redHatDisplay = Red_Hat_Display({
  variable: "--font-red-hat-display",
  subsets: ["latin"],
});

export default function Home() {

  const router = useRouter();

  return (
    <>
      <Head>
        <title>Resume Builder</title>
      </Head>
      <div
        className={`${redHatDisplay.className} min-h-screen flex flex-col justify-between`}
      >
        <main className="grid grid-cols-1 sm:grid-cols-2 justify-center items-center gap-6 flex-grow">
          <div className="flex flex-col items-center">
            <h1 className="text-5xl lg:text-7xl sm:text-3xl font-bold text-center tracking-tight">
              Resume <span className="gradient-text">Builder</span>!
            </h1>
            <div className="flex flex-row space-x-8">
              <span className="text-sm italic text-gray-600 mt-2">
                Create your professional resume in minutes
              </span>
              <span className="text-sm mt-2">v1.0.0</span>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <ol className="list-decimal pl-6">
              <li className="fade-in-1">Choose a template</li>
              <li className="fade-in-2">Fill in your details</li>
              <li className="fade-in-3">Download your resume</li>
            </ol>
            <button 
            onClick={() => router.push("/builder")}
            className="fade-in-4 mt-4 px-6 py-2 border text-white rounded-2xl hover:gradient-button hover:scale-110 transition-all duration-300">
              Get Started
            </button>
          </div>
        </main>
        <footer className="w-full text-center mt-auto py-4">
          <p className="text-sm text-gray-600">
            Made with ❤️ by{" "}
            <a
              href="https://github.com/rurbyaj24"
              target="_blank"
              rel="noopener noreferrer"
            >
              AJ
            </a>
          </p>
        </footer>
      </div>
    </>
  );
}
