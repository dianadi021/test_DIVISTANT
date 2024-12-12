<script setup></script>

<template>
 <div class="bg-gray-100 flex justify-center items-center h-screen">
  <div class="bg-white w-full max-w-sm p-6 rounded-lg shadow-lg">
   <h2 class="text-2xl font-bold text-center mb-6">Login</h2>
   <form id="formLogin">
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
      class="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
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
