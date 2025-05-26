/**
 * Alternative approach for PDF generation that uses pure HTML and style extraction
 */

/**
 * Creates a clean HTML representation of the element with standardized colors
 * @param {HTMLElement} element - The source element
 * @returns {HTMLElement} - A new element with simplified styling
 */
export function createCleanHtml(sourceElement) {
  // Create a new container
  const container = document.createElement('div');
  container.style.width = '8.5in';
  container.style.backgroundColor = 'white';
  container.style.color = 'black';
  container.style.fontFamily = 'Arial, sans-serif';
  container.style.position = 'fixed';
  container.style.top = '-9999px';
  container.style.left = '-9999px';
  
  // Copy the content
  container.innerHTML = sourceElement.innerHTML;
  
  // Apply basic styling to all elements
  const allElements = container.querySelectorAll('*');
  allElements.forEach(el => {
    // Reset all colors to basic values
    el.style.color = 'black';
    el.style.backgroundColor = 'white';
    
    // Handle specific elements
    if (el.tagName === 'DIV' && el.style.backgroundColor) {
      // For divs that had background color, use light gray instead
      el.style.backgroundColor = '#f8f8f8';
    }
    
    if (el.classList.contains('bg-blue-600')) {
      el.style.backgroundColor = '#2563eb';
      el.style.color = 'white';
    }
    
    if (el.classList.contains('bg-gray-800')) {
      el.style.backgroundColor = '#1f2937';
      el.style.color = '#f9fafb';
    }
    
    if (el.classList.contains('bg-gray-100')) {
      el.style.backgroundColor = '#f3f4f6';
    }
    
    if (el.classList.contains('bg-gradient-to-r')) {
      // Replace gradient with solid color
      el.style.background = '#4f46e5';
      el.style.color = 'white';
    }
  });
  
  return container;
}

/**
 * Simplified PDF generation function that uses basic HTML transformation
 */
export async function generatePDF(element, filename) {
  try {
    // Create a clean representation of the element
    const cleanElement = createCleanHtml(element);
    document.body.appendChild(cleanElement);
    
    // Import library dynamically
    const { jsPDF } = await import('jspdf');
    const html2canvas = (await import('html2canvas')).default;
    
    // Create PDF
    const canvas = await html2canvas(cleanElement, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff'
    });
    
    // Remove temporary element
    document.body.removeChild(cleanElement);
    
    // Create PDF from canvas
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
