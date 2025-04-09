using System;

class Program
{
    // Funcția DFS pentru a găsi cel mai scurt drum într-un labirint
    static void DFS(int[,] matrice, int iDim, int jDim, int iPoz, int jPoz, int iStop, int jStop)
    {
        // Dacă am ajuns la destinație, oprim recursivitatea
        if (iPoz == iStop && jPoz == jStop)
            return;

        // Vectori de direcție: jos, dreapta, sus, stânga
        int[] di = { 1, 0, -1, 0 };
        int[] dj = { 0, 1, 0, -1 };

        // Verificăm fiecare dintre cei 4 vecini
        for (int k = 0; k < 4; k++)
        {
            int iVecin = iPoz + di[k];
            int jVecin = jPoz + dj[k];

            // Dacă vecinul este în interiorul grilei și este liber (0)
            if (iVecin >= 0 && iVecin < iDim && jVecin >= 0 && jVecin < jDim && matrice[iVecin, jVecin] == 0)
            {
                matrice[iVecin, jVecin] = matrice[iPoz, jPoz] + 1;  // Incrementăm distanța
                // Procesăm vecinul
                DFS(matrice, iDim, jDim, iVecin, jVecin, iStop, jStop);
            }
        }
    }

    static void Main()
    {
        // Reprezentarea labirintului: 0 = liber, -1 = obstacol
        int[,] matrice = new int[6, 10]
        {
            { 0,  0,  0, -1, -1,  0,  0,  0, -1,  0},
            {-1, -1,  0, -1,  0, -1,  0,  0,  0, -1},
            {-1,  0,  0,  0,  0,  0,  0, -1, -1,  0},
            {-1, -1, -1,  0, -1, -1, -1,  0, -1,  0},
            {-1,  0,  0, -1, -1,  0, -1,  0,  0,  0},
            {-1,  0,  0, -1, -1,  0,  0,  0,  0,  0}
        };

        int iStart = 0, jStart = 0; // Coordonatele de start
        int iStop = 1, jStop = 8;   // Coordonatele de destinație

        matrice[iStart, jStart] = 1;  // Marcăm poziția de start cu distanța 1
        DFS(matrice, 6, 10, iStart, jStart, iStop, jStop);

        // Afișăm distanța până la destinație (sau valoare implicită dacă nu s-a ajuns)
        if (matrice[iStop, jStop] > 0)
            Console.WriteLine("Distanța până la destinație: " + (matrice[iStop, jStop]));
        else
            Console.WriteLine("Destinația nu poate fi atinsă.");
    }
}
