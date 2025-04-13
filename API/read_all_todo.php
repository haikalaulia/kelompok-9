<?php
include "db.php";

$username = $_POST['username'];

// FIX: tutup kutipnya
$query = "SELECT * FROM todos WHERE username = '$username'";
$todo = mysqli_query($conn, $query);

if ($todo) {
    $data = [];

    // Ambil semua baris hasil query
    while ($row = mysqli_fetch_assoc($todo)) {
        $data[] = $row;
    }

    // Kirim hasil dalam bentuk JSON
    echo json_encode([
        "status" => true,
        "data" => $data
    ]);
} else {
    echo json_encode([
        "status" => false,
        "pesan" => "Query gagal: " . mysqli_error($conn)
    ]);
}
?>
