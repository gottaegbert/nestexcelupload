// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

    const transformedData = transformData(result);
    const displayArea = document.getElementById('excelData');
    const formattedData = JSON.stringify(transformedData, null, 2);
    displayArea.innerHTML = `<pre>${formattedData}</pre>`;
  } catch (err) {
    console.error('Error uploading files:', err);
    alert('Error uploading files. See console for more information.');
  }
}

function transformData(receivedData) {
  return receivedData[0].map((item) => ({
    title: item['主标题'],
    subTitle: item['副标题'],
    list: item['列表标题']
      .split('\r\n')
      .filter((title) => title)
      .map((title, index) => ({
        title: title,
        content: item['列表内容'].split('\r\n')[index].trim(),
      })),
  }));
}
