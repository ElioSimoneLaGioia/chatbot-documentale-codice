const oldTextArea = document.getElementById("oldCode");
const newTextArea = document.getElementById("newCode");
const contextTextArea = document.getElementById("context");
const generateBtn = document.getElementById("generateBtn");
const resultPreview = document.getElementById("resultPreview");
const dropAreas = document.querySelectorAll(".drop-area");
const clearButtons = document.querySelectorAll(".clear-btn");

function readFileContent(file, target) {
  const reader = new FileReader();
  reader.onload = (event) => {
    target.value = event.target.result;
    renderPreview();
  };
  reader.readAsText(file);
}

function getTextAreaByRole(role) {
  return role === "old" ? oldTextArea : newTextArea;
}

function handleFiles(files, role) {
  if (!files || !files.length) {
    return;
  }
  const file = files[0];
  const targetTextArea = getTextAreaByRole(role);
  readFileContent(file, targetTextArea);
}

dropAreas.forEach((area) => {
  const role = area.dataset.target;

  area.addEventListener("click", () => {
    const input = area.querySelector("input[type='file']");
    input?.click();
  });

  area.addEventListener("dragover", (event) => {
    event.preventDefault();
    area.classList.add("dragover");
  });

  area.addEventListener("dragleave", () => {
    area.classList.remove("dragover");
  });

  area.addEventListener("drop", (event) => {
    event.preventDefault();
    area.classList.remove("dragover");
    handleFiles(event.dataTransfer?.files, role);
  });

  const input = area.querySelector("input[type='file']");
  input?.addEventListener("change", (event) => {
    const files = event.target.files;
    handleFiles(files, role);
  });
});

clearButtons.forEach((button) => {
  const role = button.dataset.clear;
  button.addEventListener("click", () => {
    const textArea = getTextAreaByRole(role);
    textArea.value = "";
    renderPreview();
  });
});

[oldTextArea, newTextArea, contextTextArea].forEach((element) => {
  element.addEventListener("input", renderPreview);
});

function renderPreview() {
  const payload = {
    old_code: oldTextArea.value.trim(),
    new_code: newTextArea.value.trim(),
    context: contextTextArea.value.trim(),
  };

  if (!payload.old_code && !payload.new_code && !payload.context) {
    resultPreview.textContent =
      'Compila i campi e clicca "Genera analisi" per vedere il payload.';
    return;
  }

  resultPreview.textContent = JSON.stringify(payload, null, 2);
}

async function generateAnalysis() {
  const payload = {
    old_code: oldTextArea.value.trim(),
    new_code: newTextArea.value.trim(),
    context: contextTextArea.value.trim(),
  };

  if (!payload.old_code || !payload.new_code) {
    resultPreview.textContent =
      "Per avviare l'analisi sono richiesti sia la versione precedente sia quella nuova.";
    return;
  }

  // Esempio di chiamata verso un backend da implementare:
  // const response = await fetch('/api/analyze', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(payload),
  // });
  // const data = await response.json();
  // resultPreview.textContent = JSON.stringify(data, null, 2);

  resultPreview.textContent = JSON.stringify(payload, null, 2);
}

generateBtn.addEventListener("click", () => {
  generateAnalysis().catch((error) => {
    console.error(error);
    resultPreview.textContent =
      "Si è verificato un errore inatteso. Controlla la console per maggiori dettagli.";
  });
});
