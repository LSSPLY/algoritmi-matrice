#include <iostream>
using namespace std;

// Funcția DFS pentru a găsi cel mai scurt drum într-un labirint
void dfs(int matrice[][10], int iDim, int jDim, int iPoz, int jPoz, int iStop, int jStop) {
    // Dacă am ajuns la destinație, oprim recursivitatea
    if (iPoz == iStop && jPoz == jStop)
        return;

    // Vectori de direcție: jos, dreapta, sus, stânga
    int di[4] = {1, 0, -1, 0};
    int dj[4] = {0, 1, 0, -1};

    // Explorăm cei 4 vecini ai celulei curente
    for (int k = 0; k < 4; k++) {
        int iVecin = iPoz + di[k];
        int jVecin = jPoz + dj[k];

        // Verificăm dacă vecinul este în interiorul matricei și este o celulă liberă (valoare 0)
        if (iVecin >= 0 && iVecin < iDim && jVecin >= 0 && jVecin < jDim && matrice[iVecin][jVecin] == 0) {
            // Notăm distanța față de punctul de start (incrementăm cu 1 față de poziția curentă)
            matrice[iVecin][jVecin] = matrice[iPoz][jPoz] + 1;

            // Continuăm recursiv de la vecinul curent
            dfs(matrice, iDim, jDim, iVecin, jVecin, iStop, jStop);
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
    int iStop = 1, jStop = 8;   // Coordonatele destinației

    // Marcăm poziția de start cu valoarea 1 (distanța inițială)
    matrice[iStart][jStart] = 1;

    // Pornim căutarea în adâncime de la punctul de start
    dfs(matrice, 6, 10, iStart, jStart, iStop, jStop);

    // Afișăm distanța până la destinație (minus 1 deoarece startul a fost marcat cu 1)
    if (matrice[iStop][jStop] > 0)
        cout << "Distanța până la destinație: " << matrice[iStop][jStop] << endl;
    else
        cout << "Destinația nu poate fi atinsă din punctul de start." << endl;

    return 0;
}
