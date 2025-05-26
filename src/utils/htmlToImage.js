/**
 * Alternative approach for PDF generation using html-to-image
 */

/**
 * Generates a PDF from an element using html-to-image
 * This is a last-resort approach when other methods fail
 */
export async function generatePDFWithHtmlToImage(element, filename) {
  try {
    // Import libraries
    const { toPng } = await import('html-to-image');
    const { jsPDF } = await import('jspdf');
    
    // Create a clean copy of the element with simplified styles
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.left = '-9999px';
    container.style.top = '-9999px';
    container.style.backgroundColor = 'white';
    container.style.width = '8.5in'; // Letter size width
    container.style.padding = '0';
    container.style.margin = '0';
    
    // Clone the content
    container.innerHTML = element.innerHTML;
    
    // Add it to the body temporarily
    document.body.appendChild(container);
    
    // Generate image from the DOM
    const dataUrl = await toPng(container, {
      quality: 1.0,
      pixelRatio: 2,
      backgroundColor: 'white'
    });
    
    // Create PDF
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: 'letter'
    });
    
    // Add the image to the PDF
    const imgProps = pdf.getImageProperties(dataUrl);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = imgProps.width;
    const imgHeight = imgProps.height;
    
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    const imgX = (pdfWidth - imgWidth * ratio) / 2;
    const imgY = 0;
    
    pdf.addImage(dataUrl, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
    pdf.save(filename);
    
    // Clean up
    document.body.removeChild(container);
    
    return true;
  } catch (error) {
    console.error('Error generating PDF with html-to-image:', error);
    throw error;
  }
}
