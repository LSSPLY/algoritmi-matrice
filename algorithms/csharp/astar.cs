using System;
using System.Collections.Generic;

class Program {
    // Calculează distanța Manhattan dintre două puncte
    static int DistantaManhattan(int iPoz, int jPoz, int iStop, int jStop) {
        return Math.Abs(iPoz - iStop) + Math.Abs(jPoz - jStop);
    }

    // Funcția ASTAR pentru a găsi cel mai scurt drum într-un labirint
    static void AStar(int[,] matrice, int iStart, int jStart, int iStop, int jStop) {
        // Vectori de direcție: jos, dreapta, sus, stânga
        int[] di = { 1, 0, -1, 0 };
        int[] dj = { 0, 1, 0, -1 };

        var openSet = new PriorityQueue<(int i, int j), int>(); // Coada de priorități pentru parcurgerea pozițiilor
        int rows = matrice.GetLength(0);
        int cols = matrice.GetLength(1);
        int[,] gScore = new int[rows, cols];
        int[,] fScore = new int[rows, cols];

        matrice[iStart, jStart] = 1;  // Marcăm poziția de start cu distanța 1
        gScore[iStart, jStart] = 0;
        fScore[iStart, jStart] = DistantaManhattan(iStart, jStart, iStop, jStop);
        openSet.Enqueue((iStart, jStart), fScore[iStart, jStart]);

        while (openSet.Count > 0) {
            var (iPoz, jPoz) = openSet.Dequeue();

            // Verificăm fiecare dintre cei 4 vecini
            for (int k = 0; k < 4; k++) {
                int iVecin = iPoz + di[k];
                int jVecin = jPoz + dj[k];

                // Dacă vecinul este în interiorul grilei și este liber (0)
                if (iVecin >= 0 && iVecin < rows && jVecin >= 0 && jVecin < cols && matrice[iVecin, jVecin] == 0) {
                    matrice[iVecin, jVecin] = matrice[iPoz, jPoz] + 1;  // Incrementăm distanța

                    // Adăugăm vecinul în coadă pentru procesare ulterioară
                    openSet.Enqueue((iVecin, jVecin), DistantaManhattan(iVecin, jVecin, iStop, jStop));

                    // Dacă am ajuns la destinație, putem opri căutarea
                    if (iVecin == iStop && jVecin == jStop)
                        return;
                }
            }
        }
    }

    static void Main() {
        // Reprezentarea labirintului: 0 = liber, -1 = obstacol
        int[,] matrice = {
            { 0,  0,  0, -1, -1,  0,  0,  0, -1,  0},
            {-1, -1,  0, -1,  0, -1,  0,  0,  0, -1},
            {-1,  0,  0,  0,  0,  0,  0, -1, -1,  0},
            {-1, -1, -1,  0, -1, -1, -1,  0, -1,  0},
            {-1,  0,  0, -1, -1,  0, -1,  0,  0,  0},
            {-1,  0,  0, -1, -1,  0,  0,  0,  0,  0}
        };

        int iStart = 0, jStart = 0; // Coordonatele de start
        int iStop = 1, jStop = 8;   // Coordonatele de destinație

        AStar(matrice, iStart, jStart, iStop, jStop);

        // Afișăm distanța până la destinație (sau valoare implicită dacă nu s-a ajuns)
        Console.WriteLine(matrice[iStop, jStop]);
    }
}
