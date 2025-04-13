$(document).ready(function () {
    var todoList = $('#todo-list');
    let username = localStorage.getItem("username");
    

    $.ajax({
        
        url: 'http://localhost/UTS_prak/API/read_all_todo.php', // URL tempat mengirim data
        type: 'POST',      // Menggunakan metode POST
        dataType: "json",
        data: {
            username: username,
        },

        beforeSend: function () {
            
        },

        success: function (response) {
            console.log(response);
            if (response.status) {
                for (let i = 0; i < response.data.length; i++) {
                    const data = response.data[i];
                    let li = document.createElement("li");
                li.innerHTML = `
                    <span>${data.todo}</span>
                    <div>
                        <button class="edit-btn" onclick="editTodo(this, ${data.id})">Edit</button>
                        <button class="delete-btn" onclick="deleteTodo(this, ${data.id})">Hapus</button>
                    </div>
                `;

                document.getElementById("todo-list").appendChild(li);
                    
                }
            //     
            //     $("#todo-input").val();
            } else {
                // Jika ada error saat request
                $('.response').html("error");
            }

        },
        error: function (xhr, status, error) {
            var btnTambah = $("#btn-tambah");
            btnTambah.text("Tambah")
            // Jika ada error saat request
            $('.response').html('Error: ' + xhr.status + ' ' + error);
        }
    });

});

function addTodo() {

    let username = localStorage.getItem("username");
    var todo = $("#todo-input").val();
    if (!username || !todo) {
        return alert("todo tidak boleh kosong")
    }

    // AJAX Request
    $.ajax({
        url: 'http://localhost/UTS_prak/API/add_todo.php', // URL tempat mengirim data
        type: 'POST',      // Menggunakan metode POST
        dataType: "json",
        data: {
            username: username,
            todo: todo
        },

        beforeSend: function () {
            var btnTambah = $("#btn-tambah");
            btnTambah.text("mohon tunggu")
        },

        success: function (response) {
            var btnTambah = $("#btn-tambah");
            btnTambah.text("Tambah")
            if (response.status) {
                console.log(response.pesan)
                let li = document.createElement("li");
                li.innerHTML = `
                    <span>${todo}</span>
                    <div>
                        <button class="edit-btn" onclick="editTodo(this, ${response.data.id})">Edit</button>
                        <button class="delete-btn" onclick="deleteTodo(this, ${response.data.id})">Hapus</button>
                    </div>
                `;

                document.getElementById("todo-list").appendChild(li);
                $("#todo-input").val();
            } else {
                // Jika ada error saat request
                $('.response').html("error");
            }

        },
        error: function (xhr, status, error) {
            var btnTambah = $("#btn-tambah");
            btnTambah.text("Tambah")
            // Jika ada error saat request
            $('.response').html('Error: ' + xhr.status + ' ' + error);
        }
    });


}

function deleteTodo(button, id) {
    // let li = button.parentElement.parentElement;
    // li.remove();

    $.ajax({
        url: 'http://localhost/UTS_prak/API/delete_todo.php', // URL tempat mengirim data
        type: 'POST',      // Menggunakan metode POST
        dataType: "json",
        data: {
            id : id
        },

        beforeSend: function () {
            button.text="mohon tunggu"
        },

        success: function (response) {
            button.text="Hapus"     
            if (response.status) {
                let li = button.parentElement.parentElement;
                li.remove();
            } else {
                // Jika ada error saat request
                // $('.response').html("err");
                alert(response.pesan)
            }

        },
    })
}

function editTodo(button, id) {
    let li = button.parentElement.parentElement;
    let span = li.querySelector("span");
    let currentText = span.textContent;

    // Mengganti span dengan input
    span.innerHTML = `<input type="text" value="${currentText}" />`;
    button.textContent = "Simpan"; // Mengubah teks tombol menjadi "Simpan"
    button.setAttribute("onclick", `saveTodo(this, ${id})`); // Mengubah fungsi onclick
}

function saveTodo(button, id) {
    console.log('sasveTodo')

    let li = button.parentElement.parentElement;
    let input = li.querySelector("input");
    let newText = input.value.trim();

    if (newText == "") {
        return alert("Tugas tidak boleh kosong!");
    }

    $.ajax({
        url: 'http://localhost/UTS_prak/API/edit_todo.php', // URL tempat mengirim data
        type: 'POST',      // Menggunakan metode POST
        dataType: "json",
        data: {
            id : id,
            newText : newText
        },

        beforeSend: function () {
            button.text="mohon tunggu"
        },

        success: function (response) {  
            if (response.status) {
                li.querySelector("span").textContent = newText; // Mengupdate teks span
                
            } else {
                // Jika ada error saat request
                // $('.response').html("err");
                alert(response.pesan)
            }

        },
    })

    



    button.textContent = "Edit"; // Mengubah kembali teks tombol menjadi "Edit"
    button.setAttribute("onclick", `editTodo(this, ${id})`); // Mengubah kembali fungsi onclick
}

function logout(){
    localStorage.clear();
    window.location.href = 'index.html';

}