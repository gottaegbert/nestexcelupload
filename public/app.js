async function uploadFiles() {
  const input = document.getElementById('fileInput');
  if (!input.files.length) {
    alert('Please select at least one file to upload.');
    return;
  }

  const formData = new FormData();
  for (const file of input.files) {
    formData.append('files', file);
  }

  try {
    const response = await fetch('/file-upload/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`);
    }

    const result = await response.json();
    console.log('Files uploaded successfully:', result);
    alert('Files uploaded successfully!');
    const displayArea = document.getElementById('excelData');
    displayArea.innerHTML = `<pre>${JSON.stringify(result, null, 2)}</pre>`;

    alert('Files uploaded successfully!');
  } catch (err) {
    console.error('Error uploading files:', err);
    alert('Error uploading files. See console for more information.');
  }
}
