<script setup>
 $("#main_title").html("Welcome");

 import { RouterLink, RouterView } from "vue-router";

 import Login from "../components/partials/Login.vue";
 import Register from "../components/partials/Register.vue";

 $(document).ready(function () {
  $("#register_section").hide();

  $("#btnOpnLogin").click(function () {
   $("#register_section").hide();
   $("#login_section").show();
  });

  $("#btnOpnRegister").click(function () {
   $("#login_section").hide();
   $("#register_section").show();
  });
 });
</script>

<template>
 <main class="w-full">
  <div id="login_section">
   <Login />
  </div>
  <div id="register_section">
   <Register />
  </div>
 </main>
</template>
