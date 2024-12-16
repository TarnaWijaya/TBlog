function updateTanggalWaktu() {
    const now = new Date();
    let day = now.getDate();
    let month = now.getMonth() + 1; // Bulan dimulai dari 0
    let year = now.getFullYear();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    // Menambahkan angka 0 jika nilai hari, bulan, jam, menit, atau detik kurang dari 10
    day = day < 10 ? '0' + day : day;
    month = month < 10 ? '0' + month : month;
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    // Menampilkan tanggal dan waktu dalam format 00/00/0000 00:00:00
    document.getElementById('tanggal-waktu').textContent = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

setInterval(updateTanggalWaktu, 1000);