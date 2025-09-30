const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('image');
const preview = document.getElementById('imagePreview');

dropZone.addEventListener('click', () => fileInput.click());

// Highlight when a file is dragged over
['dragenter', 'dragover'].forEach(event =>
  dropZone.addEventListener(event, e => {
    e.preventDefault();
    e.stopPropagation();
    dropZone.classList.add('border-indigo-500', 'bg-gray-700');
  })
);

dropZone.addEventListener('dragover', e => {
  e.preventDefault();
  dropZone.classList.add('bg-white/20');
});
dropZone.addEventListener('dragleave', () => dropZone.classList.remove('bg-white/20'));
dropZone.addEventListener('drop', e => {
  e.preventDefault();
  dropZone.classList.remove('bg-white/20');
  const file = e.dataTransfer.files[0];
  if (file) {
    fileInput.files = e.dataTransfer.files; // attach to form
    showPreview(file);
  }
});
fileInput.addEventListener('change', e => showPreview(e.target.files[0]));

function showPreview(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    preview.innerHTML = `<img src="${e.target.result}" class="max-h-48 rounded-xl border border-white/20 shadow-md mt-2" />`;
  };
  reader.readAsDataURL(file);
}

