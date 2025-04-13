<?php
include "db.php";

$username = $_POST['username'];
$password = $_POST['password'];

$query = "SELECT * FROM akun WHERE username = '$username' and password = '$password'";
$akun = mysqli_query($conn, $query);

$user = NULL;

// Cek apakah ada hasil
if (mysqli_num_rows($akun) > 0) {
    $user = mysqli_fetch_assoc($akun);
} 

echo json_encode($user);


