using System;
using System.Collections.Generic;

class Program {
    // Funcția BFS care caută cel mai scurt drum într-un labirint
    static void BFS(int[,] grid, int rows, int cols, int iStart, int jStart, int iStop, int jStop) {
        // Vectori de direcție: jos, dreapta, sus, stânga
        int[] di = { 1, 0, -1, 0 };
        int[] dj = { 0, 1, 0, -1 };

        // Inițializăm coada pentru parcurgerea BFS
        Queue<(int, int)> queue = new Queue<(int, int)>();

        // Setăm poziția de start cu valoarea 1 (distanța inițială)
        grid[iStart, jStart] = 1;
        queue.Enqueue((iStart, jStart));

        while (queue.Count > 0) {
            var (i, j) = queue.Dequeue();

            // Verificăm toți cei 4 vecini
            for (int k = 0; k < 4; k++) {
                int ni = i + di[k];
                int nj = j + dj[k];

                // Dacă vecinul este în interiorul grilei și este liber (0)
                if (ni >= 0 && ni < rows && nj >= 0 && nj < cols && grid[ni, nj] == 0) {
                    // Actualizăm distanța și îl adăugăm în coadă
                    grid[ni, nj] = grid[i, j] + 1;
                    queue.Enqueue((ni, nj));

                    // Dacă am ajuns la poziția finală, oprim căutarea
                    if (ni == iStop && nj == jStop)
                        return;
                }
            }
        }
    }

    static void Main() {
        // Labirintul: 0 = liber, -1 = obstacol
        int[,] grid = {
            { 0, 0, 0, -1, -1, 0, 0, 0, -1, 0 },
            { -1, -1, 0, -1, 0, -1, 0, 0, 0, -1 },
            { -1, 0, 0, 0, 0, 0, 0, -1, -1, 0 },
            { -1, -1, -1, 0, -1, -1, -1, 0, -1, 0 },
            { -1, 0, 0, -1, -1, 0, -1, 0, 0, 0 },
            { -1, 0, 0, -1, -1, 0, 0, 0, 0, 0 }
        };

        int iStart = 0, jStart = 0; // Start
        int iStop = 1, jStop = 8;   // Destinație

        BFS(grid, 6, 10, iStart, jStart, iStop, jStop);
        Console.WriteLine(grid[iStop, jStop]); // Afișăm distanța finală
    }
}
