<script setup>
 import BookTable from "../components/sections/BookTable.vue";

 import { RouterLink, RouterView } from "vue-router";

 $(document).ready(function () {
  $("#main_title").html("Dashboard");
 });
</script>

<template>
 <main class="w-full">
  <BookTable />
 </main>
</template>
