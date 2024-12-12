<script setup>
 const $base_url = `http://localhost:9000`;
 function sendRegister() {
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

    $("#btnRegister").hide();
    $("#loadingAjax").show();

    $.ajax({
     url: `${$base_url}/api/users/control/create`,
     type: "POST",
     dataType: "json",
     data: $("#formRegister").serializeArray(),
     xhrFields: {
      withCredentials: true,
     },
     success: function (callback) {
      const { message } = callback;
      console.log("success", callback);
      toastr.success(message, "Success!");

      $("#btnRegister").show();

      $.ajax({
       url: `${$base_url}/api/login`,
       type: "POST",
       dataType: "json",
       data: $("#formRegister").serializeArray(),
       xhrFields: {
        withCredentials: true,
       },
       success: function (callback) {
        const { message, token } = callback;
        console.log("success", callback);
        toastr.success(message, "Success!");

        localStorage.setItem("login_token", token);

        $("#btnLogin").show();

        setTimeout(function () {
         window.location.replace("/dashboard");
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
        $("#btnLogin").show();
        $("#loadingAjax").hide();
       },
      });
     },
     error: function (callback) {
      const { responseJSON } = callback;
      const { errors, message, messages, datas } = responseJSON;
      let errorInfo, validator;
      if (datas) {
       const { errorInfo: errInfo, validator: validCallback } = datas;
       errorInfo = errInfo;
       validator = validCallback;
      }
      console.log("error", callback);
      if (message || messages || errorInfo || validator) {
       const tmpMsg = validator ? "input data tidak sesuai atau tidak boleh kosong" : errorInfo ? errorInfo[2] : messages ? messages : message;
       toastr.error(tmpMsg, "Kesalahan!");
      }
      $("#btnRegister").show();
      $("#loadingAjax").hide();
     },
    });
    $("#btnRegister").show();
   }
  });
 }
</script>

<template>
 <div class="bg-gray-100 flex justify-center items-center h-screen">
  <div class="bg-white w-full max-w-sm p-6 rounded-lg shadow-lg">
   <h2 class="text-2xl font-bold text-center mb-6">Register</h2>
   <form
    id="formRegister"
    @submit.prevent="sendRegister()">
    <div class="mb-4">
     <label
      for="username"
      class="block text-gray-700 font-medium mb-2"
      >Username</label
     >
     <input
      type="text"
      id="username"
      name="username"
      class="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-green-300"
      placeholder="Enter your username"
      required />
    </div>
    <div class="mb-4">
     <label
      for="email"
      class="block text-gray-700 font-medium mb-2"
      >Email</label
     >
     <input
      type="email"
      id="email"
      name="email"
      class="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-green-300"
      placeholder="Enter your email"
      required />
    </div>
    <div class="mb-4">
     <label
      for="password"
      class="block text-gray-700 font-medium mb-2"
      >Password</label
     >
     <input
      type="password"
      id="password"
      name="password"
      class="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
      placeholder="Enter your password"
      required />
    </div>
    <button
     id="btnRegister"
     type="submit"
     class="w-full bg-green-500 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300">
     Register
    </button>
   </form>
   <p class="text-sm text-center text-gray-600 mt-4">
    Sudah punya akun?
    <span
     id="btnOpnLogin"
     class="cursor-pointer text-green-500 font-medium hover:underline"
     >Login</span
    >
   </p>
  </div>
 </div>
</template>
