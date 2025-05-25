import Image from "next/image";
import { Geist, Geist_Mono, Red_Hat_Display } from "next/font/google";
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const redHatDisplay = Red_Hat_Display({
  variable: "--font-red-hat-display",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <>
      <Head>
        <title>Resume Builder</title>
        <style
          dangerouslySetInnerHTML={{
            __html: `
          .gradient-text {
            background-image: linear-gradient(-90deg, #007cf0, #00dfd8, #ff0080, #007cf0);
            background-size: 400% 100%;
            -webkit-background-clip: text;
            -moz-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            text-fill-color: transparent;
            animation: gradientAnimation 8s ease-in-out infinite;
          }
          
          @keyframes gradientAnimation {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
        `,
          }}
        />
      </Head>
      <div
        className={`${geistSans.className} ${geistMono.className} ${redHatDisplay.className} flex flex-col min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
      >
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-center sm:text-left">
            Resume <span className="gradient-text">Builder</span>!
          </h1>
          <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
            <li className="tracking-[-.01em]">Choose a template.</li>
            <li className="mb-2 tracking-[-.01em]">
              Get started by editing{" "}
              <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold">
                /resume
              </code>
              .
            </li>
          </ol>
          <div className="flex gap-4 items-center flex-col sm:flex-row">
            <a
              className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
              href="./resume"
            >
              Fill the details
            </a>
          </div>
        </main>
        <footer className="py-4 border-t">
          <div className="container mx-auto text-center text-sm text-gray-600">
            &copy; {new Date().getUTCFullYear()} Resume Builder. All rights
            reserved.
          </div>
        </footer>
      </div>
    </>
  );
}
