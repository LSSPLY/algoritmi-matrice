import java.util.PriorityQueue;

public class astar {
    // Calculează distanța Manhattan dintre două puncte
    static int distantaManhattan(int iPoz, int jPoz, int iStop, int jStop) {
        return Math.abs(iPoz - iStop) + Math.abs(jPoz - jStop);
    }

    // Funcția ASTAR pentru a găsi cel mai scurt drum într-un labirint
    static void astar(int[][] matrice, int iStart, int jStart, int iStop, int jStop) {
        // Vectori de direcție: jos, dreapta, sus, stânga
        int[] di = {1, 0, -1, 0};
        int[] dj = {0, 1, 0, -1};

        int rows = matrice.length;
        int cols = matrice[0].length;

        PriorityQueue<Node> openSet = new PriorityQueue<>();
        int[][] gScore = new int[rows][cols];
        int[][] fScore = new int[rows][cols];

        matrice[iStart][jStart] = 1;  // Marcăm poziția de start cu distanța 1
        gScore[iStart][jStart] = 0;
        fScore[iStart][jStart] = distantaManhattan(iStart, jStart, iStop, jStop);
        openSet.add(new Node(iStart, jStart, fScore[iStart][jStart]));

        while (!openSet.isEmpty()) {
            Node current = openSet.poll();
            int iPoz = current.i;
            int jPoz = current.j;

            // Verificăm fiecare dintre cei 4 vecini
            for (int k = 0; k < 4; k++) {
                int iVecin = iPoz + di[k];
                int jVecin = jPoz + dj[k];

                // Dacă vecinul este în interiorul grilei și este liber (0)
                if (iVecin >= 0 && iVecin < rows && jVecin >= 0 && jVecin < cols && matrice[iVecin][jVecin] == 0) {
                    matrice[iVecin][jVecin] = matrice[iPoz][jPoz] + 1;  // Incrementăm distanța

                    // Adăugăm vecinul în coadă pentru procesare ulterioară
                    openSet.add(new Node(iVecin, jVecin, distantaManhattan(iVecin, jVecin, iStop, jStop)));

                    // Dacă am ajuns la destinație, putem opri căutarea
                    if (iVecin == iStop && jVecin == jStop)
                        return;
                }
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

        astar(matrice, iStart, jStart, iStop, jStop);

        // Afișăm distanța până la destinație (sau valoare implicită dacă nu s-a ajuns)
        System.out.println(matrice[iStop][jStop]);
    }

    // Clasă pentru nodurile din coada de priorități
    static class Node implements Comparable<Node> {
        int i, j, priority;
        Node(int i, int j, int priority) {
            this.i = i;
            this.j = j;
            this.priority = priority;
        }

        public int compareTo(Node other) {
            return Integer.compare(this.priority, other.priority);
        }
    }
}
