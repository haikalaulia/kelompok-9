<?php
include "db.php";

$id = $_POST['id'];
$newText = $_POST['newText'];

// Fix: tutup kutipnya
$query = "UPDATE todos SET todo = '$newText' WHERE id = '$id'";
$edit = mysqli_query($conn, $query);

// Fix: variabel yang dicek 
if ($edit) {
    echo json_encode([
        "status" => true,
        "pesan" => "berhasil"
    ]);
} else {
    echo json_encode([
        "status" => false,
        "pesan" => "gagal"
    ]);
}
?>
