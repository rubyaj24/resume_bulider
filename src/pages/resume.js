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

export default function ResumePage() {
return (
    <>
        <Head>
            <title>Resume Builder</title>
            <style jsx global>{`
                .gradient-animation {
                    background: linear-gradient(-90deg, #007cf0, #00dfd8, #ff0080, #007cf0);
                    background-size: 400% 100%;
                    -webkit-background-clip: text;
                    background-clip: text;
                    color: transparent;
                    animation: backgroundAnim 8s ease-in-out infinite;
                }
                
                @keyframes backgroundAnim {
                    50% {
                        background-position: 140% 50%;
                    }
                }
            `}</style>
        </Head>
        <div
            className={`${geistSans.className} ${geistMono.className} ${redHatDisplay.className} grid grid-rows-[auto_1fr_auto] min-h-screen p-8 font-[family-name:var(--font-geist-sans)]`}
        >
            <header className="py-4 border-b">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                        Resume <span className="gradient-animation">Builder</span>
                    </h1>
                    <a href="./">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Back to home</button>
                    </a>
                </div>
            </header>
            
            <main className="container mx-auto py-8">
                <div className="bg-gray-900 shadow-lg rounded-lg p-6 mb-8">
                    <h2 className="text-2xl font-bold mb-4">Personal Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Full Name
                            </label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                placeholder="John Doe"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                placeholder="john@example.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Phone
                            </label>
                            <input
                                type="tel"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                placeholder="+1 (555) 123-4567"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Location
                            </label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                placeholder="New York, NY"
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-gray-900 shadow-lg rounded-lg p-6">
                    <h2 className="text-2xl font-bold mb-4">Professional Summary</h2>
                    <textarea
                        className="w-full px-3 py-2 border border-gray-300 rounded-md h-32"
                        placeholder="Write a brief summary of your professional background and skills..."
                    ></textarea>
                </div>

                <div className="bg-gray-900 shadow-lg rounded-lg p-6 my-8">
                    <h2 className="text-2xl font-bold mb-4">Experience</h2>
                    <div className="flex items-center mb-4">
                            <label className="flex items-center cursor-pointer">
                                    <input
                                            type="checkbox"
                                            className="form-checkbox h-5 w-5 text-blue-600"
                                            // You can manage this state with useState if needed
                                    />
                                    <span className="ml-2 text-gray-200">Include Experience Section</span>
                            </label>
                    </div>
                    <div>
                            {/* Example experience entry, you can map over experience array here */}
                            <div className="mb-4">
                                    <input
                                            type="text"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2"
                                            placeholder="Job Title"
                                    />
                                    <input
                                            type="text"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2"
                                            placeholder="Company Name"
                                    />
                                    <input
                                            type="text"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2"
                                            placeholder="Location"
                                    />
                                    <input
                                            type="text"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2"
                                            placeholder="Duration"
                                    />
                                    <textarea
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                            placeholder="Describe your responsibilities and achievements..."
                                    ></textarea>
                            </div>
                            <button
                                    type="button"
                                    className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                                    // Add onClick handler to add new experience entry
                            >
                                    + Add Experience
                            </button>
                    </div>
                </div>
            </main>
            
            <footer className="py-4 border-t">
                <div className="container mx-auto text-center text-sm text-gray-600">
                    &copy; {new Date().getFullYear()} Resume Builder. All rights reserved.
                </div>
            </footer>
        </div>
    </>
);
}