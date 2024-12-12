<script>
 const $base_url = `http://localhost:9000`;

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
   $.ajax({
    url: `${$base_url}/api/logout`,
    type: "POST",
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

     localStorage.removeItem("login_token");
     window.location.replace("/");
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
</script>
