async function generateMaze() {
    function getParent(x) {
        if (parent[x] !== x) return (parent[x] = getParent(parent[x]));
        return x;
    }

    if (startCell) {
        eraseValue(grid[startCell[0]][startCell[1]]);
    }
    if (endCell) {
        eraseValue(grid[endCell[0]][endCell[1]]);
    }

    setAllWalls();

    let parent = [0],
        card = [0];
    for (let i = 0; i < SMALLROWS; i++) {
        for (let j = 0; j < SMALLCOLS; j++) {
            parent.push(i * SMALLROWS + j + 1);
            card.push(1);
        }
    }

    const pairs = [];
    for (let i = 0; i < SMALLROWS - 1; i++) {
        for (let j = 1; j < SMALLCOLS; j++) {
            let k = i * SMALLROWS + j;
            pairs.push([k, k + 1]);
            pairs.push([k, k + SMALLCOLS]);
        }
        let k = i * SMALLROWS + SMALLCOLS;
        pairs.push([k, k + SMALLCOLS]);
    }
    for (let i = 1; i < SMALLCOLS; i++) {
        let k = (SMALLROWS - 1) * SMALLROWS + i;
        pairs.push([k, k + 1]);
    }
    for (let i = pairs.length - 1; i >= 0; i--) {
        let j = Math.floor(Math.random() * pairs.length);
        [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
    }

    await sleep(30 * (20 + Math.sqrt(ROWS * ROWS, COLS * COLS)));
    for (let i = 0; i < pairs.length; i++) {
        let cell1 = pairs[i][0];
        let cell2 = pairs[i][1];
        if (getParent(cell1) !== getParent(cell2)) {
            let root1 = getParent(cell1);
            let root2 = getParent(cell2);
            if (card[root1] < card[root2]) {
                parent[root1] = root2;
                card[root2] += card[root1];
            } else {
                parent[root2] = root1;
                card[root1] += card[root2];
            }

            await sleep(20);

            let r, c;
            if (
                Math.floor((cell1 + SMALLROWS - 1) / SMALLROWS) ===
                Math.floor((cell2 + SMALLROWS - 1) / SMALLROWS)
            ) {
                r = Math.floor((cell1 + SMALLROWS - 1) / SMALLROWS) * 2 - 1;
                c = (cell1 % SMALLCOLS) * 2;
            } else {
                r = Math.floor((cell1 + SMALLROWS - 1) / SMALLROWS) * 2;
                if (cell1 % SMALLCOLS == 0) {
                    c = SMALLCOLS * 2 - 1;
                } else {
                    c = (cell1 % SMALLCOLS) * 2 - 1;
                }
            }
            eraseValue(grid[r][c]);
        }
    }
}

function setAllWalls() {
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            setTimeout(function () {
                setToWall(grid[r][c]);
            }, 10 * Math.sqrt(r * r + c * c));
        }
    }
    for (let r = 1; r < ROWS; r += 2) {
        for (let c = 1; c < COLS; c += 2) {
            setTimeout(function () {
                eraseValue(grid[r][c]);
            }, 20 *
                (30 +
                    Math.sqrt(ROWS * ROWS, COLS * COLS) +
                    Math.sqrt((ROWS - r) * (ROWS - r) + (COLS - c) * (COLS - c))));
        }
    }
}
