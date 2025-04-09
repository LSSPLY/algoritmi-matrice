const gridElement = document.getElementById("grid");
const hider = document.getElementById("hider");

const startIcon = document.getElementById("startIcon");
const endIcon = document.getElementById("endIcon");

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

const ROWS = 21;
const COLS = 21;
const SMALLROWS = (ROWS - 1) / 2;
const SMALLCOLS = (COLS - 1) / 2;
let grid = [];
let startCell = null;
let endCell = null;

let isPathDisplayed = false;

const wallColor = "#44444a";
const visitedColor = "#488be8";
const pathColor = "#d9d516";
const noPathColor = "#db2f23";

for (let r = 0; r < ROWS; r++) {
    let row = [];
    for (let c = 0; c < COLS; c++) {
        const cellFill = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        cellFill.classList.add("cellFill");
        cellFill.setAttribute("width", "20");
        cellFill.setAttribute("height", "20");
        cellFill.setAttribute("viewBox", "0 0 20 20");
        cellFill.setAttribute("fill", "none");
        cellFill.setAttributeNS(
            "http://www.w3.org/2000/xmlns/",
            "xmlns:xlink",
            "http://www.w3.org/1999/xlink"
        );

        const cellFillRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        cellFillRect.setAttribute("width", "20");
        cellFillRect.setAttribute("height", "20");
        cellFillRect.setAttribute("fill", wallColor);

        cellFill.appendChild(cellFillRect);

        const cell = document.createElement("div");
        cell.appendChild(cellFill);

        cell.classList.add("cell");
        cell.dataset.row = r;
        cell.dataset.col = c;

        cell.addEventListener("click", function () {
            performCellAction(this);
        });

        cell.addEventListener("mousedown", () => {
            isMouseDown = true;
        });
        cell.addEventListener("mousemove", function () {
            if (isMouseDown) performCellAction(this);
        });

        gridElement.appendChild(cell);
        row.push(cell);
    }
    grid.push(row);
}

document.addEventListener("mouseup", () => {
    isMouseDown = false;
});

function getCoordinates(cell) {
    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);

    return [row, col];
}

async function reconstructPath(parentMap, end, steps) {
    let dist = 2;
    animatePathCell(end);
    await sleep(20);
    let current = parentMap.get(end);
    animatePathCell(current);
    while (parentMap.has(current)) {
        await sleep(20);
        dist++;
        current = parentMap.get(current);
        animatePathCell(current);
    }
    displayInfo(dist, steps);
}
