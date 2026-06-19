<?php
session_start();
if (!isset($_SESSION['login'])) {
    header("Location: login.php");
    exit;
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sistem Informasi Akademik</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">

    <nav class="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
        <div class="container">
            <a class="navbar-brand" href="#">SIAKAD</a>
            <div class="d-flex align-items-center">
                <span class="text-white me-3">User: <strong><?= htmlspecialchars($_SESSION['username']); ?></strong></span>
                <a href="logout.php" class="btn btn-danger btn-sm" onclick="return confirm('Keluar dari sistem?')">Logout</a>
            </div>
        </div>
    </nav>

    <div class="container my-5">
        
        <ul class="nav nav-tabs mb-4" id="siakadTabs" role="tablist">
            <li class="nav-item">
                <button class="nav-link active" id="mahasiswa-tab" data-bs-toggle="tab" data-bs-target="#panel-mahasiswa" type="button" onclick="gantiEntitas('mahasiswa')">Mahasiswa</button>
            </li>
            <li class="nav-item">
                <button class="nav-link" id="dosen-tab" data-bs-toggle="tab" data-bs-target="#panel-dosen" type="button" onclick="gantiEntitas('dosen')">Dosen</button>
            </li>
            <li class="nav-item">
                <button class="nav-link" id="matkul-tab" data-bs-toggle="tab" data-bs-target="#panel-matkul" type="button" onclick="gantiEntitas('matkul')">Mata Kuliah</button>
            </li>
            <li class="nav-item">
                <button class="nav-link" id="jadwal-tab" data-bs-toggle="tab" data-bs-target="#panel-jadwal" type="button" onclick="gantiEntitas('jadwal')">Jadwal Kuliah</button>
            </li>
        </ul>

        <div class="tab-content" id="siakadTabsContent">
            
            <div class="tab-pane fade show active" id="panel-mahasiswa" role="tabpanel">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h4>Data Mahasiswa</h4>
                    <button class="btn btn-primary btn-sm" onclick="siapkanTambah()">Tambah Mahasiswa</button>
                </div>
                <div class="table-responsive bg-white rounded shadow-sm">
                    <table class="table table-striped align-middle mb-0">
                        <thead class="table-dark">
                            <tr>
                                <th>No</th>
                                <th>NIM</th>
                                <th>Nama</th>
                                <th>Jurusan</th>
                                <th>Email</th>
                                <th class="text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody id="tempat-mahasiswa"></tbody>
                    </table>
                </div>
            </div>

            <div class="tab-pane fade" id="panel-dosen" role="tabpanel">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h4>Data Dosen</h4>
                    <button class="btn btn-primary btn-sm" onclick="siapkanTambah()">Tambah Dosen</button>
                </div>
                <div class="table-responsive bg-white rounded shadow-sm">
                    <table class="table table-striped align-middle mb-0">
                        <thead class="table-dark">
                            <tr>
                                <th>No</th>
                                <th>Nama Dosen</th>
                                <th>Alamat</th>
                                <th class="text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody id="tempat-dosen"></tbody>
                    </table>
                </div>
            </div>

            <div class="tab-pane fade" id="panel-matkul" role="tabpanel">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h4>Data Mata Kuliah</h4>
                    <button class="btn btn-primary btn-sm" onclick="siapkanTambah()">Tambah Matkul</button>
                </div>
                <div class="table-responsive bg-white rounded shadow-sm">
                    <table class="table table-striped align-middle mb-0">
                        <thead class="table-dark">
                            <tr>
                                <th>No</th>
                                <th>Mata Kuliah</th>
                                <th>SKS</th>
                                <th class="text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody id="tempat-matkul"></tbody>
                    </table>
                </div>
            </div>

            <div class="tab-pane fade" id="panel-jadwal" role="tabpanel">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h4>Jadwal Perkuliahan</h4>
                    <button class="btn btn-primary btn-sm" onclick="siapkanTambah()">Tambah Jadwal</button>
                </div>
                <div class="table-responsive bg-white rounded shadow-sm">
                    <table class="table table-striped align-middle mb-0">
                        <thead class="table-dark">
                            <tr>
                                <th>No</th>
                                <th>Dosen</th>
                                <th>Mata Kuliah</th>
                                <th>Waktu</th>
                                <th>Ruang</th>
                                <th class="text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody id="tempat-jadwal"></tbody>
                    </table>
                </div>
            </div>

        </div>
    </div>

    <div class="modal fade" id="formModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalTitle">Form Data</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <form id="mainForm" onsubmit="simpanData(event)">
                    <div class="modal-body">
                        <input type="hidden" id="id" name="id">
                        <div id="formFields"></div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
                        <button type="submit" class="btn btn-primary">Simpan</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="script.js"></script>
</body>
</html>