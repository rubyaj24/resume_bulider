import { Red_Hat_Display } from "next/font/google";
import Head from "next/head";
import "../styles/home.css";
import { Router, useRouter } from "next/router";
import WelcomeLogo from "@/components/WelcomeLogo";

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
          <WelcomeLogo />

          <div className="flex flex-col items-center">
            <ol className="list-decimal pl-6">
              <li className="fade-in-1">Choose a template</li>
              <li className="fade-in-2">Fill in your details</li>
              <li className="fade-in-3">Download your resume</li>
            </ol>
            <button 
            onClick={() => router.push("/resume")}
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
