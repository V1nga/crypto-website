<template>
  <div>
    <MobileNavigation/>
    
    <div class="flex h-full min-h-screen sm:bg-blue-light">
      <Navigation/>
      
      <div class="h-full w-full">
        <router-view/>
        <!-- <HomePage/> -->
      </div>
    </div>
  </div>
</template>
<script setup>
import Navigation from './components/layout/Navigation.vue';
import MobileNavigation from './components/layout/MobileNavigation.vue';
</script>