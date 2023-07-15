<template>
  <div class="flex h-full bg-blue-light">
    <Navigation/>
    
    <div class="p-6 2xl:p-10 h-full w-full">
      <HomePage/>
    </div>
  </div>
</template>
<script setup>
import Navigation from './components/layout/Navigation.vue';
import HomePage from './pages/client/HomePage.vue';
</script>