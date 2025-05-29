import { useRouter } from 'next/router';
import { useState } from 'react';
import Head from 'next/head';
import { Red_Hat_Display } from 'next/font/google';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import confetti from 'canvas-confetti';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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

  const [buttonText, setButtonText] = useState('Download as PDF');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleDownloadPDF = async () => {
    setIsGenerating(true);
    setButtonText('Generating PDF... ');

    try {
      // Get the resume container
      const resumeElement = document.getElementById('resume-content');
      
      if (!resumeElement) {
        throw new Error('Resume content not found');
      }

      // Configure html2canvas options for better quality
      const canvas = await html2canvas(resumeElement, {
        scale: 2, // Higher resolution
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: resumeElement.scrollWidth,
        height: resumeElement.scrollHeight,
      });

      // Create PDF
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      // Calculate dimensions to fit A4 - Nokki vecho
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 295; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      // Add the resume content
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Add new pages if content exceeds one page
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Add certificate page
      // addCertificatePage(pdf, fullName || 'Candidate');

      // Save the PDF
      const fileName = `${fullName || 'Resume'}_Resume.pdf`;
      pdf.save(fileName);

      setButtonText('Download Complete!');
      setIsSuccess(true);
      handleConfetti();

      setTimeout(() => {
        setButtonText('Download as PDF');
        setIsSuccess(false);
      }, 3000);

    } catch (error) {
      console.error('Error generating PDF:', error);
      setButtonText('Error generating PDF ❌');
      setIsSuccess(false);
      
      setTimeout(() => {
        setButtonText('Download as PDF');
      }, 3000);
    } finally {
      setIsGenerating(false);
    }
  };


  // Documented from documentation, but not used in this version
  // const addCertificatePage = (pdf, candidateName) => {
  //   pdf.addPage();
    
  //   // Certificate background
  //   pdf.setFillColor(248, 249, 250); // Light gray background
  //   pdf.rect(0, 0, 210, 297, 'F');
    
  //   // Certificate border
  //   pdf.setDrawColor(59, 130, 246); // Blue border
  //   pdf.setLineWidth(2);
  //   pdf.rect(10, 10, 190, 277);
    
  //   // Inner border
  //   pdf.setLineWidth(0.5);
  //   pdf.rect(15, 15, 180, 267);
    
  //   // Certificate title
  //   pdf.setFontSize(28);
  //   pdf.setTextColor(59, 130, 246);
  //   pdf.setFont('helvetica', 'bold');
  //   pdf.text('CERTIFICATE OF COMPLETION', 105, 50, { align: 'center' });
    
  //   // Subtitle
  //   pdf.setFontSize(16);
  //   pdf.setTextColor(100, 100, 100);
  //   pdf.setFont('helvetica', 'normal');
  //   pdf.text('Resume Building Program', 105, 70, { align: 'center' });
    
  //   // Main text
  //   pdf.setFontSize(14);
  //   pdf.setTextColor(50, 50, 50);
  //   pdf.text('This certifies that', 105, 100, { align: 'center' });
    
  //   // Candidate name
  //   pdf.setFontSize(24);
  //   pdf.setTextColor(59, 130, 246);
  //   pdf.setFont('helvetica', 'bold');
  //   pdf.text(candidateName, 105, 120, { align: 'center' });
    
  //   // Achievement text
  //   pdf.setFontSize(14);
  //   pdf.setTextColor(50, 50, 50);
  //   pdf.setFont('helvetica', 'normal');
  //   pdf.text('has successfully completed the resume building process', 105, 140, { align: 'center' });
  //   pdf.text('and demonstrated proficiency in professional resume creation', 105, 155, { align: 'center' });
    
  //   // Date
  //   const currentDate = new Date().toLocaleDateString('en-US', {
  //     year: 'numeric',
  //     month: 'long',
  //     day: 'numeric'
  //   });
  //   pdf.setFontSize(12);
  //   pdf.text(`Date: ${currentDate}`, 105, 180, { align: 'center' });
    
  //   // Signature line
  //   pdf.setLineWidth(0.5);
  //   pdf.setDrawColor(100, 100, 100);
  //   pdf.line(60, 220, 150, 220);
    
  //   // Signature label
  //   pdf.setFontSize(10);
  //   pdf.setTextColor(100, 100, 100);
  //   pdf.text('Resume Builder Platform', 105, 230, { align: 'center' });
    
  //   // Decorative elements
  //   drawStar(pdf, 30, 40);
  //   drawStar(pdf, 180, 40);
  //   drawStar(pdf, 30, 250);
  //   drawStar(pdf, 180, 250);
  // };

  // const drawStar = (pdf, x, y) => {
  //   pdf.setFillColor(255, 215, 0); // Gold color
  //   pdf.setDrawColor(255, 215, 0);
    
  //   const size = 3;
  //   const points = [];
    
  //   for (let i = 0; i < 10; i++) {
  //     const angle = (i * Math.PI) / 5;
  //     const radius = i % 2 === 0 ? size : size / 2;
  //     points.push([
  //       x + radius * Math.cos(angle),
  //       y + radius * Math.sin(angle)
  //     ]);
  //   }
    
  //   // Draw the star using lines instead of polygon
  //   const startPoint = points[0];
  //   pdf.circle(x, y, size, 'F');
    
  //   // Alternative approach: draw a circle as a simple decoration
  //   pdf.setFillColor(255, 215, 0);
  //   pdf.circle(x, y, 1.5, 'F');
  //   pdf.setDrawColor(255, 165, 0);
  //   pdf.circle(x, y, 3, 'S');
  // };

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
              <div className="bg-gray-700 text-white p-8">
                <h1 className="text-5xl font-bold mb-4">{fullName ? fullName : 'Your Name'}</h1>
                <div className="flex flex-col gap-2 text-sm">
                  <span>Email: {email}</span>
                  <span>Phone: {phone}</span>
                  <span>Location: {city && state && country ? `${city}, ${state}, ${country}` : 'Location'}</span>
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
                disabled={isGenerating}
              >
                ← Edit Resume
              </button>
              <button
                onClick={handleDownloadPDF}
                className={`px-6 py-3 rounded-lg transition-colors ${
                  isGenerating 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700'
                } text-white ${isSuccess ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}`}
                disabled={isGenerating}
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