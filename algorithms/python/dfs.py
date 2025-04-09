# Funcția DFS pentru a găsi cel mai scurt drum într-un labirint
def dfs(matrice, iDim, jDim, iPoz, jPoz, iStop, jStop):
    # Dacă am ajuns la destinație, putem opri căutarea
    if iPoz == iStop and jPoz == jStop:
        return

    # Vectori de direcție: jos, dreapta, sus, stânga
    di = [1, 0, -1, 0]
    dj = [0, 1, 0, -1]

    # Verificăm fiecare dintre cei 4 vecini
    for k in range(4):
        iVecin = iPoz + di[k]
        jVecin = jPoz + dj[k]

        # Dacă vecinul este în interiorul grilei și este liber (0)
        if 0 <= iVecin < iDim and 0 <= jVecin < jDim and matrice[iVecin][jVecin] == 0:
            matrice[iVecin][jVecin] = matrice[iPoz][jPoz] + 1  # Incrementăm distanța
            # Procesăm vecinul
            dfs(matrice, iDim, jDim, iVecin, jVecin, iStop, jStop)


# Reprezentarea labirintului: 0 = liber, -1 = obstacol
matrice = [
[ 0,  0,  0, -1, -1,  0,  0,  0, -1,  0],
    [-1, -1,  0, -1,  0, -1,  0,  0,  0, -1],
    [-1,  0,  0,  0,  0,  0,  0, -1, -1,  0],
    [-1, -1, -1,  0, -1, -1, -1,  0, -1,  0],
    [-1,  0,  0, -1, -1,  0, -1,  0,  0,  0],
    [-1,  0,  0, -1, -1,  0,  0,  0,  0,  0]
]

iStart, jStart = 0, 0  # Coordonatele de start
iStop, jStop = 1, 8    # Coordonatele de destinație

matrice[iStart][jStart] = 1  # Marcăm poziția de start cu distanța 1
dfs(matrice, 6, 10, iStart, jStart, iStop, jStop)

# Afișăm distanța până la destinație (sau mesaj dacă nu s-a ajuns)
if matrice[iStop][jStop] > 0:
    print("Distanța până la destinație:", matrice[iStop][jStop])
else:
    print("Destinația nu poate fi atinsă.")