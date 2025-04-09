from collections import deque

# Funcția BFS care găsește drumul minim în labirint
def bfs(grid, start, stop):
    rows, cols = len(grid), len(grid[0])

    # Vectori de direcție: jos, dreapta, sus, stânga
    di = [1, 0, -1, 0]
    dj = [0, 1, 0, -1]

    queue = deque()
    iStart, jStart = start
    iStop, jStop = stop

    # Marchez poziția de start cu distanța 1
    grid[iStart][jStart] = 1
    queue.append((iStart, jStart))

    while queue:
        i, j = queue.popleft()

        # Verificăm cei 4 vecini
        for k in range(4):
            ni, nj = i + di[k], j + dj[k]

            # Verificăm dacă vecinul este valid și liber
            if 0 <= ni < rows and 0 <= nj < cols and grid[ni][nj] == 0:
                grid[ni][nj] = grid[i][j] + 1  # Actualizăm distanța
                queue.append((ni, nj))         # Adăugăm în coadă

                # Dacă am ajuns la destinație, ieșim
                if (ni, nj) == (iStop, jStop):
                    return

# Inițializare labirint: 0 = liber, -1 = obstacol
grid = [
    [0, 0, 0, -1, -1, 0, 0, 0, -1, 0],
    [-1, -1, 0, -1, 0, -1, 0, 0, 0, -1],
    [-1, 0, 0, 0, 0, 0, 0, -1, -1, 0],
    [-1, -1, -1, 0, -1, -1, -1, 0, -1, 0],
    [-1, 0, 0, -1, -1, 0, -1, 0, 0, 0],
    [-1, 0, 0, -1, -1, 0, 0, 0, 0, 0]
]

start = (0, 0)
stop = (1, 8)

bfs(grid, start, stop)
print(grid[stop[0]][stop[1]])  # Afișează distanța de la start la stop
