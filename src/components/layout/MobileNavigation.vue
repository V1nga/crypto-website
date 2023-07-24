<template>
    <div class="md:hidden">
        <div class="pl-2 pr-6 py-4 flex flex-nowrap mobile-nav mb-2">
            <img src="../../assets/logo.svg" alt="Finance logo" class="ml-3"/>
            <div class="flex-grow flex justify-end">
                <button>
                    <FIcon icon="stack"/>
                </button>
            </div>
        </div>
    </div>
</template>
<script setup>
import FIcon from '../kit/FIcon.vue';
</script>
<style scoped>
.mobile-nav {
    box-shadow: 0px 2px 6px 0px #0000000D;
    z-index: 50;
}
</style>