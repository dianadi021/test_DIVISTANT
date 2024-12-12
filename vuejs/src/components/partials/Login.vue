<script setup>
 const $base_url = `http://localhost:9000`;
 function sendLogin() {
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

    $("#btnLogin").hide();
    $("#loadingAjax").show();

    $.ajax({
     url: `${$base_url}/api/login`,
     type: "POST",
     dataType: "json",
     data: $("#formLogin").serializeArray(),
     xhrFields: {
      withCredentials: true,
     },
     success: function (callback) {
      const { message, token } = callback;
      console.log("success", callback);
      toastr.success(message, "Success!");

      localStorage.setItem("login_token", token)

      $("#btnLogin").show();

    //   setTimeout(function () {
    //    window.location.replace("/dashboard");
    //   }, 1500);
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
      $("#btnLogin").show();
      $("#loadingAjax").hide();
     },
    });
    $("#btnLogin").show();
   }
  });
 }
</script>

<template>
 <div class="bg-gray-100 flex justify-center items-center h-screen">
  <div class="bg-white w-full max-w-sm p-6 rounded-lg shadow-lg">
   <h2 class="text-2xl font-bold text-center mb-6">Login</h2>
   <form
    id="formLogin"
    @submit.prevent="sendLogin()">
    <div class="mb-4">
     <label
      for="username"
      class="block text-gray-700 font-medium mb-2"
      >Username</label
     >
     <input
      type="username"
      id="username"
      name="username"
      class="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
      placeholder="Enter your username"
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
     id="btnLogin"
     type="submit"
     class="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300">
     Login
    </button>
   </form>
   <p class="text-sm text-center text-gray-600 mt-4">
    Belum punya akun?
    <span
     id="btnOpnRegister"
     class="cursor-pointer text-blue-500 font-medium hover:underline"
     >Register</span
    >
   </p>
  </div>
 </div>
</template>
