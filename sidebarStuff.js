const bfsBtn = document.getElementById("bfsBtn");
const dfsBtn = document.getElementById("dfsBtn");
const astarBtn = document.getElementById("astarBtn");

const algInfoText = document.getElementById("algInfoText");
const mainTitle = document.getElementById("mainTitle");

const AlgInfo = Object.freeze({
    BFS: "BFS explorează matricea pe niveluri, adică verifică toți vecinii unui nod înainte de a merge mai departe. Este implementat cu o coadă și garantează găsirea celui mai scurt drum (în pași egali), dar poate fi lent dacă matricea e mare.",
    DFS: "DFS merge cât mai adânc pe o ramură înainte să revină și să încerce alte căi. Se implementează cu o stivă (sau recursiv). Nu garantează cel mai scurt drum și poate rata soluția optimă.",
    ASTAR: "A* folosește o funcție de cost (f = g + h), unde g este costul de la start și h este o estimare până la țintă (euristică, ex: distanță Manhattan). Este rapid și găsește drumul optim dacă euristica este admisibilă.",
});

const AlgMainTitle = Object.freeze({
    BFS: "Breadth First Search (BFS)",
    DFS: "Depth First Search (DFS)",
    ASTAR: "A* (A-Star)",
});

let selectedButton = bfsBtn;

bfsBtn.addEventListener("click", function () {
    clearPath();
    SetMainTitleTo(AlgMainTitle.BFS);
    selectedButton.classList.remove("selected-alg-btn");
    this.classList.add("selected-alg-btn");
    selectedButton = this;
    setAlgInfoText(AlgInfo.BFS);
    currentAlgorithm = SearchAlgorithms.BFS;
    currentAlgorithmTitle = SearchAlgorithmsTitle.BFS;
});
dfsBtn.addEventListener("click", function () {
    clearPath();
    SetMainTitleTo(AlgMainTitle.DFS);
    selectedButton.classList.remove("selected-alg-btn");
    this.classList.add("selected-alg-btn");
    selectedButton = this;
    setAlgInfoText(AlgInfo.DFS);
    currentAlgorithm = SearchAlgorithms.DFS;
    currentAlgorithmTitle = SearchAlgorithmsTitle.DFS;
});
astarBtn.addEventListener("click", function () {
    clearPath();
    SetMainTitleTo(AlgMainTitle.ASTAR);
    selectedButton.classList.remove("selected-alg-btn");
    this.classList.add("selected-alg-btn");
    selectedButton = this;
    setAlgInfoText(AlgInfo.ASTAR);
    currentAlgorithm = SearchAlgorithms.ASTAR;
    currentAlgorithmTitle = SearchAlgorithmsTitle.ASTAR;
});

setAlgInfoText(AlgInfo.BFS);

function setAlgInfoText(alg) {
    algInfoText.textContent = alg;
}

SetMainTitleTo(AlgMainTitle.BFS);

function SetMainTitleTo(alg) {
    mainTitle.textContent = "Algoritm de tip " + alg;
}
