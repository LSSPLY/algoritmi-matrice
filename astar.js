async function astar(start, end) {
    isPathDisplayed = true;
    let steps = 1;

    const openSet = new Set([start]);
    const parentMap = new Map();
    const gScore = new Map();
    const fScore = new Map();

    gScore.set(start, 0);
    fScore.set(start, heuristic(start, end));

    start.classList.add("visited");
    start.firstChild.firstChild.setAttribute("fill", visitedColor);
    start.firstChild.classList.add("visited");

    while (openSet.size > 0) {
        let current = getLowestFScoreNode(openSet, fScore);

        if (current === end) {
            await sleep(500);
            reconstructPath(parentMap, end, steps);
            return;
        }

        openSet.delete(current);

        await sleep(3);

        for (const neighbor of getNeighbors(current)) {
            if (neighbor.classList.contains("wall")) continue;

            const tentativeGScore = gScore.get(current) + 1;

            if (
                !gScore.has(neighbor) ||
                tentativeGScore < gScore.get(neighbor)
            ) {
                parentMap.set(neighbor, current);
                gScore.set(neighbor, tentativeGScore);
                fScore.set(
                    neighbor,
                    tentativeGScore + heuristic(neighbor, end)
                );

                if (!openSet.has(neighbor)) {
                    openSet.add(neighbor);
                    neighbor.firstChild.firstChild.setAttribute(
                        "fill",
                        visitedColor
                    );
                    neighbor.firstChild.classList.add("visited");
                    neighbor.classList.add("visited");
                    steps++;
                }
            }
        }
    }

    await sleep(500);
    setToNoPath();
    displayWarning(steps);
}

function heuristic(node, end) {
    const nodeRow = parseInt(node.dataset.row);
    const nodeCol = parseInt(node.dataset.col);
    const endRow = parseInt(end.dataset.row);
    const endCol = parseInt(end.dataset.col);

    return Math.abs(nodeRow - endRow) + Math.abs(nodeCol - endCol);
}

function getLowestFScoreNode(openSet, fScore) {
    let lowestNode = null;
    let lowestFScore = Infinity;

    for (const node of openSet) {
        const score = fScore.get(node) || Infinity;
        if (score < lowestFScore) {
            lowestFScore = score;
            lowestNode = node;
        }
    }

    return lowestNode;
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
