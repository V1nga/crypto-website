<template>
  <div class="flex h-full min-h-screen bg-blue-light">
    <Navigation/>
    
    <div class="h-full w-full">
      <router-view/>
      <!-- <HomePage/> -->
    </div>
  </div>
</template>
<script setup>
import Navigation from './components/layout/Navigation.vue';
</script>