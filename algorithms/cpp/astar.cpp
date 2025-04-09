#include <iostream>
#include <cmath>
#include <tuple>
#include <queue>
using namespace std;

// Calculează distanța Manhattan dintre două poziții din grilă
double distantaManhattan(int iPoz, int jPoz, int iStop, int jStop) {
    return abs(iPoz - iStop) + abs(jPoz - jStop);
}

// Algoritmul A* pentru a găsi un drum de la punctul de start la punctul de stop într-un labirint
void astar(int matrice[][10], int iDim, int jDim, int iStart, int jStart, int iStop, int jStop) {
    // Vectori care definesc mișcarea în cele 4 direcții: jos, dreapta, sus, stânga
    int di[4] = {1, 0, -1, 0};
    int dj[4] = {0, 1, 0, -1};

    priority_queue<tuple<int, int, int>> openSet; // Coada de priorități pentru noduri, ordonată după scorul f (inversat pentru a obține efect de min-heap)
    int gScore[iDim][jDim];  // Costul real de la start până la fiecare nod
    int fScore[iDim][jDim];  // Estimarea costului total de la start până la stop prin acel nod

    matrice[iStart][jStart] = 1;  // Marcare inițială a poziției de start (nu reprezintă scorul real)
    gScore[iStart][jStart] = 0;  // Costul de la start până aici este 0
    fScore[iStart][jStart] = distantaManhattan(iStart, jStart, iStop, jStop); // Estimarea distanței până la destinație
    openSet.push(make_tuple(-fScore[iStart][jStart], iStart, jStart)); // Se adaugă în coadă cu scorul negativ pentru min-heap

    while (!openSet.empty()) {
        int fScoreCurent, iPoz, jPoz;
        tie(fScoreCurent, iPoz, jPoz) = openSet.top();
        openSet.pop();
        fScoreCurent = -fScoreCurent; // Se obține valoarea pozitivă a scorului f extras din coadă

        // Se verifică toți cei 4 vecini ai nodului curent
        for (int k = 0; k < 4; k++) {
            int iVecin = iPoz + di[k];
            int jVecin = jPoz + dj[k];

            // Verifică dacă vecinul este în interiorul grilei și este un spațiu liber (0)
            if (iVecin >= 0 && iVecin < iDim && jVecin >= 0 && jVecin < jDim && matrice[iVecin][jVecin] == 0) {
                matrice[iVecin][jVecin] = matrice[iPoz][jPoz] + 1;  // Se actualizează matricea cu un "pas" în plus

                // Adaugă vecinul în coada de priorități pentru a fi procesat
                openSet.push(make_tuple(distantaManhattan(iVecin, jVecin, iStop, jStop), iVecin, jVecin));

                // Dacă s-a ajuns la destinație, se încheie căutarea
                if (iVecin == iStop && jVecin == jStop)
                    return;
            }
        }
    }
}

int main() {
    // Reprezentarea labirintului: 0 = spațiu liber, -1 = obstacol
    int matrice[6][10] = {
        { 0,  0,  0, -1, -1,  0,  0,  0, -1,  0},
        {-1, -1,  0, -1,  0, -1,  0,  0,  0, -1},
        {-1,  0,  0,  0,  0,  0,  0, -1, -1,  0},
        {-1, -1, -1,  0, -1, -1, -1,  0, -1,  0},
        {-1,  0,  0, -1, -1,  0, -1,  0,  0,  0},
        {-1,  0,  0, -1, -1,  0,  0,  0,  0,  0}
    };

    int iStart = 0, jStart = 0; // Coordonatele de pornire
    int iStop = 1, jStop = 8;   // Coordonatele destinației

    astar(matrice, 6, 10, iStart, jStart, iStop, jStop);

    // Afișează valoarea finală din poziția destinație (distanța parcursă dacă s-a ajuns acolo)
    cout << matrice[iStop][jStop];

    return 0;
}
