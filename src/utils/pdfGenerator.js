/**
 * PDF Generator utility functions
 */

/**
 * Alternative PDF generation function that uses jsPDF directly
 * This avoids issues with modern CSS color functions like oklch
 * @param {HTMLElement} element - The element to convert to PDF
 * @param {string} filename - The name for the downloaded file
 */
export const generatePDF = async (element, filename = 'resume.pdf') => {
  // Dynamically import the required libraries
  const html2canvas = (await import('html2canvas')).default;
  const { jsPDF } = await import('jspdf');
  
  // Create the canvas
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    allowTaint: true,
    backgroundColor: '#ffffff',
    // Ignore CSS background images and colors that might use problematic color formats
    onclone: (document, element) => {
      const allElements = element.querySelectorAll('*');
      allElements.forEach(el => {
        // Apply only standard color formats
        el.style.color = '#000000';
        
        // Remove background images
        if (el.style.backgroundImage) {
          el.style.backgroundImage = 'none';
        }
        
        // Set solid background colors
        if (el.style.backgroundColor) {
          el.style.backgroundColor = '#ffffff';
        }
      });
    }
  });

  // Get dimensions from canvas
  const imgData = canvas.toDataURL('image/jpeg', 0.98);
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'px',
    format: 'a4',
  });

  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();
  const imgWidth = canvas.width;
  const imgHeight = canvas.height;
  const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
  const imgX = (pdfWidth - imgWidth * ratio) / 2;
  const imgY = 30;

  pdf.addImage(imgData, 'JPEG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
  pdf.save(filename);
  
  return true;
};

/**
 * Fallback PDF generation function that tries multiple approaches
 */
export const generatePDFWithFallback = async (element, name = 'resume') => {
  try {
    const html2pdf = (await import('html2pdf.js')).default;
    
    if (!element) {
      console.error("Element reference not found");
      throw new Error("Element reference not found");
    }
    
    const options = {
      margin: 0.5,
      filename: `${name}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2,
        useCORS: true,
        logging: false,
        letterRendering: true
      },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    
    try {
      // First attempt: Direct approach with html2pdf default settings
      return await html2pdf().from(element).set(options).save();
    } catch (error) {
      console.log("First PDF approach failed, trying alternative methods", error);
      
      // Second attempt: Try with the simplified approach
      return await generatePDF(element, `${name}.pdf`);
    }
  } catch (finalError) {
    console.error("All PDF generation methods failed:", finalError);
    alert("There was an error generating the PDF. Please try again.");
    throw finalError;
  }
};
