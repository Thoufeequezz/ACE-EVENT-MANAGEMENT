export function setupImagePreview(dropZoneId, inputId, previewImgSelector) {
  const dropZone = document.getElementById(dropZoneId);
  const fileInput = document.getElementById(inputId);
  const preview = document.querySelector(previewImgSelector);

  dropZone.addEventListener('click', () => fileInput.click());

  ['dragenter', 'dragover'].forEach(event =>
    dropZone.addEventListener(event, e => {
      e.preventDefault();
      e.stopPropagation();
      dropZone.classList.add('border-indigo-500', 'bg-gray-700');
    })
  );

  dropZone.addEventListener('dragleave', () =>
    dropZone.classList.remove('border-indigo-500', 'bg-gray-700')
  );

  dropZone.addEventListener('drop', e => {
    e.preventDefault();
    dropZone.classList.remove('border-indigo-500', 'bg-gray-700');
    const file = e.dataTransfer.files[0];
    if (file) {
      fileInput.files = e.dataTransfer.files;
      showPreview(file);
    }
  });

  fileInput.addEventListener('change', e => showPreview(e.target.files[0]));

  function showPreview(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
      preview.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}
