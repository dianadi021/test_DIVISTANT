<script setup>
 const $base_url = `http://localhost:9000`;

 $(document).ready(async function () {
  $("#formSection").hide();

  (async function () {
   const dataTableshead = [
    { data: "title", title: "Judul" },
    { data: "description", title: "Deskripsi", orderable: false, searchable: false },
    {
     data: "actions",
     title: "Aksi",
     orderable: false,
     searchable: false,
     render: function (data, type, row) {
      return `
        <div class='text-center'>
            <button class="bg-yellow-500 text-white font-medium px-4 py-2 rounded hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-300 btn-edit" data-id="${row.id}" data-title="${row.title}">
                Edit
            </button>
            <button class="bg-red-500 text-white font-medium px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 btn-delete" data-id="${row.id}" data-title="${row.title}">
                Delete
            </button>
        </div>
    `;
     },
    },
   ];

   await ContentLoaderDataTable(`${$base_url}/api/books/all`, `#content_loader`, dataTableshead);
  })();

  $("#content_loader").on("click", ".btn-edit", function () {
   const idData = $(this).data("id");
   const titleData = $(this).data("title");
   alert(`${titleData} - ${idData}`);
  });

  $("#content_loader").on("click", ".btn-delete", function () {
   const idData = $(this).data("id");
   const titleData = $(this).data("title");

   event.preventDefault();
   Swal.fire({
    title: "Apakah kamu yakin ingin melanjutkan?",
    text: `Menghapus ${titleData}`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText: "Batal",
    confirmButtonText: "Oke!",
   }).then((result) => {
    if (result.isConfirmed) {
     toastr.warning("Sedang diproses, mohon tunggu!", "Peringatan!");
     $("#loadingAjax").show();

     $.ajax({
      url: `${$base_url}/api/books/control/delete/${idData}`,
      type: "DELETE",
      dataType: "json",
      data: {
       token: localStorage.getItem("login_token"),
      },
      xhrFields: {
       withCredentials: true,
      },
      success: function (callback) {
       const { message } = callback;
       console.log("success", callback);
       toastr.success(message, "Success!");

       setTimeout(function () {
        window.location.reload();
       }, 1500);
      },
      error: function (callback) {
       console.log("error", callback);
       const { responseJSON } = callback;
       const { errors, message, messages, datas } = responseJSON;
       let errorInfo, validator;
       if (datas) {
        const { errorInfo: errInfo, validator: validCallback } = datas;
        errorInfo = errInfo;
        validator = validCallback;
       }
       if (message || messages || errorInfo || validator) {
        const tmpMsg = validator ? "input data tidak sesuai atau tidak boleh kosong" : errorInfo ? errorInfo[2] : messages ? messages : message;
        toastr.error(tmpMsg, "Kesalahan!");
       }
       $("#loadingAjax").hide();
      },
     });
    }
   });
  });
 });

 let isFormOpen = false;
 function openForm() {
  $("#formTitle").html("Form Input Buku Baru");
  if (!isFormOpen) {
   $("#formSection").show();
   isFormOpen = !isFormOpen;
  } else {
   $("#formSection").hide();
   isFormOpen = !isFormOpen;
  }
 }

 function sendBooks() {
  event.preventDefault();
  Swal.fire({
   title: "Apakah kamu yakin ingin melanjutkan?",
   // text: "You won't be able to revert this!",
   icon: "warning",
   showCancelButton: true,
   confirmButtonColor: "#3085d6",
   cancelButtonColor: "#d33",
   cancelButtonText: "Batal",
   confirmButtonText: "Oke!",
  }).then((result) => {
   if (result.isConfirmed) {
    toastr.warning("Sedang diproses, mohon tunggu!", "Peringatan!");

    $("#btnSimpan").hide();
    $("#loadingAjax").show();

    $("#tokenForm").val(localStorage.getItem("login_token"));

    $.ajax({
     url: `${$base_url}/api/books/control/create`,
     type: "POST",
     dataType: "json",
     data: $("#formBook").serializeArray(),
     xhrFields: {
      withCredentials: true,
     },
     success: function (callback) {
      const { message } = callback;
      console.log("success", callback);
      toastr.success(message, "Success!");

      $("#btnSimpan").show();

      setTimeout(function () {
       window.location.reload();
      }, 1500);
     },
     error: function (callback) {
      console.log("error", callback);
      const { responseJSON } = callback;
      const { errors, message, messages, datas } = responseJSON;
      let errorInfo, validator;
      if (datas) {
       const { errorInfo: errInfo, validator: validCallback } = datas;
       errorInfo = errInfo;
       validator = validCallback;
      }
      if (message || messages || errorInfo || validator) {
       const tmpMsg = validator ? "input data tidak sesuai atau tidak boleh kosong" : errorInfo ? errorInfo[2] : messages ? messages : message;
       toastr.error(tmpMsg, "Kesalahan!");
      }
      $("#btnSimpan").show();
      $("#loadingAjax").hide();
     },
    });
    $("#btnSimpan").show();
   }
  });
 }
</script>

<template>
 <div class="w-full flex flex-wrap">
  <div>
   <button
    @click="openForm()"
    class="bg-green-500 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300">
    Tambah
   </button>
  </div>
  <div class="w-full">
   <div
    id="formSection"
    class="flex justify-center items-center">
    <div class="bg-white w-full max-w-sm p-6 rounded-lg shadow-lg">
     <h2
      id="formTitle"
      class="text-2xl font-bold text-center mb-6"></h2>
     <form
      id="formBook"
      @submit.prevent="sendBooks()">
      <input
       id="tokenForm"
       type="hidden"
       name="token" />
      <div class="mb-4">
       <label
        for="title"
        class="block text-gray-700 font-medium mb-2"
        >Judul</label
       >
       <input
        type="title"
        id="title"
        name="title"
        class="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
        placeholder="Enter your title"
        required />
      </div>
      <div class="mb-4">
       <label
        for="description"
        class="block text-gray-700 font-medium mb-2"
        >Description</label
       >
       <textarea
        type="description"
        id="description"
        name="description"
        class="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
        placeholder="Enter your description"
        style="resize: none"></textarea>
      </div>
      <button
       id="btnSimpan"
       type="submit"
       class="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300">
       Simpan
      </button>
     </form>
    </div>
   </div>
  </div>
 </div>
 <div class="w-full">
  <table id="content_loader"></table>
 </div>
</template>
