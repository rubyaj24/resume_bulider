import { useRouter } from 'next/router';
import React from 'react';
import Head from 'next/head';
import { Red_Hat_Display } from 'next/font/google';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import confetti from 'canvas-confetti';

const redHatDisplay = Red_Hat_Display({ subsets: ['latin'] });

export default function PreviewPage() {
  const router = useRouter();
  const {
    fullName,
    email,
    phone,
    city,
    state,
    country,
    summary,
    experience,
    education,
    skills,
    languages,
    hobbies,
  } = router.query;

  // Deserialize complex objects
  const parsedExperience = experience ? JSON.parse(experience) : [];
  const parsedEducation = education ? JSON.parse(education) : [];
  const parsedLanguages = languages ? JSON.parse(languages) : [];

  const [buttonText, setButtonText] = React.useState('Download as PDF');

  const handleDownloadPDF = () => {
    // PDF download functionality will be implemented here
    setButtonText('Hold up, let me sleep for a while... 😴');

    setTimeout(() => {
        setButtonText('Download as PDF');
    }, 3000);

    handleConfetti();
  };

  const handleGoBack = () => {
    router.back();
  };

  const handleConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.8 },
      colors: ['#ff0', '#f00', '#0f0', '#00f'],
    });
  };

  return (
    <>
      <Head>
        <title>Preview - Resume Builder</title>
      </Head>
      <div className={`${redHatDisplay.className} min-h-screen bg-gray-900 text-white flex flex-col`}>
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="container mx-auto px-6 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Resume Container */}
            <div id="resume-content" className="bg-white text-gray-900 shadow-2xl rounded-lg overflow-hidden">
              {/* Header Section */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8">
                <h1 className="text-4xl font-bold mb-2">{fullName || 'Your Name'}</h1>
                <div className="flex flex-wrap gap-4 text-sm">
                  <span>📧 {email}</span>
                  <span>📱 {phone}</span>
                  <span>📍 {city && state && country ? `${city}, ${state}, ${country}` : 'Location'}</span>
                </div>
              </div>

              {/* Summary Section */}
              {summary && (
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-800 mb-3">Professional Summary</h2>
                  <p className="text-gray-700 leading-relaxed">{summary}</p>
                </div>
              )}

              {/* Experience Section */}
              {experience && parsedExperience.length > 0 && (
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Experience</h2>
                  <div className="space-y-4">
                    {parsedExperience.map((exp, index) => (
                      <div key={index} className="border-l-4 border-blue-500 pl-4">
                        <h3 className="text-xl font-semibold text-gray-800">{exp.jobTitle}</h3>
                        <p className="text-lg text-blue-600 font-medium">{exp.companyName}</p>
                        <div className="flex justify-between text-sm text-gray-600 mb-2">
                          <span>{exp.location}</span>
                          <span>{exp.duration}</span>
                        </div>
                        {exp.responsibilities && (
                          <p className="text-gray-700 leading-relaxed">{exp.responsibilities}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Education Section */}
              {education && parsedEducation.length > 0 && (
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Education</h2>
                  <div className="space-y-3">
                    {parsedEducation.map((edu, index) => (
                      <div key={index} className="border-l-4 border-green-500 pl-4">
                        <h3 className="text-xl font-semibold text-gray-800">{edu.degree}</h3>
                        <p className="text-lg text-green-600 font-medium">{edu.institution}</p>
                        <p className="text-sm text-gray-600">{edu.graduationYear}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Skills Section */}
              {skills && (
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-800 mb-3">Skills</h2>
                  <div className="flex flex-wrap gap-2">
                    {skills.split(',').map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                      >
                        {skill.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Languages Section */}
              {languages && parsedLanguages.length > 0 && (
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Languages</h2>
                  <div className="grid grid-cols-2 gap-3">
                    {parsedLanguages.map((lang, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="font-medium text-gray-800">{lang.language}</span>
                        <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                          {lang.proficiency}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Hobbies Section */}
              {hobbies && (
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-3">Hobbies & Interests</h2>
                  <p className="text-gray-700 leading-relaxed">{hobbies}</p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4 mt-8">
              <button
                onClick={handleGoBack}
                className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors"
              >
                ← Edit Resume
              </button>
              <button
                onClick={handleDownloadPDF}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {buttonText}
              </button>
            </div>
          </div>
        </main>

        {/* Footer */}
        <Footer/>
      </div>
    </>
  );
}