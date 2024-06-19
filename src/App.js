// App.js

import React, { useState } from 'react';
import PdfViewer from './PdfViewer';
import './App.css'; // Assuming you have a CSS file for styling

const App = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js';

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setPdfFile(file);
  };

  return (
    <div className="App">
      <h1>PDF OCR Viewer</h1>
      <input type="file" onChange={handleFileSelect} />
      {pdfFile && <PdfViewer pdfFile={pdfFile} workerSrc={workerSrc} />}
    </div>
  );
};

export default App;
