import React from 'react';

const FileUploader = ({ onFileSelect }) => {
  const handleFileInput = (e) => {
    const file = e.target.files[0];
    onFileSelect(file);
  };

  return (
    <div>
      <input type="file" onChange={handleFileInput} />
    </div>
  );
};

export default FileUploader;
