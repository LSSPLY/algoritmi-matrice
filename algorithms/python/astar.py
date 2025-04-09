import heapq

# Calculează distanța Manhattan dintre două puncte
def distanta_manhattan(i_poz, j_poz, i_stop, j_stop):
    return abs(i_poz - i_stop) + abs(j_poz - j_stop)

# Funcția ASTAR pentru a găsi cel mai scurt drum într-un labirint
def astar(matrice, i_start, j_start, i_stop, j_stop):
    # Vectori de direcție: jos, dreapta, sus, stânga
    di = [1, 0, -1, 0]
    dj = [0, 1, 0, -1]

    i_dim = len(matrice)
    j_dim = len(matrice[0])

    open_set = []
    heapq.heappush(open_set, (distanta_manhattan(i_start, j_start, i_stop, j_stop), i_start, j_start))

    g_score = [[0 for _ in range(j_dim)] for _ in range(i_dim)]
    f_score = [[0 for _ in range(j_dim)] for _ in range(i_dim)]

    matrice[i_start][j_start] = 1  # Marcăm poziția de start cu distanța 1

    while open_set:
        _, i_poz, j_poz = heapq.heappop(open_set)

        # Verificăm fiecare dintre cei 4 vecini
        for k in range(4):
            i_vecin = i_poz + di[k]
            j_vecin = j_poz + dj[k]

            # Dacă vecinul este în interiorul grilei și este liber (0)
            if 0 <= i_vecin < i_dim and 0 <= j_vecin < j_dim and matrice[i_vecin][j_vecin] == 0:
                matrice[i_vecin][j_vecin] = matrice[i_poz][j_poz] + 1  # Incrementăm distanța

                # Adăugăm vecinul în coadă pentru procesare ulterioară
                heapq.heappush(open_set, (distanta_manhattan(i_vecin, j_vecin, i_stop, j_stop), i_vecin, j_vecin))

                # Dacă am ajuns la destinație, putem opri căutarea
                if i_vecin == i_stop and j_vecin == j_stop:
                    return

# Reprezentarea labirintului: 0 = liber, -1 = obstacol
matrice = [
    [ 0,  0,  0, -1, -1,  0,  0,  0, -1,  0],
    [-1, -1,  0, -1,  0, -1,  0,  0,  0, -1],
    [-1,  0,  0,  0,  0,  0,  0, -1, -1,  0],
    [-1, -1, -1,  0, -1, -1, -1,  0, -1,  0],
    [-1,  0,  0, -1, -1,  0, -1,  0,  0,  0],
    [-1,  0,  0, -1, -1,  0,  0,  0,  0,  0]
]

i_start, j_start = 0, 0  # Coordonatele de start
i_stop, j_stop = 1, 8    # Coordonatele de destinație

astar(matrice, i_start, j_start, i_stop, j_stop)

# Afișăm distanța până la destinație (sau valoare implicită dacă nu s-a ajuns)
print(matrice[i_stop][j_stop])
