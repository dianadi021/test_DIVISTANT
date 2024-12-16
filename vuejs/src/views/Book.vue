<script setup>
 const $base_url = `http://localhost:9000`;

 (function () {
  const params = new URLSearchParams(window.location.search);
  const bookId = params.get("id");
 })();

 $(document).ready(function () {
  $("#main_title").html("Books");

  $("#loadingContetLoader").show();

  $.ajax({
   url: `${$base_url}/api/books/`,
   type: "GET",
   dataType: "json",
   data: {
    token: localStorage.getItem("login_token"),
   },
   success: function (response) {
    $(`${$id_content}`).DataTable({
     dom: '<"top flex justify-between"Bfr>t<"bottom"lp><"clear">', // Custom DOM layout
     buttons: [
      {
       extend: "excelHtml5", // Excel export button
       text: '<span class="text-sm"><i class="fa-regular fa-file-excel"></i> Excel</span>',
       className: "m-0 p-0", // Customize button style
       exportOptions: {
        modifier: {
         page: "all", // Export all pages of the table, not just the current page
        },
        columns: ":visible", // Only export the visible columns
       },
      },
      {
       extend: "colvis", // Excel export button
       text: '<span class="text-sm"><i class="fa-solid fa-eye"></i> Show</span>',
       className: "m-0 p-0 w-fit", // Customize button style
      },
     ],
     pageLength: 5, // Set initial page length (entries per page)
     lengthMenu: [5, 10, 25, 50, 75, 100], // Provide options for entries per page
     columnDefs: [
      {
       targets: -1, // Last column (Actions column)
       visible: true, // Ensure 'Actions' column is visible
      },
     ],
     data: response.datas,
     columns: $table_coloumn,
    });
    $("#loadingContetLoader").hide();
   },
  });
 });
</script>

<template>
 <main class="w-full">
  <div></div>
 </main>
</template>
