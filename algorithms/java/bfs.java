import java.util.*;

public class bfs {
    // BFS pentru găsirea drumului minim într-un labirint
    public static void bfs(int[][] grid, int rows, int cols, int iStart, int jStart, int iStop, int jStop) {
        int[] di = {1, 0, -1, 0}; // jos, dreapta, sus, stânga
        int[] dj = {0, 1, 0, -1};

        Queue<int[]> queue = new LinkedList<>();
        grid[iStart][jStart] = 1; // Setăm poziția de start cu valoare 1
        queue.add(new int[]{iStart, jStart});

        while (!queue.isEmpty()) {
            int[] pos = queue.poll();
            int i = pos[0], j = pos[1];

            // Verificăm toți vecinii
            for (int k = 0; k < 4; k++) {
                int ni = i + di[k];
                int nj = j + dj[k];

                // Verificăm dacă vecinul este valid și liber
                if (ni >= 0 && ni < rows && nj >= 0 && nj < cols && grid[ni][nj] == 0) {
                    grid[ni][nj] = grid[i][j] + 1; // Incrementez distanța
                    queue.add(new int[]{ni, nj}); // Adaug vecinul în coadă

                    // Dacă am ajuns la destinație, oprim parcurgerea
                    if (ni == iStop && nj == jStop)
                        return;
                }
            }
        }
    }

    public static void main(String[] args) {
        // Labirintul: 0 = liber, -1 = obstacol
        int[][] grid = {
            { 0, 0, 0, -1, -1, 0, 0, 0, -1, 0 },
            { -1, -1, 0, -1, 0, -1, 0, 0, 0, -1 },
            { -1, 0, 0, 0, 0, 0, 0, -1, -1, 0 },
            { -1, -1, -1, 0, -1, -1, -1, 0, -1, 0 },
            { -1, 0, 0, -1, -1, 0, -1, 0, 0, 0 },
            { -1, 0, 0, -1, -1, 0, 0, 0, 0, 0 }
        };

        int iStart = 0, jStart = 0; // Coordonatele de pornire
        int iStop = 1, jStop = 8;   // Destinația

        bfs(grid, 6, 10, iStart, jStart, iStop, jStop);

        // Afișează distanța de la start la stop
        System.out.println(grid[iStop][jStop]);
    }
}
