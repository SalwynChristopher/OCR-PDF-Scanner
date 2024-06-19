import React, { useState, useEffect } from 'react';
import { getDocument } from 'pdfjs-dist/build/pdf';

const PdfViewer = ({ pdfFile }) => {
  const [pdfText, setPdfText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchPdfText = async () => {
      if (!pdfFile) return;

      try {
        const reader = new FileReader();
        reader.onloadend = async () => {
          try {
            const arrayBuffer = reader.result;
            const pdfData = new Uint8Array(arrayBuffer);

            // Use PDF.js to parse the PDF file
            const pdf = await getDocument({ data: pdfData }).promise;

            let text = '';
            for (let i = 1; i <= pdf.numPages; i++) {
              const page = await pdf.getPage(i);
              const textContent = await page.getTextContent();
              textContent.items.forEach((item) => {
                text += item.str + '\n'; // Add '\n' for line breaks
              });
            }

            setPdfText(text.trim()); // Trim to remove any leading/trailing whitespace
            setErrorMessage('');
          } catch (error) {
            console.error('Error parsing PDF:', error);
            setPdfText('');
            setErrorMessage('Error parsing PDF. Please try again with another file.');
          }
        };

        reader.readAsArrayBuffer(pdfFile);
      } catch (error) {
        console.error('Error reading file:', error);
        setErrorMessage('Error reading file. Please try again.');
      }
    };

    fetchPdfText();
  }, [pdfFile]);

  return (
    <div className="pdf-viewer">
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {pdfText && (
        <div className="pdf-text">
          {/* Render text with line breaks using dangerouslySetInnerHTML */}
          <p dangerouslySetInnerHTML={{ __html: pdfText.replace(/\n/g, '<br />') }} />
        </div>
      )}
    </div>
  );
};

export default PdfViewer;
