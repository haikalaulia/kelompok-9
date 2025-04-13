<?php
include "db.php";

$username = $_POST['username'];
$text = $_POST['todo'];

$query = "INSERT INTO todos (username, todo) VALUES ('$username', '$text')";
$todo = mysqli_query($conn, $query);

if ($todo) {
    // Ambil ID terakhir yang baru di-insert
    $last_id = mysqli_insert_id($conn);

    // Ambil data todo yang baru dimasukkan
    $select = mysqli_query($conn, "SELECT * FROM todos WHERE id = $last_id");
    $newData = mysqli_fetch_assoc($select); // hasilnya 1 row associative array

    echo json_encode([
        "status" => true,
        "pesan" => "berhasil",
        "data" => $newData
    ]);
} else {
    echo json_encode([
        "status" => false,
        "pesan" => "gagal"
    ]);
}
?>
