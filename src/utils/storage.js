// Safe localStorage utilities with validation

const STORAGE_KEY = 'resumeData';

// Define the expected structure for validation
const defaultResumeData = {
  fullName: '',
  email: '',
  phone: '',
  location: { city: '', state: '', country: '' },
  summary: '',
  experience: [{ jobTitle: '', companyName: '', location: '', duration: '', responsibilities: '' }],
  education: [{ degree: '', institution: '', graduationYear: '' }],
  skills: '',
  languages: [{ language: '', proficiency: '' }],
  hobbies: '',
  showExperience: false,
  showEducation: false,
  showSkills: false,
  showLanguages: false,
  showHobbies: false,
};

// Sanitize string inputs
const sanitizeString = (value) => {
  if (typeof value !== 'string') return '';
  // Remove potentially dangerous characters and limit length
  return value.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
              .replace(/[<>]/g, '')
              .slice(0, 1000);
};

// Validate and sanitize data structure
const validateAndSanitizeData = (data) => {
  try {
    const sanitized = { ...defaultResumeData };
    
    // Sanitize strings
    if (data.fullName) sanitized.fullName = sanitizeString(data.fullName);
    if (data.email) sanitized.email = sanitizeString(data.email);
    if (data.phone) sanitized.phone = sanitizeString(data.phone);
    if (data.summary) sanitized.summary = sanitizeString(data.summary);
    if (data.skills) sanitized.skills = sanitizeString(data.skills);
    if (data.hobbies) sanitized.hobbies = sanitizeString(data.hobbies);
    
    // Validate location object
    if (data.location && typeof data.location === 'object') {
      sanitized.location = {
        city: sanitizeString(data.location.city || ''),
        state: sanitizeString(data.location.state || ''),
        country: sanitizeString(data.location.country || ''),
      };
    }
    
    // Validate experience array
    if (Array.isArray(data.experience)) {
      sanitized.experience = data.experience.map(exp => ({
        jobTitle: sanitizeString(exp?.jobTitle || ''),
        companyName: sanitizeString(exp?.companyName || ''),
        location: sanitizeString(exp?.location || ''),
        duration: sanitizeString(exp?.duration || ''),
        responsibilities: sanitizeString(exp?.responsibilities || ''),
      }));
    }
    
    // Validate education array
    if (Array.isArray(data.education)) {
      sanitized.education = data.education.map(edu => ({
        degree: sanitizeString(edu?.degree || ''),
        institution: sanitizeString(edu?.institution || ''),
        graduationYear: sanitizeString(edu?.graduationYear || ''),
      }));
    }
    
    // Validate languages array
    if (Array.isArray(data.languages)) {
      sanitized.languages = data.languages.map(lang => ({
        language: sanitizeString(lang?.language || ''),
        proficiency: sanitizeString(lang?.proficiency || ''),
      }));
    }
    
    // Validate boolean toggles
    sanitized.showExperience = Boolean(data.showExperience);
    sanitized.showEducation = Boolean(data.showEducation);
    sanitized.showSkills = Boolean(data.showSkills);
    sanitized.showLanguages = Boolean(data.showLanguages);
    sanitized.showHobbies = Boolean(data.showHobbies);
    
    return sanitized;
  } catch (error) {
    console.error('Data validation error:', error);
    return defaultResumeData;
  }
};

// Secure save to localStorage
export const saveResumeData = (data) => {
  try {
    const sanitizedData = validateAndSanitizeData(data);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sanitizedData));
    return true;
  } catch (error) {
    console.error('Error saving resume data:', error);
    return false;
  }
};

// Secure load from localStorage
export const loadResumeData = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return defaultResumeData;
    
    const parsed = JSON.parse(stored);
    return validateAndSanitizeData(parsed);
  } catch (error) {
    console.error('Error loading resume data:', error);
    // Clear corrupted data
    localStorage.removeItem(STORAGE_KEY);
    return defaultResumeData;
  }
};

// Clear stored data
export const clearResumeData = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing resume data:', error);
    return false;
  }
};
