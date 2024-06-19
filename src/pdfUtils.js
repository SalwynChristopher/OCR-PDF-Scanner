// pdfUtils.js

import pdfjs from 'pdfjs-dist';

// Function to extract text from a PDF file
export async function extractTextFromPdf(pdfFile, workerSrc) {
  pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

  const loadingTask = pdfjs.getDocument(pdfFile);
  const pdf = await loadingTask.promise;
  const totalPages = pdf.numPages;

  let fullText = '';

  for (let i = 1; i <= totalPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();

    textContent.items.forEach(item => {
      fullText += item.str + '\n'; // Add '\n' for line breaks
    });
  }

  return fullText.trim(); // Trim to remove any leading/trailing whitespace
}
