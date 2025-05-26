import { useState, useRef } from "react";
import { Geist, Geist_Mono, Red_Hat_Display } from "next/font/google";
import Head from "next/head";
import { useRouter } from "next/router";
import "../styles/builder.css";
import "../styles/home.css";

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

// Template components
const MinimalistTemplate = ({ data }) => {
  return (
    <div className="bg-white p-6 shadow-lg h-full">
      <div className="border-b-2 border-gray-800 pb-4 mb-4">
        <h1 className="text-3xl font-bold">{data.personalInfo.name || "Your Name"}</h1>
        <div className="flex flex-wrap gap-2 text-sm mt-2">
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>• {data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>• {data.personalInfo.location}</span>}
        </div>
      </div>
      
      {data.sections.experience.show && (
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2">Experience</h2>
          {data.experience.map((exp, i) => (
            <div key={i} className="mb-3">
              <div className="flex justify-between">
                <span className="font-semibold">{exp.position}</span>
                <span className="text-sm">{exp.period}</span>
              </div>
              <div className="text-sm">{exp.company}</div>
              <p className="text-sm mt-1">{exp.description}</p>
            </div>
          ))}
        </div>
      )}
      
      {data.sections.education.show && (
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2">Education</h2>
          {data.education.map((edu, i) => (
            <div key={i} className="mb-3">
              <div className="flex justify-between">
                <span className="font-semibold">{edu.degree}</span>
                <span className="text-sm">{edu.period}</span>
              </div>
              <div className="text-sm">{edu.institution}</div>
              <p className="text-sm mt-1">{edu.description}</p>
            </div>
          ))}
        </div>
      )}
      
      {data.sections.skills.show && (
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, i) => (
              <span key={i} className="bg-gray-100 px-2 py-1 rounded text-sm">{skill}</span>
            ))}
          </div>
        </div>
      )}
      
      {data.sections.languages.show && (
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2">Languages</h2>
          <div className="flex flex-wrap gap-2">
            {data.languages.map((lang, i) => (
              <span key={i} className="bg-gray-100 px-2 py-1 rounded text-sm">{lang.language} ({lang.proficiency})</span>
            ))}
          </div>
        </div>
      )}
      
      {data.sections.hobbies.show && (
        <div>
          <h2 className="text-xl font-bold mb-2">Hobbies</h2>
          <p className="text-sm">{data.hobbies.join(", ")}</p>
        </div>
      )}
    </div>
  );
};

const ModernTemplate = ({ data }) => {
  return (
    <div className="bg-white shadow-lg h-full flex">
      <div className="w-2/6 bg-blue-600 text-white p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">{data.personalInfo.name || "Your Name"}</h1>
          <p className="text-sm mt-1">{data.personalInfo.title || "Professional Title"}</p>
        </div>
        
        <div className="mb-6">
          <h2 className="text-xl font-bold border-b pb-1 mb-2">Contact</h2>
          <div className="text-sm space-y-1">
            {data.personalInfo.email && <div>{data.personalInfo.email}</div>}
            {data.personalInfo.phone && <div>{data.personalInfo.phone}</div>}
            {data.personalInfo.location && <div>{data.personalInfo.location}</div>}
          </div>
        </div>
        
        {data.sections.skills.show && (
          <div className="mb-6">
            <h2 className="text-xl font-bold border-b pb-1 mb-2">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, i) => (
                <span key={i} className="bg-blue-700 px-2 py-1 rounded text-xs">{skill}</span>
              ))}
            </div>
          </div>
        )}
        
        {data.sections.languages.show && (
          <div className="mb-6">
            <h2 className="text-xl font-bold border-b pb-1 mb-2">Languages</h2>
            <div className="space-y-1">
              {data.languages.map((lang, i) => (
                <div key={i} className="text-sm">{lang.language} - {lang.proficiency}</div>
              ))}
            </div>
          </div>
        )}
        
        {data.sections.hobbies.show && (
          <div>
            <h2 className="text-xl font-bold border-b pb-1 mb-2">Hobbies</h2>
            <p className="text-sm">{data.hobbies.join(", ")}</p>
          </div>
        )}
      </div>
      
      <div className="w-4/6 p-6">
        {data.personalInfo.summary && (
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-2">Profile</h2>
            <p className="text-sm">{data.personalInfo.summary}</p>
          </div>
        )}
        
        {data.sections.experience.show && (
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-2">Experience</h2>
            {data.experience.map((exp, i) => (
              <div key={i} className="mb-3">
                <div className="flex justify-between">
                  <span className="font-semibold">{exp.position}</span>
                  <span className="text-sm">{exp.period}</span>
                </div>
                <div className="text-sm">{exp.company}</div>
                <p className="text-sm mt-1">{exp.description}</p>
              </div>
            ))}
          </div>
        )}
        
        {data.sections.education.show && (
          <div>
            <h2 className="text-xl font-bold mb-2">Education</h2>
            {data.education.map((edu, i) => (
              <div key={i} className="mb-3">
                <div className="flex justify-between">
                  <span className="font-semibold">{edu.degree}</span>
                  <span className="text-sm">{edu.period}</span>
                </div>
                <div className="text-sm">{edu.institution}</div>
                <p className="text-sm mt-1">{edu.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const CreativeTemplate = ({ data }) => {
  return (
    <div className="bg-white shadow-lg h-full">
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white">
        <h1 className="text-3xl font-bold">{data.personalInfo.name || "Your Name"}</h1>
        <p className="text-xl mt-1">{data.personalInfo.title || "Professional Title"}</p>
        <div className="flex flex-wrap gap-4 mt-3 text-sm">
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
        </div>
      </div>
      
      <div className="grid grid-cols-12 gap-4 p-6">
        <div className="col-span-8">
          {data.personalInfo.summary && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-purple-600 mb-2">About Me</h2>
              <p className="text-sm">{data.personalInfo.summary}</p>
            </div>
          )}
          
          {data.sections.experience.show && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-purple-600 mb-2">Experience</h2>
              {data.experience.map((exp, i) => (
                <div key={i} className="mb-4 border-l-4 border-pink-500 pl-4">
                  <div className="flex justify-between">
                    <span className="font-semibold">{exp.position}</span>
                    <span className="text-sm">{exp.period}</span>
                  </div>
                  <div className="text-sm text-purple-600">{exp.company}</div>
                  <p className="text-sm mt-1">{exp.description}</p>
                </div>
              ))}
            </div>
          )}
          
          {data.sections.education.show && (
            <div>
              <h2 className="text-xl font-bold text-purple-600 mb-2">Education</h2>
              {data.education.map((edu, i) => (
                <div key={i} className="mb-4 border-l-4 border-pink-500 pl-4">
                  <div className="flex justify-between">
                    <span className="font-semibold">{edu.degree}</span>
                    <span className="text-sm">{edu.period}</span>
                  </div>
                  <div className="text-sm text-purple-600">{edu.institution}</div>
                  <p className="text-sm mt-1">{edu.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="col-span-4">
          {data.sections.skills.show && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-purple-600 mb-2">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill, i) => (
                  <span key={i} className="bg-gradient-to-r from-purple-200 to-pink-200 px-3 py-1 rounded-full text-xs">{skill}</span>
                ))}
              </div>
            </div>
          )}
          
          {data.sections.languages.show && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-purple-600 mb-2">Languages</h2>
              <div className="space-y-2">
                {data.languages.map((lang, i) => (
                  <div key={i} className="text-sm">
                    <div className="flex justify-between">
                      <span>{lang.language}</span>
                      <span>{lang.proficiency}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-1.5 rounded-full" 
                        style={{width: `${
                          lang.proficiency === 'Native' ? '100%' : 
                          lang.proficiency === 'Fluent' ? '85%' : 
                          lang.proficiency === 'Advanced' ? '70%' : 
                          lang.proficiency === 'Intermediate' ? '50%' : '30%'
                        }`}}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {data.sections.hobbies.show && (
            <div>
              <h2 className="text-xl font-bold text-purple-600 mb-2">Hobbies</h2>
              <div className="flex flex-wrap gap-2">
                {data.hobbies.map((hobby, i) => (
                  <span key={i} className="bg-gradient-to-r from-purple-200 to-pink-200 px-3 py-1 rounded-full text-xs">{hobby}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Main component
export default function Builder() {
  const router = useRouter();
  const resumeRef = useRef(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState('minimalist');
  
  // Form sections toggles
  const [sections, setSections] = useState({
    experience: { show: true },
    education: { show: true },
    skills: { show: true },
    languages: { show: true },
    hobbies: { show: false }
  });
  
  // Resume data
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      name: "",
      title: "",
      email: "",
      phone: "",
      location: "",
      summary: ""
    },
    experience: [
      { position: "", company: "", period: "", description: "" }
    ],
    education: [
      { degree: "", institution: "", period: "", description: "" }
    ],
    skills: [""],
    languages: [
      { language: "", proficiency: "Intermediate" }
    ],
    hobbies: [""],
    sections: sections
  });
  
  // Handle section toggle
  const handleSectionToggle = (section) => {
    setSections(prev => {
      const newSections = {
        ...prev,
        [section]: { show: !prev[section].show }
      };
      
      // Update resumeData with new sections state
      setResumeData(prevData => ({
        ...prevData,
        sections: newSections
      }));
      
      return newSections;
    });
  };
  
  // Handle form input changes
  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setResumeData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [name]: value
      }
    }));
  };
  
  const handleArrayItemChange = (section, index, value, field = null) => {
    setResumeData(prev => {
      const newData = { ...prev };
      
      if (field) {
        newData[section][index][field] = value;
      } else {
        newData[section][index] = value;
      }
      
      return newData;
    });
  };
  
  const addArrayItem = (section) => {
    setResumeData(prev => {
      const newData = { ...prev };
      
      if (section === 'experience') {
        newData.experience.push({ position: "", company: "", period: "", description: "" });
      } else if (section === 'education') {
        newData.education.push({ degree: "", institution: "", period: "", description: "" });
      } else if (section === 'skills') {
        newData.skills.push("");
      } else if (section === 'languages') {
        newData.languages.push({ language: "", proficiency: "Intermediate" });
      } else if (section === 'hobbies') {
        newData.hobbies.push("");
      }
      
      return newData;
    });
  };
  
  const removeArrayItem = (section, index) => {
    setResumeData(prev => {
      const newData = { ...prev };
      newData[section].splice(index, 1);
      return newData;
    });
  };
  
  // Next and previous step handlers
  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));
  
  // Simple direct PDF generation function
  const downloadAsPDF = async () => {
    try {
      // Show loading state
      const button = document.activeElement;
      const originalText = button ? button.innerHTML : '';
      if (button) {
        button.innerHTML = 'Generating PDF...';
      }
      
      // Get the element to convert
      const element = resumeRef.current;
      if (!element) {
        throw new Error('Resume element not found');
      }
      
      // Import html2pdf
      const html2pdf = (await import('html2pdf.js')).default;
      
      // Create a simplified version of the resume to avoid oklch color issues
      const container = document.createElement('div');
      container.style.width = '8.5in';
      container.style.backgroundColor = 'white';
      container.style.padding = '20px';
      
      // Basic HTML content with no complex styling
      container.innerHTML = `
        <h1 style="color: black; text-align: center;">${resumeData.personalInfo.name || 'Resume'}</h1>
        <p style="text-align: center; color: black;">
          ${resumeData.personalInfo.email || ''} 
          ${resumeData.personalInfo.phone ? ` | ${resumeData.personalInfo.phone}` : ''}
          ${resumeData.personalInfo.location ? ` | ${resumeData.personalInfo.location}` : ''}
        </p>
        
        ${resumeData.personalInfo.summary ? `
          <div style="margin-top: 15px;">
            <h2 style="color: black; border-bottom: 1px solid #000;">Summary</h2>
            <p style="color: black;">${resumeData.personalInfo.summary}</p>
          </div>
        ` : ''}
        
        ${resumeData.sections.experience.show ? `
          <div style="margin-top: 15px;">
            <h2 style="color: black; border-bottom: 1px solid #000;">Experience</h2>
            ${resumeData.experience.map(exp => `
              <div style="margin-bottom: 10px;">
                <div style="display: flex; justify-content: space-between;">
                  <strong style="color: black;">${exp.position || ''}</strong>
                  <span style="color: black;">${exp.period || ''}</span>
                </div>
                <div style="color: black;">${exp.company || ''}</div>
                <p style="color: black; margin-top: 5px;">${exp.description || ''}</p>
              </div>
            `).join('')}
          </div>
        ` : ''}
        
        ${resumeData.sections.education.show ? `
          <div style="margin-top: 15px;">
            <h2 style="color: black; border-bottom: 1px solid #000;">Education</h2>
            ${resumeData.education.map(edu => `
              <div style="margin-bottom: 10px;">
                <div style="display: flex; justify-content: space-between;">
                  <strong style="color: black;">${edu.degree || ''}</strong>
                  <span style="color: black;">${edu.period || ''}</span>
                </div>
                <div style="color: black;">${edu.institution || ''}</div>
                <p style="color: black; margin-top: 5px;">${edu.description || ''}</p>
              </div>
            `).join('')}
          </div>
        ` : ''}
        
        ${resumeData.sections.skills.show ? `
          <div style="margin-top: 15px;">
            <h2 style="color: black; border-bottom: 1px solid #000;">Skills</h2>
            <p style="color: black;">${resumeData.skills.join(', ')}</p>
          </div>
        ` : ''}
        
        ${resumeData.sections.languages.show ? `
          <div style="margin-top: 15px;">
            <h2 style="color: black; border-bottom: 1px solid #000;">Languages</h2>
            <ul>
              ${resumeData.languages.map(lang => `
                <li style="color: black;">${lang.language || ''} - ${lang.proficiency || ''}</li>
              `).join('')}
            </ul>
          </div>
        ` : ''}
        
        ${resumeData.sections.hobbies.show ? `
          <div style="margin-top: 15px;">
            <h2 style="color: black; border-bottom: 1px solid #000;">Hobbies</h2>
            <p style="color: black;">${resumeData.hobbies.join(', ')}</p>
          </div>
        ` : ''}
      `;
      
      // Add to document temporarily (outside visible area)
      container.style.position = 'fixed';
      container.style.left = '-9999px';
      document.body.appendChild(container);
      
      // Generate PDF with simple options and clean up
      await html2pdf().from(container).save(`${resumeData.personalInfo.name || 'resume'}.pdf`);
      document.body.removeChild(container);
      
      // Show success message
      if (button) {
        button.innerHTML = 'PDF Generated!';
        setTimeout(() => {
          button.innerHTML = originalText;
        }, 2000);
      }
    } catch (error) {
      console.error('PDF generation failed:', error);
      alert('Failed to generate PDF. Please try again.');
      
      // Reset button if needed
      const button = document.activeElement;
      if (button && button.innerHTML === 'Generating PDF...') {
        button.innerHTML = 'Download as PDF';
      }
    }
  };
  
  // Render appropriate template
  const renderTemplate = () => {
    switch(selectedTemplate) {
      case 'modern':
        return <ModernTemplate data={resumeData} />;
      case 'creative':
        return <CreativeTemplate data={resumeData} />;
      default:
        return <MinimalistTemplate data={resumeData} />;
    }
  };
  
  return (
    <>
      <Head>
        <title>Resume Builder - Create Your Resume</title>
        <meta name="description" content="Build your professional resume with our easy-to-use builder" />
      </Head>
        <div className={`${geistSans.className} ${geistMono.className} ${redHatDisplay.className} min-h-screen bg-gray-900 dark-bg-primary`}>
        <header className="bg-gray-800 dark-bg-secondary shadow-sm">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">            <h1 className="text-2xl font-bold text-white dark-text-primary tracking-tight"
            onClick={() => router.push("/")}>
              Resume <span className="gradient-text">Builder</span>
            </h1>
            <button onClick={() => router.push("/")} className="px-4 py-2 text-sm text-gray-300 dark-text-secondary hover:text-white">
              Back to Home
            </button>
          </div>
        </header>
        
        <main className="container mx-auto px-4 py-8">
          {/* Step navigation */}
          <div className="mb-8">
            <div className="flex justify-between items-center">
              <div className="w-full flex items-center">
                <div className={`step-item ${currentStep >= 1 ? 'active' : ''}`}>
                  <div className="step-number">1</div>
                  <div className="step-label">Choose Template</div>
                </div>
                <div className="step-divider"></div>
                <div className={`step-item ${currentStep >= 2 ? 'active' : ''}`}>
                  <div className="step-number">2</div>
                  <div className="step-label">Fill Details</div>
                </div>
                <div className="step-divider"></div>
                <div className={`step-item ${currentStep >= 3 ? 'active' : ''}`}>
                  <div className="step-number">3</div>
                  <div className="step-label">Preview & Download</div>
                </div>
              </div>
            </div>
          </div>
            {/* Step content */}
          <div className="bg-gray-800 dark-bg-secondary rounded-lg shadow-md p-6 text-gray-200 dark-text-secondary">
            {/* Step 1: Choose Template */}
            {currentStep === 1 && (
              <div>                <h2 className="text-2xl font-bold mb-6 text-white dark-text-primary">Choose a Template</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div 
                    className={`template-card ${selectedTemplate === 'minimalist' ? 'active' : ''}`} 
                    onClick={() => setSelectedTemplate('minimalist')}
                  >
                    <div className="h-60 bg-gray-700 relative overflow-hidden">
                      <div className="absolute inset-0 p-2 scale-75 transform origin-top-left">
                        <MinimalistTemplate data={{
                          personalInfo: { name: "John Doe", email: "john@example.com", phone: "123-456-7890" },
                          experience: [{ position: "Web Developer", company: "Tech Co", period: "2020-Present" }],
                          education: [{ degree: "Computer Science", institution: "University", period: "2016-2020" }],
                          skills: ["HTML", "CSS", "JavaScript"],
                          languages: [{ language: "English", proficiency: "Native" }],
                          hobbies: ["Reading", "Hiking"],
                          sections: { experience: { show: true }, education: { show: true }, skills: { show: true }, languages: { show: true }, hobbies: { show: true } }
                        }} />
                      </div>                    </div>
                    <h3 className="text-center mt-3 font-medium text-white dark-text-primary">Minimalist</h3>
                    <p className="text-center text-sm text-gray-400 dark-text-muted">Clean and professional</p>
                  </div>
                  
                  <div 
                    className={`template-card ${selectedTemplate === 'modern' ? 'active' : ''}`} 
                    onClick={() => setSelectedTemplate('modern')}
                  >
                    <div className="h-60 bg-gray-700 relative overflow-hidden">
                      <div className="absolute inset-0 p-2 scale-75 transform origin-top-left">
                        <ModernTemplate data={{
                          personalInfo: { name: "John Doe", title: "Web Developer", email: "john@example.com", phone: "123-456-7890" },
                          experience: [{ position: "Web Developer", company: "Tech Co", period: "2020-Present" }],
                          education: [{ degree: "Computer Science", institution: "University", period: "2016-2020" }],
                          skills: ["HTML", "CSS", "JavaScript"],
                          languages: [{ language: "English", proficiency: "Native" }],
                          hobbies: ["Reading", "Hiking"],
                          sections: { experience: { show: true }, education: { show: true }, skills: { show: true }, languages: { show: true }, hobbies: { show: true } }
                        }} />
                      </div>                    </div>
                    <h3 className="text-center mt-3 font-medium text-white dark-text-primary">Modern</h3>
                    <p className="text-center text-sm text-gray-400 dark-text-muted">Contemporary two-column layout</p>
                  </div>
                  
                  <div 
                    className={`template-card ${selectedTemplate === 'creative' ? 'active' : ''}`} 
                    onClick={() => setSelectedTemplate('creative')}
                  >
                    <div className="h-60 bg-gray-700 relative overflow-hidden">
                      <div className="absolute inset-0 p-2 scale-75 transform origin-top-left">
                        <CreativeTemplate data={{
                          personalInfo: { name: "John Doe", title: "Web Developer", email: "john@example.com", phone: "123-456-7890" },
                          experience: [{ position: "Web Developer", company: "Tech Co", period: "2020-Present" }],
                          education: [{ degree: "Computer Science", institution: "University", period: "2016-2020" }],
                          skills: ["HTML", "CSS", "JavaScript"],
                          languages: [{ language: "English", proficiency: "Native" }],
                          hobbies: ["Reading", "Hiking"],
                          sections: { experience: { show: true }, education: { show: true }, skills: { show: true }, languages: { show: true }, hobbies: { show: true } }
                        }} />
                      </div>                    </div>
                    <h3 className="text-center mt-3 font-medium text-white dark-text-primary">Creative</h3>
                    <p className="text-center text-sm text-gray-400 dark-text-muted">Modern with stylish accents</p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Step 2: Fill Details */}
            {currentStep === 2 && (
              <div>
                <h2 className="text-2xl font-bold mb-6 text-white dark-text-primary">Fill Your Details</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2">                    {/* Personal Information */}
                    <div className="form-section mb-8">
                      <h3 className="text-xl font-semibold mb-4 text-white dark-text-primary">Personal Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1 text-gray-300 dark-text-secondary">Full Name</label>
                          <input 
                            type="text" 
                            name="name" 
                            value={resumeData.personalInfo.name} 
                            onChange={handlePersonalInfoChange}
                            className="w-full p-2 border rounded dark-input focus:ring-blue-500 focus:border-blue-500 bg-gray-700 border-gray-600 text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1 text-gray-300 dark-text-secondary">Professional Title</label>
                          <input 
                            type="text" 
                            name="title" 
                            value={resumeData.personalInfo.title} 
                            onChange={handlePersonalInfoChange}
                            className="w-full p-2 border rounded dark-input focus:ring-blue-500 focus:border-blue-500 bg-gray-700 border-gray-600 text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1 text-gray-300 dark-text-secondary">Email</label>
                          <input 
                            type="email" 
                            name="email" 
                            value={resumeData.personalInfo.email} 
                            onChange={handlePersonalInfoChange}
                            className="w-full p-2 border rounded dark-input focus:ring-blue-500 focus:border-blue-500 bg-gray-700 border-gray-600 text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1 text-gray-300 dark-text-secondary">Phone</label>
                          <input 
                            type="text" 
                            name="phone" 
                            value={resumeData.personalInfo.phone} 
                            onChange={handlePersonalInfoChange}
                            className="w-full p-2 border rounded dark-input focus:ring-blue-500 focus:border-blue-500 bg-gray-700 border-gray-600 text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1 text-gray-300 dark-text-secondary">Location</label>
                          <input 
                            type="text" 
                            name="location" 
                            value={resumeData.personalInfo.location} 
                            onChange={handlePersonalInfoChange}
                            className="w-full p-2 border rounded dark-input focus:ring-blue-500 focus:border-blue-500 bg-gray-700 border-gray-600 text-white"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium mb-1 text-gray-300 dark-text-secondary">Professional Summary</label>
                          <textarea 
                            name="summary" 
                            value={resumeData.personalInfo.summary} 
                            onChange={handlePersonalInfoChange}
                            className="w-full p-2 border rounded dark-input focus:ring-blue-500 focus:border-blue-500 bg-gray-700 border-gray-600 text-white"
                            rows="3"
                          ></textarea>
                        </div>
                      </div>
                    </div>
                      {/* Experience Section */}
                    <div className="form-section mb-8">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold text-white dark-text-primary">Experience</h3>
                        <div className="flex items-center">
                          <span className="mr-2 text-sm text-gray-300 dark-text-secondary">{sections.experience.show ? 'Show' : 'Hide'}</span>
                          <label className="toggle-switch">
                            <input 
                              type="checkbox" 
                              checked={sections.experience.show} 
                              onChange={() => handleSectionToggle('experience')}
                            />
                            <span className="toggle-slider"></span>
                          </label>
                        </div>
                      </div>
                      
                      {sections.experience.show && (
                        <div className="space-y-4">                          {resumeData.experience.map((exp, index) => (
                            <div key={index} className="p-4 border rounded-lg border-gray-600 dark-border bg-gray-800">
                              <div className="flex justify-between mb-2">
                                <h4 className="font-medium text-white dark-text-primary">Experience #{index + 1}</h4>
                                {resumeData.experience.length > 1 && (
                                  <button 
                                    type="button" 
                                    onClick={() => removeArrayItem('experience', index)}
                                    className="text-red-400 text-sm"
                                  >
                                    Remove
                                  </button>
                                )}
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-sm font-medium mb-1 text-gray-300 dark-text-secondary">Position</label>
                                  <input 
                                    type="text" 
                                    value={exp.position} 
                                    onChange={(e) => handleArrayItemChange('experience', index, e.target.value, 'position')}
                                    className="w-full p-2 border rounded dark-input bg-gray-700 border-gray-600 text-white"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium mb-1 text-gray-300 dark-text-secondary">Company</label>
                                  <input 
                                    type="text" 
                                    value={exp.company} 
                                    onChange={(e) => handleArrayItemChange('experience', index, e.target.value, 'company')}
                                    className="w-full p-2 border rounded dark-input bg-gray-700 border-gray-600 text-white"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium mb-1 text-gray-300 dark-text-secondary">Period</label>
                                  <input 
                                    type="text" 
                                    value={exp.period} 
                                    onChange={(e) => handleArrayItemChange('experience', index, e.target.value, 'period')}
                                    className="w-full p-2 border rounded dark-input bg-gray-700 border-gray-600 text-white"
                                    placeholder="e.g., 2020-Present"
                                  />
                                </div>
                                <div className="md:col-span-2">
                                  <label className="block text-sm font-medium mb-1 text-gray-300 dark-text-secondary">Description</label>
                                  <textarea 
                                    value={exp.description} 
                                    onChange={(e) => handleArrayItemChange('experience', index, e.target.value, 'description')}
                                    className="w-full p-2 border rounded dark-input bg-gray-700 border-gray-600 text-white"
                                    rows="2"
                                  ></textarea>
                                </div>
                              </div>
                            </div>
                          ))}                          <button 
                            type="button" 
                            onClick={() => addArrayItem('experience')}
                            className="text-blue-400 flex items-center text-sm"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Add Experience
                          </button>
                        </div>
                      )}
                    </div>
                    
                    {/* Education Section */}
                    <div className="form-section mb-8">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold text-white dark-text-primary">Education</h3>
                        <div className="flex items-center">
                          <span className="mr-2 text-sm text-gray-300 dark-text-secondary">{sections.education.show ? 'Show' : 'Hide'}</span>
                          <label className="toggle-switch">
                            <input 
                              type="checkbox" 
                              checked={sections.education.show} 
                              onChange={() => handleSectionToggle('education')}
                            />
                            <span className="toggle-slider"></span>
                          </label>
                        </div>
                      </div>
                        {sections.education.show && (
                        <div className="space-y-4">
                          {resumeData.education.map((edu, index) => (
                            <div key={index} className="p-4 border rounded-lg border-gray-600 dark-border bg-gray-800">
                              <div className="flex justify-between mb-2">
                                <h4 className="font-medium text-white dark-text-primary">Education #{index + 1}</h4>
                                {resumeData.education.length > 1 && (
                                  <button 
                                    type="button" 
                                    onClick={() => removeArrayItem('education', index)}
                                    className="text-red-400 text-sm"
                                  >
                                    Remove
                                  </button>
                                )}
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-sm font-medium mb-1 text-gray-300 dark-text-secondary">Degree/Certification</label>
                                  <input 
                                    type="text" 
                                    value={edu.degree} 
                                    onChange={(e) => handleArrayItemChange('education', index, e.target.value, 'degree')}
                                    className="w-full p-2 border rounded dark-input bg-gray-700 border-gray-600 text-white"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium mb-1 text-gray-300 dark-text-secondary">Institution</label>
                                  <input 
                                    type="text" 
                                    value={edu.institution} 
                                    onChange={(e) => handleArrayItemChange('education', index, e.target.value, 'institution')}
                                    className="w-full p-2 border rounded dark-input bg-gray-700 border-gray-600 text-white"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium mb-1 text-gray-300 dark-text-secondary">Period</label>
                                  <input 
                                    type="text" 
                                    value={edu.period} 
                                    onChange={(e) => handleArrayItemChange('education', index, e.target.value, 'period')}
                                    className="w-full p-2 border rounded dark-input bg-gray-700 border-gray-600 text-white"
                                    placeholder="e.g., 2016-2020"
                                  />
                                </div>
                                <div className="md:col-span-2">
                                  <label className="block text-sm font-medium mb-1 text-gray-300 dark-text-secondary">Description</label>
                                  <textarea 
                                    value={edu.description} 
                                    onChange={(e) => handleArrayItemChange('education', index, e.target.value, 'description')}
                                    className="w-full p-2 border rounded dark-input bg-gray-700 border-gray-600 text-white"
                                    rows="2"
                                  ></textarea>
                                </div>
                              </div>
                            </div>
                          ))}                          <button 
                            type="button" 
                            onClick={() => addArrayItem('education')}
                            className="text-blue-400 flex items-center text-sm"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Add Education
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    {/* Skills Section */}
                    <div className="form-section mb-8">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold text-white dark-text-primary">Skills</h3>
                        <div className="flex items-center">
                          <span className="mr-2 text-sm text-gray-300 dark-text-secondary">{sections.skills.show ? 'Show' : 'Hide'}</span>
                          <label className="toggle-switch">
                            <input 
                              type="checkbox" 
                              checked={sections.skills.show} 
                              onChange={() => handleSectionToggle('skills')}
                            />
                            <span className="toggle-slider"></span>
                          </label>
                        </div>
                      </div>
                        {sections.skills.show && (
                        <div className="space-y-3">
                          {resumeData.skills.map((skill, index) => (
                            <div key={index} className="flex items-center">
                              <input 
                                type="text" 
                                value={skill} 
                                onChange={(e) => handleArrayItemChange('skills', index, e.target.value)}
                                className="w-full p-2 border rounded dark-input bg-gray-700 border-gray-600 text-white"
                                placeholder="e.g., JavaScript"
                              />
                              {resumeData.skills.length > 1 && (
                                <button 
                                  type="button" 
                                  onClick={() => removeArrayItem('skills', index)}
                                  className="ml-2 text-red-400"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                </button>
                              )}
                            </div>
                          ))}
                          <button 
                            type="button" 
                            onClick={() => addArrayItem('skills')}
                            className="text-blue-400 flex items-center text-sm"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Add Skill
                          </button>
                        </div>
                      )}
                    </div>
                      {/* Languages Section */}
                    <div className="form-section mb-8">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold text-white dark-text-primary">Languages</h3>
                        <div className="flex items-center">
                          <span className="mr-2 text-sm text-gray-300 dark-text-secondary">{sections.languages.show ? 'Show' : 'Hide'}</span>
                          <label className="toggle-switch">
                            <input 
                              type="checkbox" 
                              checked={sections.languages.show} 
                              onChange={() => handleSectionToggle('languages')}
                            />
                            <span className="toggle-slider"></span>
                          </label>
                        </div>
                      </div>
                      
                      {sections.languages.show && (
                        <div className="space-y-4">
                          {resumeData.languages.map((lang, index) => (
                            <div key={index} className="p-3 border rounded-lg border-gray-600 dark-border bg-gray-800">
                              <div className="flex justify-between mb-2">
                                <h4 className="text-sm font-medium text-white dark-text-primary">Language #{index + 1}</h4>
                                {resumeData.languages.length > 1 && (
                                  <button 
                                    type="button" 
                                    onClick={() => removeArrayItem('languages', index)}
                                    className="text-red-400 text-xs"
                                  >
                                    Remove
                                  </button>
                                )}
                              </div>
                              <div className="space-y-2">
                                <div>
                                  <label className="block text-sm font-medium mb-1 text-gray-300 dark-text-secondary">Language</label>
                                  <input 
                                    type="text" 
                                    value={lang.language} 
                                    onChange={(e) => handleArrayItemChange('languages', index, e.target.value, 'language')}
                                    className="w-full p-2 border rounded dark-input bg-gray-700 border-gray-600 text-white"
                                    placeholder="e.g., English"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium mb-1 text-gray-300 dark-text-secondary">Proficiency</label>
                                  <select 
                                    value={lang.proficiency} 
                                    onChange={(e) => handleArrayItemChange('languages', index, e.target.value, 'proficiency')}
                                    className="w-full p-2 border rounded dark-input bg-gray-700 border-gray-600 text-white"
                                  >
                                    <option value="Native">Native</option>
                                    <option value="Fluent">Fluent</option>
                                    <option value="Advanced">Advanced</option>
                                    <option value="Intermediate">Intermediate</option>
                                    <option value="Basic">Basic</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                          ))}                          <button 
                            type="button" 
                            onClick={() => addArrayItem('languages')}
                            className="text-blue-400 flex items-center text-sm"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Add Language
                          </button>
                        </div>
                      )}
                    </div>
                    
                    {/* Hobbies Section */}
                    <div className="form-section mb-8">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold text-white dark-text-primary">Hobbies</h3>
                        <div className="flex items-center">
                          <span className="mr-2 text-sm text-gray-300 dark-text-secondary">{sections.hobbies.show ? 'Show' : 'Hide'}</span>
                          <label className="toggle-switch">
                            <input 
                              type="checkbox" 
                              checked={sections.hobbies.show} 
                              onChange={() => handleSectionToggle('hobbies')}
                            />
                            <span className="toggle-slider"></span>
                          </label>
                        </div>
                      </div>
                        {sections.hobbies.show && (
                        <div className="space-y-3">
                          {resumeData.hobbies.map((hobby, index) => (
                            <div key={index} className="flex items-center">
                              <input 
                                type="text" 
                                value={hobby} 
                                onChange={(e) => handleArrayItemChange('hobbies', index, e.target.value)}
                                className="w-full p-2 border rounded dark-input bg-gray-700 border-gray-600 text-white"
                                placeholder="e.g., Reading"
                              />
                              {resumeData.hobbies.length > 1 && (
                                <button 
                                  type="button" 
                                  onClick={() => removeArrayItem('hobbies', index)}
                                  className="ml-2 text-red-400"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                </button>
                              )}
                            </div>
                          ))}
                          <button 
                            type="button" 
                            onClick={() => addArrayItem('hobbies')}
                            className="text-blue-400 flex items-center text-sm"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Add Hobby
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
              {/* Step 3: Preview & Download */}
            {currentStep === 3 && (
              <div>
                <h2 className="text-2xl font-bold mb-6 text-white dark-text-primary">Preview & Download</h2>
                <div className="grid grid-cols-1 gap-6">
                  <div className="flex justify-end">
                    <button 
                      onClick={downloadAsPDF} 
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download as PDF
                    </button>
                  </div>
                  <div className="bg-gray-800 p-6 rounded">
                    <div 
                      ref={resumeRef} 
                      className="mx-auto max-w-letter aspect-[1/1.4] shadow-xl overflow-hidden bg-white"
                    >
                      {renderTemplate()}
                    </div>
                  </div>
                </div>
              </div>
            )}
              {/* Navigation buttons */}
            <div className="mt-8 flex justify-between">
              {currentStep > 1 ? (
                <button onClick={prevStep} className="px-4 py-2 border border-gray-600 dark-border rounded hover:bg-gray-700 transition text-white">
                  Previous
                </button>
              ) : (
                <div></div>
              )}
              
              {currentStep < 3 ? (
                <button onClick={nextStep} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                  Next
                </button>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
