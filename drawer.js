function setToStart(cell) {
    if (startCell) {
        grid[startCell[0]][startCell[1]].classList.remove("start");
    }
    startCell = getCoordinates(cell);
    cell.classList.add("start");
    cell.appendChild(startIcon);
}

function setToEnd(cell) {
    if (endCell) {
        grid[endCell[0]][endCell[1]].classList.remove("end");
    }
    endCell = getCoordinates(cell);
    cell.classList.add("end");
    cell.appendChild(endIcon);
}

function setToWall(cell) {
    if (cell.classList.contains("visited")) {
        cell.classList.remove("visited");
        cell.firstChild.classList.remove("visited");
        cell.firstChild.firstChild.setAttribute("fill", wallColor);
    }
    if (cell.classList.contains("path")) {
        cell.classList.remove("path");
        cell.firstChild.classList.remove("path");
        cell.firstChild.firstChild.setAttribute("fill", wallColor);
    }
    cell.classList.add("wall");
    cell.firstChild.classList.add("wall");
}

function eraseValue(cell) {
    if (cell.classList.contains("start")) {
        cell.classList.remove("start");
        hider.appendChild(cell.children[1]);
        startCell = null;
    }
    if (cell.classList.contains("end")) {
        cell.classList.remove("end");
        hider.appendChild(cell.children[1]);
        endCell = null;
    }
    if (cell.classList.contains("visited")) {
        cell.classList.remove("visited");
        cell.firstChild.classList.remove("visited");
        cell.firstChild.firstChild.setAttribute("fill", wallColor);
    }
    if (cell.classList.contains("path")) {
        cell.classList.remove("path");
        cell.firstChild.classList.remove("path");
        cell.firstChild.firstChild.setAttribute("fill", wallColor);
    }
    if (cell.classList.contains("wall")) {
        cell.classList.remove("wall");
        cell.firstChild.classList.remove("wall");
    }
}

function clearPath() {
    if (!isPathDisplayed) return;

    isPathDisplayed = false;
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            grid[r][c].classList.remove("visited");
            grid[r][c].firstChild.classList.remove("visited");
            grid[r][c].firstChild.classList.remove("path");
            grid[r][c].classList.remove("path");
            grid[r][c].firstChild.firstChild.setAttribute("fill", wallColor);
            hideDialogue();
        }
    }
}
