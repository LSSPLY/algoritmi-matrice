async function bfs(start, end) {
    isPathDisplayed = true;
    let steps = 1;

    const queue = [start];
    const parentMap = new Map();

    start.classList.add("visited");
    start.firstChild.firstChild.setAttribute("fill", visitedColor);
    start.firstChild.classList.add("visited");

    while (queue.length > 0) {
        const current = queue.shift();

        await sleep(3);

        for (const neighbor of getNeighbors(current)) {
            if (
                !neighbor.classList.contains("visited") &&
                !neighbor.classList.contains("wall")
            ) {
                steps++;
                neighbor.firstChild.firstChild.setAttribute(
                    "fill",
                    visitedColor
                );
                neighbor.firstChild.classList.add("visited");
                neighbor.classList.add("visited");
                queue.push(neighbor);
                parentMap.set(neighbor, current);
                if (neighbor === end) {
                    await sleep(500);
                    reconstructPath(parentMap, end, steps);
                    return;
                }
            }
        }
    }
    await sleep(500);
    setToNoPath();
    displayWarning(steps);
}

function getNeighbors(cell) {
    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);
    const neighbors = [];

    const directions = [
        [0, 1], // Right
        [1, 0], // Down
        [0, -1], // Left
        [-1, 0], // Up
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
