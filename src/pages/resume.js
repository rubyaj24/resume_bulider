import { Red_Hat_Display } from "next/font/google";
import Head from "next/head";
import { useState,useEffect } from "react";
import ToggleSwitch from "../components/ToggleSwitch";
import { useRouter } from "next/router";
import { saveResumeData, loadResumeData } from "../utils/storage";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const redHatDisplay = Red_Hat_Display({
  variable: "--font-red-hat-display",
  subsets: ["latin"],
});

export default function ResumePage() {
  const router = useRouter();

  // State for toggles
  const [showExperience, setShowExperience] = useState(false);
  const [showEducation, setShowEducation] = useState(false);
  const [showSkills, setShowSkills] = useState(false);
  const [showHobbies, setShowHobbies] = useState(false);
  const [showLanguages, setShowLanguages] = useState(false);

  const [isLoaded, setIsLoaded] = useState(false);

  // State for form inputs
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState({ city: "", state: "", country: "" });
  const [summary, setSummary] = useState("");
  const [experience, setExperience] = useState([{ jobTitle: "", companyName: "", location: "", duration: "", responsibilities: "" }]);
  const [education, setEducation] = useState([
    {
      degree: "",
      institution: "",
      graduationYear: ""
    }
  ]);

  const [skills, setSkills] = useState("");
  const [languages, setLanguages] = useState([
    { language: "", proficiency: "" }
  ]);

  const [hobbies, setHobbies] = useState("");

  // Validate form inputs
  const [errors, setErrors] = useState({});

  useEffect(() => {
    console.log('Loading data from secure storage...');
    const savedData = loadResumeData();
    
    setFullName(savedData.fullName);
    setEmail(savedData.email);
    setPhone(savedData.phone);
    setLocation(savedData.location);
    setSummary(savedData.summary);
    setExperience(savedData.experience);
    setEducation(savedData.education);
    setSkills(savedData.skills);
    setLanguages(savedData.languages);
    setHobbies(savedData.hobbies);
    
    // Load toggle states
    setShowExperience(savedData.showExperience);
    setShowEducation(savedData.showEducation);
    setShowSkills(savedData.showSkills);
    setShowLanguages(savedData.showLanguages);
    setShowHobbies(savedData.showHobbies);
    
    setIsLoaded(true);
  }, []);

  // Save data to secure storage whenever state changes
  useEffect(() => {
    if (!isLoaded) return;
    
    const dataToSave = {
      fullName,
      email,
      phone,
      location,
      summary,
      experience,
      education,
      skills,
      languages,
      hobbies,
      showExperience,
      showEducation,
      showSkills,
      showLanguages,
      showHobbies,
    };
    
    const success = saveResumeData(dataToSave);
    if (!success) {
      console.warn('Failed to save resume data');
    }
  }, [isLoaded, fullName, email, phone, location, summary, experience, education, skills, languages, hobbies, showExperience, showEducation, showSkills, showLanguages, showHobbies]);


  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = () => {
    const newErrors = {};
    if (!fullName) newErrors.fullName = "Full Name is required";
    if (!email) newErrors.email = "Email is required";
    if (!validateEmail(email)) newErrors.email = "Invalid email format";
    if (!phone) newErrors.phone = "Phone number is required";
    if (location.city === "") newErrors.city = "City is required";
    if (location.state === "") newErrors.state = "State is required";
    if (location.country === "") newErrors.country = "Country is required";
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const query = {
        fullName,
        email,
        phone,
        city: location.city,
        state: location.state,
        country: location.country,
        summary,
      };

      if (showExperience) {
        query.experience = JSON.stringify(experience);
      }

      if (showEducation) {
        query.education = JSON.stringify(education);
      }

      // Add skills if toggled on
      if (showSkills) {
        query.skills = skills;
      }

      if (showLanguages) {
        query.languages = JSON.stringify(languages);
      }

      if (showHobbies) {
        query.hobbies = hobbies;
      }

      router.push({
        pathname: '/preview',
        query: query,
      });
    }
    
  };

  return (
    <>
      <Head>
        <title>Add info - Resume Builder</title>
      </Head>
      <div className={`${redHatDisplay.className} min-h-screen bg-gray-900 text-white`}>
        <Header />

        <main className="container mx-auto py-8">
          <div className="bg-gray-900 shadow-lg rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && (<p className="text-red-500 text-sm mt-1">{errors.email}</p>)}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="+91 XXXXX XXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                {errors.phone && (<p className="text-red-500 text-sm mt-1">{errors.phone}</p>)}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  City
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="City"
                  value={location.city}
                  onChange={(e) => setLocation({ ...location, city: e.target.value })}
                />
                {errors.city && (<p className="text-red-500 text-sm mt-1">{errors.city}</p>)}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  State
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="State"
                  value={location.state}
                  onChange={(e) => setLocation({ ...location, state: e.target.value })}
                />
                {errors.state && (<p className="text-red-500 text-sm mt-1">{errors.state}</p>)}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Country
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Country"
                  value={location.country}
                  onChange={(e) => setLocation({ ...location, country: e.target.value })}
                />
                {errors.country && (<p className="text-red-500 text-sm mt-1">{errors.country}</p>)}
              </div>
            </div>
          </div>

          <div className="bg-gray-900 shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Professional Summary</h2>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-md h-32"
              placeholder="Write a brief summary of your professional background and skills..."
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
            >
            </textarea>
            {errors.summary && (<p className="text-red-500 text-sm mt-1">{errors.summary}</p>)}
          </div>

          {/* Experience Section */}
          <div className="bg-gray-900 shadow-lg rounded-lg p-6 my-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Experience</h2>
              <ToggleSwitch
                isChecked={showExperience}
                onChange={() => setShowExperience(!showExperience)}
                label="Include Experience"
              />
            </div>

            {showExperience && (
              <div>
                {experience.map((exp, index) => (
                  <div key={index} className="mb-4">
                    <label className="block text-sm font-medium text-gray-400 mb-1">Experience #{index + 1}</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md mb-2 text-white"
                      placeholder="Job Title"
                      value={exp.jobTitle}
                      onChange={(e) => {
                        const newExperience = [...experience];
                        newExperience[index].jobTitle = e.target.value;
                        setExperience(newExperience);
                      }}
                    />
                    <input
                      type="text"
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md mb-2 text-white"
                      placeholder="Company Name"
                      value={exp.companyName}
                      onChange={(e) => {
                        const newExperience = [...experience];
                        newExperience[index].companyName = e.target.value;
                        setExperience(newExperience);
                      }}
                    />
                    <input
                      type="text"
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md mb-2 text-white"
                      placeholder="Location"
                      value={exp.location}
                      onChange={(e) => {
                        const newExperience = [...experience];
                        newExperience[index].location = e.target.value;
                        setExperience(newExperience);
                      }}
                    />
                    <input
                      type="text"
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md mb-2 text-white"
                      placeholder="Duration"
                      value={exp.duration}
                      onChange={(e) => {
                        const newExperience = [...experience];
                        newExperience[index].duration = e.target.value;
                        setExperience(newExperience);
                      }}
                    />
                    <textarea
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white"
                      placeholder="Describe your responsibilities and achievements..."
                      value={exp.responsibilities}
                      onChange={(e) => {
                        const newExperience = [...experience];
                        newExperience[index].responsibilities = e.target.value;
                        setExperience(newExperience);
                      }}
                    ></textarea>
                  </div>
                ))}
                <button
                  type="button"
                  className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                  onClick={() => setExperience([...experience, { jobTitle: '', companyName: '', location: '', duration: '', responsibilities: '' }])}
                >
                  + Add Experience
                </button>
              </div>
            )}
          </div>

          {/* Education Section */}
          <div className="bg-gray-900 shadow-lg rounded-lg p-6 my-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Education</h2>
              <ToggleSwitch
                isChecked={showEducation}
                onChange={() => setShowEducation(!showEducation)}
              />
            </div>

            {showEducation && (
              <div>
                {/* Education form fields */}
                {education.map((edu, index) => (
                    <div key={index} className="mb-4">
                  <input
                    type="text"
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md mb-2 text-white"
                    placeholder="Degree"
                    value={edu.degree}
                    onChange={(e) => {
                      const newEducation = [...education];
                      newEducation[index].degree = e.target.value;
                      setEducation(newEducation);
                    }}
                  />
                  <input
                    type="text"
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md mb-2 text-white"
                    placeholder="Institution"
                    value={edu.institution}
                    onChange={(e) => {
                      const newEducation = [...education];
                      newEducation[index].institution = e.target.value;
                      setEducation(newEducation);
                    }}
                  />
                  <input
                    type="text"
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md mb-2 text-white"
                    placeholder="Graduation Year"
                    value={edu.graduationYear}
                    onChange={(e) => {
                      const newEducation = [...education];
                      newEducation[index].graduationYear = e.target.value;
                      setEducation(newEducation);
                    }}
                  />
                </div>
              ))}
              <button
                type="button"
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                onClick={() => setEducation([...education, { degree: '', institution: '', graduationYear: '' }])}
              >
                + Add Education
              </button>
            </div>
          )}
          </div>

          {/* Skills Section */}
          <div className="bg-gray-900 shadow-lg rounded-lg p-6 my-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Skills</h2>
              <ToggleSwitch
                isChecked={showSkills}
                onChange={() => setShowSkills(!showSkills)}
              />
            </div>

            {showSkills && (
              <div>
                {/* Skills form fields */}
                <textarea
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white h-32"
                  placeholder="List your skills (e.g., JavaScript, Project Management, Photoshop)"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                ></textarea>
              </div>
            )}
          </div>

          {/* Languages Section */}
          <div className="bg-gray-900 shadow-lg rounded-lg p-6 my-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Languages</h2>
              <ToggleSwitch
                isChecked={showLanguages}
                onChange={() => setShowLanguages(!showLanguages)}
              />
            </div>            {showLanguages && (
              <div>
                {/* Language form fields */}
                {languages.map((lang, index) => (
                  <div key={index} className="mb-4">
                    <input
                      type="text"
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md mb-2 text-white"
                      placeholder="Language"
                      value={lang.language}
                      onChange={(e) => {
                        const newLanguages = [...languages];
                        newLanguages[index].language = e.target.value;
                        setLanguages(newLanguages);
                      }}
                    />
                    <select 
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white"
                      value={lang.proficiency}
                      onChange={(e) => {
                        const newLanguages = [...languages];
                        newLanguages[index].proficiency = e.target.value;
                        setLanguages(newLanguages);
                      }}
                    >
                      <option value="">-- Proficiency --</option>
                      <option value="native">Native</option>
                      <option value="fluent">Fluent</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="basic">Basic</option>
                    </select>
                  </div>
                ))}
                <button
                  type="button"
                  className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                  onClick={() => setLanguages([...languages, { language: '', proficiency: '' }])}
                >
                  + Add Language
                </button>
              </div>
            )}
          </div>

          {/* Hobbies Section */}
          <div className="bg-gray-900 shadow-lg rounded-lg p-6 my-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Hobbies</h2>
              <ToggleSwitch
                isChecked={showHobbies}
                onChange={() => setShowHobbies(!showHobbies)}
              />
            </div>

            {showHobbies && (
              <div>
                {/* Hobbies form fields */}
                <textarea
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white h-24"
                  placeholder="List your hobbies and interests"
                  value={hobbies}
                  onChange={(e) => setHobbies(e.target.value)}
                ></textarea>
              </div>
            )}
          </div>
        </main>
        <div className="flex justify-center space-around p-4">
            <button className="mr-4 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500 transition"
            onClick={() => router.back()}>
                ← Home
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            onClick={() => handleSubmit()}>
                Preview
            </button>
        </div>

        <Footer />
      </div>
    </>
  );
}