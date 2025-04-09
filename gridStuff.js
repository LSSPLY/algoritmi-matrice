const cellAnim1 = [{ transform: "scale(1)" }, { transform: "scale(1.2)" }];
const cellAnim2 = [{ transform: "scale(1.2)" }, { transform: "scale(1)" }];

const cellAnimTime = {
    duration: 250,
    iterations: 1,
};

async function animateInvalidCell(cell) {
    cell.animate(cellAnim1, cellAnimTime);
    await sleep(250);
    cell.firstChild.firstChild.setAttribute("fill", noPathColor);
    cell.animate(cellAnim2, cellAnimTime);
}

async function animatePathCell(cell) {
    cell.animate(cellAnim1, cellAnimTime);
    await sleep(250);
    cell.classList.remove("visited");
    cell.firstChild.classList.remove("visited");
    cell.firstChild.firstChild.setAttribute("fill", pathColor);
    cell.firstChild.classList.add("path");
    cell.classList.add("path");
    cell.animate(cellAnim2, cellAnimTime);
}

async function setToNoPath() {
    for (let i = ROWS - 1; i >= 0; i--) {
        let r = i;
        let c = 0;
        while (r < ROWS && c < COLS) {
            if (grid[r][c].classList.contains("visited")) animateInvalidCell(grid[r][c]);
            r++;
            c++;
        }
        await sleep(20);
    }
    for (let i = 1; i < COLS; i++) {
        let r = 0;
        let c = i;
        while (r < ROWS && c < COLS) {
            if (grid[r][c].classList.contains("visited")) animateInvalidCell(grid[r][c]);
            r++;
            c++;
        }
        await sleep(20);
    }
}
