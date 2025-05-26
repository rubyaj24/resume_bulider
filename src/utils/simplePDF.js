/**
 * Generates a PDF from an element, handling modern CSS colors
 * @param {HTMLElement} element - The element to convert
 * @param {string} filename - Filename for the PDF
 * @returns {Promise<void>}
 */
export async function generateSimplePDF(element, filename = 'resume.pdf') {
  if (!element) {
    throw new Error('Element not found');
  }

  try {
    // Dynamically import required libraries to avoid SSR issues
    const html2canvas = (await import('html2canvas')).default;
    const { jsPDF } = await import('jspdf');
    
    // Create canvas with simplified colors
    const canvas = await html2canvas(element, {
      scale: 2, 
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      onclone: (clonedDoc, clonedElement) => {
        const elements = clonedElement.querySelectorAll('*');
        elements.forEach(el => {
          // Convert all text to black
          el.style.color = '#000000';
          
          // Set safe background colors
          if (getComputedStyle(el).backgroundColor !== 'rgba(0, 0, 0, 0)') {
            // Check if it's using a complex color format
            try {
              el.style.backgroundColor = '#ffffff';
            } catch (e) {
              console.log('Error setting background color');
            }
          }
        });
      }
    });

    // Convert to PDF
    const imgData = canvas.toDataURL('image/jpeg', 1.0);
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    
    const ratio = Math.min(pdfWidth / canvasWidth, pdfHeight / canvasHeight);
    const imgWidth = canvasWidth * ratio;
    const imgHeight = canvasHeight * ratio;
    
    const x = (pdfWidth - imgWidth) / 2;
    const y = 0;
    
    pdf.addImage(imgData, 'JPEG', x, y, imgWidth, imgHeight);
    pdf.save(filename);
    
    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
}
