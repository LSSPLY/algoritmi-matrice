const codeHolderBg = document.getElementById("codeHolderBg");

const codeTextHolder = document.getElementById("code").firstChild;

const cppButton = document.getElementById("cpp");
const csharpButton = document.getElementById("csharp");
const javaButton = document.getElementById("java");
const pythonButton = document.getElementById("python");

const copyButton = document.getElementById("copy");
const downloadButton = document.getElementById("download");
const exitButton = document.getElementById("exit");

const copiedMsg = document.getElementById("copiedMsg");

const codeTitle = document.getElementById("codeTitle");

const ProgrammingLanguages = Object.freeze({
  CPP: "cpp",
  CSHARP: "csharp",
  JAVA: "java",
  PYTHON: "python",
});
const ProgrammingLanguagesFileExtensions = Object.freeze({
  CPP: "cpp",
  CSHARP: "cs",
  JAVA: "java",
  PYTHON: "py",
});
const ProgrammingLanguagesTitles = Object.freeze({
  CPP: "C++",
  CSHARP: "C#",
  JAVA: "Java",
  PYTHON: "Python",
});

const SearchAlgorithms = Object.freeze({
  BFS: "bfs",
  DFS: "dfs",
  ASTAR: "astar",
});
const SearchAlgorithmsTitle = Object.freeze({
  BFS: "Căutare Breadth First",
  DFS: "Căutare Depth First",
  ASTAR: "Căutare A*",
});

let currentAlgorithm = SearchAlgorithms.BFS;
let currentLanguage = ProgrammingLanguages.CPP;
let currentLanguageFileExtension = ProgrammingLanguagesFileExtensions.CPP;

let currentAlgorithmTitle = SearchAlgorithmsTitle.BFS;
let currentLanguageTitle = ProgrammingLanguagesTitles.CPP;

cppButton.addEventListener("click", function () {
  currentLanguage = ProgrammingLanguages.CPP;
  currentLanguageFileExtension = ProgrammingLanguagesFileExtensions.CPP;
  setCodeText(ProgrammingLanguages.CPP, currentAlgorithm);

  currentLanguageTitle = ProgrammingLanguagesTitles.CPP;

  displayCode();
});
csharpButton.addEventListener("click", function () {
  currentLanguage = ProgrammingLanguages.CSHARP;
  currentLanguageFileExtension = ProgrammingLanguagesFileExtensions.CSHARP;
  setCodeText(ProgrammingLanguages.CSHARP, currentAlgorithm);

  currentLanguageTitle = ProgrammingLanguagesTitles.CSHARP;

  displayCode();
});
javaButton.addEventListener("click", function () {
  currentLanguage = ProgrammingLanguages.JAVA;
  currentLanguageFileExtension = ProgrammingLanguagesFileExtensions.JAVA;
  setCodeText(ProgrammingLanguages.JAVA, currentAlgorithm);

  currentLanguageTitle = ProgrammingLanguagesTitles.JAVA;

  displayCode();
});
pythonButton.addEventListener("click", function () {
  currentLanguage = ProgrammingLanguages.PYTHON;
  currentLanguageFileExtension = ProgrammingLanguagesFileExtensions.PYTHON;
  setCodeText(ProgrammingLanguages.PYTHON, currentAlgorithm);

  currentLanguageTitle = ProgrammingLanguagesTitles.PYTHON;

  displayCode();
});

copyButton.addEventListener("click", function () {
  copiedMsg.style.display = "flex";
  copyCodeText(currentLanguage, currentLanguageFileExtension, currentAlgorithm);
});
downloadButton.addEventListener("click", function () {
  downloadCodeText(
    currentLanguage,
    currentLanguageFileExtension,
    currentAlgorithm
  );
});
exitButton.addEventListener("click", function () {
  copiedMsg.style.display = "none";
  hideCode();
});

function displayCode() {
  codeHolderBg.classList.remove("codeHolderBgHidden");
  codeHolderBg.classList.add("codeHolderBgVisible");

  codeTitle.textContent = currentAlgorithmTitle + " - " + currentLanguageTitle;
}
function hideCode() {
  codeHolderBg.classList.remove("codeHolderBgVisible");
  codeHolderBg.classList.add("codeHolderBgHidden");
}

function setCodeText(language, algorithm) {
  fetch("./algorithms-encoded/" + language + "/" + algorithm + ".txt")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch file");
      }
      return response.text();
    })
    .then((data) => {
      const parser = new DOMParser();
      const decodedData = parser.parseFromString(data, "text/html")
        .documentElement.textContent;

      codeTextHolder.textContent = decodedData;

      codeTextHolder.classList.remove(
        "language-cpp",
        "language-csharp",
        "language-java",
        "language-python"
      );
      codeTextHolder.classList.add("language-" + language);
      Prism.highlightAll();
    })
    .catch((error) => {
      console.error("Error fetching the file:", error);
      codeTextHolder.textContent =
        "Nu s-a putut incarca textul. Da refresh poate merge!";
    });
}

function copyCodeText(language, langShort, algorithm) {
  fetch("./algorithms/" + language + "/" + algorithm + "." + langShort)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch file");
      }
      return response.text();
    })
    .then((data) => {
      navigator.clipboard.writeText(data);
    })
    .catch((error) => {
      console.error("Error fetching file:", error);
    });
}

function downloadCodeText(language, langShort, algorithm) {
  fetch("./algorithms/" + language + "/" + algorithm + "." + langShort)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch file");
      }
      return response.blob();
    })
    .then((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = algorithm + "." + langShort;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    })
    .catch((error) => {
      console.error("Error downloading file:", error);
    });
}
