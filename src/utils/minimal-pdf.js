export function simplePDF(element, filename) {
  return new Promise((resolve, reject) => {
    import('html2pdf.js').then(module => {
      const html2pdf = module.default;
      const opt = {
        margin: 0.5,
        filename: filename || 'resume.pdf',
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      };
      html2pdf().set(opt).from(element).save().then(resolve).catch(reject);
    }).catch(reject);
  });
}
