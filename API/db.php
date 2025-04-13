<?php
$host = "localhost";      // host database
$user = "root";           // username database
$pass = "";               // password database (kosong jika default XAMPP)
$db   = "todolist";  // ganti dengan nama databasenya

$conn = mysqli_connect($host, $user, $pass, $db);

// Cek koneksi
if (!$conn) {
    die("Koneksi gagal: " . mysqli_connect_error());
}
// echo "Koneksi berhasil!";
?>
