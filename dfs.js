async function dfsRecursive(current, end, parentMap, steps) {
    current.classList.add("visited");
    current.firstChild.firstChild.setAttribute("fill", visitedColor);
    current.firstChild.classList.add("visited");

    if (steps > 1) {
        let minDist = Infinity;
        let minCell = null;
        for (const neighbor of getNeighbors(current)) {
            if (
                neighbor.classList.contains("visited") &&
                distToNode[neighbor.dataset.row][neighbor.dataset.col] < minDist
            ) {
                minDist =
                    distToNode[neighbor.dataset.row][neighbor.dataset.col];
                minCell = neighbor;
            }
        }
        parentMap.set(current, minCell);
    }

    await sleep(3);

    if (current === end) {
        await sleep(500);
        reconstructPath(parentMap, end, steps);
        return true;
    }

    for (const neighbor of getNeighbors(current)) {
        if (
            !neighbor.classList.contains("visited") &&
            !neighbor.classList.contains("wall")
        ) {
            steps++;
            distToNode[neighbor.dataset.row][neighbor.dataset.col] = steps;
            const found = await dfsRecursive(neighbor, end, parentMap, steps);
            if (found) return true;
        }
    }

    return false;
}

let distToNode = [];

async function dfs(start, end) {
    isPathDisplayed = true;
    const parentMap = new Map();
    for (let i = 0; i < ROWS; i++) {
        let row = [];
        for (let j = 0; j < COLS; j++) {
            row.push(Infinity);
        }
        distToNode.push(row);
    }
    distToNode[start.dataset.row][start.dataset.col] = 1;
    const steps = 1;

    const found = await dfsRecursive(start, end, parentMap, steps);

    if (!found) {
        await sleep(500);
        setToNoPath();
        displayWarning(steps);
    }
}

function getNeighbors(cell) {
    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);
    const neighbors = [];

    const directions = [
        [1, 0], // Down
        [0, 1], // Right
        [-1, 0], // Up
        [0, -1], // Left
    ];

    for (const [dr, dc] of directions) {
        const newRow = row + dr;
        const newCol = col + dc;
        if (newRow >= 0 && newRow < ROWS && newCol >= 0 && newCol < COLS) {
            neighbors.push(grid[newRow][newCol]);
        }
    }

    return neighbors;
}
