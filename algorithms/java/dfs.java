public class dfs {
    // Funcția DFS pentru a găsi cel mai scurt drum într-un labirint
    public static void dfs(int[][] matrice, int iDim, int jDim, int iPoz, int jPoz, int iStop, int jStop) {
        // Dacă am ajuns la destinație, oprim căutarea
        if (iPoz == iStop && jPoz == jStop)
            return;

        // Vectori de direcție: jos, dreapta, sus, stânga
        int[] di = {1, 0, -1, 0};
        int[] dj = {0, 1, 0, -1};

        // Verificăm fiecare dintre cei 4 vecini
        for (int k = 0; k < 4; k++) {
            int iVecin = iPoz + di[k];
            int jVecin = jPoz + dj[k];

            // Dacă vecinul este în interiorul grilei și este liber (0)
            if (iVecin >= 0 && iVecin < iDim && jVecin >= 0 && jVecin < jDim && matrice[iVecin][jVecin] == 0) {
                matrice[iVecin][jVecin] = matrice[iPoz][jPoz] + 1;  // Incrementăm distanța
                // Procesăm vecinul
                dfs(matrice, iDim, jDim, iVecin, jVecin, iStop, jStop);
            }
        }
    }

    public static void main(String[] args) {
        // Reprezentarea labirintului: 0 = liber, -1 = obstacol
        int[][] matrice = {
            { 0,  0,  0, -1, -1,  0,  0,  0, -1,  0},
            {-1, -1,  0, -1,  0, -1,  0,  0,  0, -1},
            {-1,  0,  0,  0,  0,  0,  0, -1, -1,  0},
            {-1, -1, -1,  0, -1, -1, -1,  0, -1,  0},
            {-1,  0,  0, -1, -1,  0, -1,  0,  0,  0},
            {-1,  0,  0, -1, -1,  0,  0,  0,  0,  0}
        };

        int iStart = 0, jStart = 0; // Coordonatele de start
        int iStop = 1, jStop = 8;   // Coordonatele de destinație

        matrice[iStart][jStart] = 1; // Marcăm poziția de start cu distanța 1
        dfs(matrice, 6, 10, iStart, jStart, iStop, jStop);

        // Afișăm distanța până la destinație (sau mesaj dacă nu se poate ajunge)
        if (matrice[iStop][jStop] > 0)
            System.out.println("Distanța până la destinație: " + (matrice[iStop][jStop]));
        else
            System.out.println("Destinația nu poate fi atinsă.");
    }
}
