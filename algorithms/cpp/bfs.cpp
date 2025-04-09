#include <iostream>
#include <queue>
using namespace std;

// Funcția BFS pentru a găsi cel mai scurt drum într-un labirint
void bfs(int matrice[][10], int iDim, int jDim, int iStart, int jStart, int iStop, int jStop) {
    // Vectori de direcție: jos, dreapta, sus, stânga
    int di[4] = {1, 0, -1, 0};
    int dj[4] = {0, 1, 0, -1};

    queue<pair<int, int>> coada; // Coada BFS pentru parcurgerea pozițiilor

    matrice[iStart][jStart] = 1;  // Marcăm poziția de start cu distanța 1
    coada.push(make_pair(iStart, jStart));

    while (!coada.empty()) {
        int iPoz = coada.front().first;
        int jPoz = coada.front().second;
        coada.pop();

        // Verificăm fiecare dintre cei 4 vecini
        for (int k = 0; k < 4; k++) {
            int iVecin = iPoz + di[k];
            int jVecin = jPoz + dj[k];

            // Dacă vecinul este în interiorul grilei și este liber (0)
            if (iVecin >= 0 && iVecin < iDim && jVecin >= 0 && jVecin < jDim && matrice[iVecin][jVecin] == 0) {
                matrice[iVecin][jVecin] = matrice[iPoz][jPoz] + 1;  // Incrementăm distanța

                // Adăugăm vecinul în coadă pentru procesare ulterioară
                coada.push(make_pair(iVecin, jVecin));

                // Dacă am ajuns la destinație, putem opri căutarea
                if (iVecin == iStop && jVecin == jStop)
                    return;
            }
        }
    }
}

int main() {
    // Reprezentarea labirintului: 0 = liber, -1 = obstacol
    int matrice[6][10] = {
        { 0,  0,  0, -1, -1,  0,  0,  0, -1,  0},
        {-1, -1,  0, -1,  0, -1,  0,  0,  0, -1},
        {-1,  0,  0,  0,  0,  0,  0, -1, -1,  0},
        {-1, -1, -1,  0, -1, -1, -1,  0, -1,  0},
        {-1,  0,  0, -1, -1,  0, -1,  0,  0,  0},
        {-1,  0,  0, -1, -1,  0,  0,  0,  0,  0}
    };

    int iStart = 0, jStart = 0; // Coordonatele de start
    int iStop = 1, jStop = 8;   // Coordonatele de destinație

    bfs(matrice, 6, 10, iStart, jStart, iStop, jStop);

    // Afișăm distanța până la destinație (sau valoare implicită dacă nu s-a ajuns)
    cout << matrice[iStop][jStop];

    return 0;
}