#include <iostream>
using namespace std;

// FUNCTION TANPA PARAMETER
void header() {
    cout << "======================================" << endl;
    cout << "     PROGRAM TUGAS PERTEMUAN 13       " << endl;
    cout << "======================================" << endl;
}

// FUNCTION DENGAN PARAMETER + RETURN VALUE
float hitungDiskon(float totalBelanja) {

    if (totalBelanja >= 100000) {
        return totalBelanja * 0.20;
    }
    else if (totalBelanja >= 50000) {
        return totalBelanja * 0.10;
    }
    else {
        return 0;
    }
}

// FUNCTION DENGAN PARAMETER
void hasilGrade(int nilai) {

    cout << "\n=== HASIL NILAI ===" << endl;

    if (nilai >= 85) {
        cout << "Grade A" << endl;
        cout << "Keterangan : Sangat Baik" << endl;
    }
    else if (nilai >= 70) {
        cout << "Grade B" << endl;
        cout << "Keterangan : Baik" << endl;
    }
    else if (nilai >= 60) {
        cout << "Grade C" << endl;
        cout << "Keterangan : Cukup" << endl;
    }
    else {
        cout << "Grade D" << endl;
        cout << "Keterangan : Tidak Lulus" << endl;
    }
}

int main() {

    header();

    // =========================
    // IF ELSE
    // =========================

    int nilai;

    cout << "\nMasukkan Nilai Mahasiswa : ";
    cin >> nilai;

    hasilGrade(nilai);

    // =========================
    // SWITCH CASE
    // =========================

    int pilihan, jumlah;
    int harga = 0;

    cout << "\n=== MENU MAKANAN ===" << endl;
    cout << "1. Nasi Goreng  : 15000" << endl;
    cout << "2. Mie Ayam     : 12000" << endl;
    cout << "3. Bakso        : 10000" << endl;
    cout << "4. Es Teh       : 5000" << endl;

    cout << "\nPilih Menu : ";
    cin >> pilihan;

    cout << "Jumlah Pesanan : ";
    cin >> jumlah;

    switch (pilihan) {

        case 1:
            harga = 15000 * jumlah;
            cout << "Menu : Nasi Goreng" << endl;
            break;

        case 2:
            harga = 12000 * jumlah;
            cout << "Menu : Mie Ayam" << endl;
            break;

        case 3:
            harga = 10000 * jumlah;
            cout << "Menu : Bakso" << endl;
            break;

        case 4:
            harga = 5000 * jumlah;
            cout << "Menu : Es Teh" << endl;
            break;

        default:
            cout << "Menu Tidak Tersedia" << endl;
            return 0;
    }

    // =========================
    // FUNCTION + RETURN VALUE
    // =========================

    float diskon = hitungDiskon(harga);
    float totalBayar = harga - diskon;

    cout << "\n=== STRUK PEMBAYARAN ===" << endl;
    cout << "Total Harga : " << harga << endl;
    cout << "Diskon      : " << diskon << endl;
    cout << "Total Bayar : " << totalBayar << endl;

    cout << "\nTerima Kasih..." << endl;

    return 0;
}
