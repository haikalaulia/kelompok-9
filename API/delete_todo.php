<?php
include "db.php";

$id = $_POST['id'];

// Fix: tutup kutipnya
$query = "DELETE FROM todos WHERE id = '$id'";
$delete = mysqli_query($conn, $query);

// Fix: variabel yang dicek harusnya $delete
if ($delete) {
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
