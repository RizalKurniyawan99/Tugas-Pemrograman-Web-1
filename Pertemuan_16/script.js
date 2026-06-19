let entitasAktif = 'mahasiswa';
const instanceModal = new bootstrap.Modal(document.getElementById('formModal'));

// Jalankan otomatis saat halaman pertama kali dibuka
document.addEventListener('DOMContentLoaded', loadData);

// Fungsi ganti tab menu
function gantiEntitas(namaEntitas) {
    entitasAktif = namaEntitas;
    loadData();
}

// 1. FUNGSI MENAMPILKAN DATA KE TABEL
function loadData() {
    fetch(`api.php?action=list&entity=${entitasAktif}`)
        .then(response => response.json())
        .then(data => {
            let html = '';
            const tbody = document.getElementById(`tempat-${entitasAktif}`);

            if (data.length === 0) {
                let totalKolom = entitasAktif === 'mahasiswa' || entitasAktif === 'jadwal' ? 6 : 4;
                html = `<tr><td colspan="${totalKolom}" class="text-center text-muted py-3">Tidak ada data.</td></tr>`;
            } else {
                data.forEach((item, index) => {
                    if (entitasAktif === 'mahasiswa') {
                        html += `<tr>
                            <td>${index + 1}</td>
                            <td>${item.nim}</td>
                            <td>${item.nama}</td>
                            <td>${item.jurusan}</td>
                            <td>${item.email}</td>
                            <td class="text-center">
                                <button class="btn btn-warning btn-sm" onclick="siapkanEdit(${item.id})">Edit</button>
                                <button class="btn btn-danger btn-sm" onclick="hapusData(${item.id})">Hapus</button>
                            </td>
                        </tr>`;
                    } else if (entitasAktif === 'dosen') {
                        html += `<tr>
                            <td>${index + 1}</td>
                            <td>${item.nama}</td>
                            <td>${item.alamat}</td>
                            <td class="text-center">
                                <button class="btn btn-warning btn-sm" onclick="siapkanEdit(${item.id})">Edit</button>
                                <button class="btn btn-danger btn-sm" onclick="hapusData(${item.id})">Hapus</button>
                            </td>
                        </tr>`;
                    } else if (entitasAktif === 'matkul') {
                        html += `<tr>
                            <td>${index + 1}</td>
                            <td>${item.matkul}</td>
                            <td>${item.sks} SKS</td>
                            <td class="text-center">
                                <button class="btn btn-warning btn-sm" onclick="siapkanEdit(${item.id})">Edit</button>
                                <button class="btn btn-danger btn-sm" onclick="hapusData(${item.id})">Hapus</button>
                            </td>
                        </tr>`;
                    } else if (entitasAktif === 'jadwal') {
                        html += `<tr>
                            <td>${index + 1}</td>
                            <td>${item.nama_dosen}</td>
                            <td>${item.nama_matkul}</td>
                            <td>${item.waktu}</td>
                            <td>${item.ruang}</td>
                            <td class="text-center">
                                <button class="btn btn-warning btn-sm" onclick="siapkanEdit(${item.id})">Edit</button>
                                <button class="btn btn-danger btn-sm" onclick="hapusData(${item.id})">Hapus</button>
                            </td>
                        </tr>`;
                    }
                });
            }
            tbody.innerHTML = html;
        });
}

// 2. GENERATOR INPUT FORMULIR MODAL
function buatStrukturForm(callback) {
    let kontainerInput = document.getElementById('formFields');
    let susunanInput = '';

    if (entitasAktif === 'mahasiswa') {
        susunanInput = `
            <div class="mb-3"><label class="form-label">NIM</label><input type="text" class="form-control" name="nim" id="nim" required></div>
            <div class="mb-3"><label class="form-label">Nama</label><input type="text" class="form-control" name="nama" id="nama" required></div>
            <div class="mb-3"><label class="form-label">Jurusan</label><input type="text" class="form-control" name="jurusan" id="jurusan" required></div>
            <div class="mb-3"><label class="form-label">Email</label><input type="email" class="form-control" name="email" id="email" required></div>`;
        kontainerInput.innerHTML = susunanInput;
        if(callback) callback();
    } else if (entitasAktif === 'dosen') {
        susunanInput = `
            <div class="mb-3"><label class="form-label">Nama Dosen</label><input type="text" class="form-control" name="nama" id="nama" required></div>
            <div class="mb-3"><label class="form-label">Alamat</label><textarea class="form-control" name="alamat" id="alamat" required></textarea></div>`;
        kontainerInput.innerHTML = susunanInput;
        if(callback) callback();
    } else if (entitasAktif === 'matkul') {
        susunanInput = `
            <div class="mb-3"><label class="form-label">Nama Mata Kuliah</label><input type="text" class="form-control" name="matkul" id="matkul" required></div>
            <div class="mb-3"><label class="form-label">SKS</label><input type="number" class="form-control" name="sks" id="sks" min="1" max="6" required></div>`;
        kontainerInput.innerHTML = susunanInput;
        if(callback) callback();
    } else if (entitasAktif === 'jadwal') {
        // Tarik data dosen & matkul untuk opsi pilihan dropdown
        Promise.all([
            fetch('api.php?action=list&entity=dosen').then(res => res.json()),
            fetch('api.php?action=list&entity=matkul').then(res => res.json())
        ]).then(([dataDosen, dataMatkul]) => {
            let optDosen = '<option value="">-- Pilih Dosen --</option>';
            dataDosen.forEach(d => optDosen += `<option value="${d.id}">${d.nama}</option>`);

            let optMatkul = '<option value="">-- Pilih Matkul --</option>';
            dataMatkul.forEach(m => optMatkul += `<option value="${m.id}">${m.matkul}</option>`);

            susunanInput = `
                <div class="mb-3"><label class="form-label">Dosen Pengampu</label><select class="form-select" name="id_dosen" id="id_dosen" required>${optDosen}</select></div>
                <div class="mb-3"><label class="form-label">Mata Kuliah</label><select class="form-select" name="id_matkul" id="id_matkul" required>${optMatkul}</select></div>
                <div class="mb-3"><label class="form-label">Waktu</label><input type="text" class="form-control" name="waktu" id="waktu" placeholder="Contoh: Senin, 08.00" required></div>
                <div class="mb-3"><label class="form-label">Ruangan</label><input type="text" class="form-control" name="ruang" id="ruang" placeholder="Contoh: Ruang 402" required></div>`;
            
            kontainerInput.innerHTML = susunanInput;
            if(callback) callback();
        });
    }
}

// 3. AKSI SEBELUM TAMBAH DATA
function siapkanTambah() {
    document.getElementById('modalTitle').innerText = `Tambah ${entitasAktif.toUpperCase()}`;
    buatStrukturForm(() => {
        document.getElementById('mainForm').reset();
        document.getElementById('id').value = '';
        instanceModal.show();
    });
}

// 4. AKSI SEBELUM EDIT DATA
function siapkanEdit(id) {
    document.getElementById('modalTitle').innerText = `Edit ${entitasAktif.toUpperCase()}`;
    buatStrukturForm(() => {
        fetch(`api.php?action=get&entity=${entitasAktif}&id=${id}`)
            .then(response => response.json())
            .then(data => {
                document.getElementById('id').value = data.id;
                if (entitasAktif === 'mahasiswa') {
                    document.getElementById('nim').value = data.nim;
                    document.getElementById('nama').value = data.nama;
                    document.getElementById('jurusan').value = data.jurusan;
                    document.getElementById('email').value = data.email;
                } else if (entitasAktif === 'dosen') {
                    document.getElementById('nama').value = data.nama;
                    document.getElementById('alamat').value = data.alamat;
                } else if (entitasAktif === 'matkul') {
                    document.getElementById('matkul').value = data.matkul;
                    document.getElementById('sks').value = data.sks;
                } else if (entitasAktif === 'jadwal') {
                    document.getElementById('id_dosen').value = data.id_dosen;
                    document.getElementById('id_matkul').value = data.id_matkul;
                    document.getElementById('waktu').value = data.waktu;
                    document.getElementById('ruang').value = data.ruang;
                }
                instanceModal.show();
            });
    });
}

// 5. PROSES SIMPAN KE DATABASE (POST AJAX)
function simpanData(event) {
    event.preventDefault();
    const form = document.getElementById('mainForm');
    const formData = new FormData(form);

    fetch(`api.php?action=save&entity=${entitasAktif}`, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(res => {
        if (res.status === 'success') {
            instanceModal.hide();
            loadData();
        } else {
            alert('Gagal menyimpan: ' + res.message);
        }
    });
}

// 6. PROSES HAPUS DATA
function hapusData(id) {
    if (confirm(`Hapus data ${entitasAktif} ini?`)) {
        const formData = new FormData();
        formData.append('id', id);

        fetch(`api.php?action=delete&entity=${entitasAktif}`, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(res => {
            if (res.status === 'success') {
                loadData();
            } else {
                alert('Gagal menghapus: ' + res.message);
            }
        });
    }
}