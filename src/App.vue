<template>
  <div class="flex flex-col min-h-screen font-Roboto bg-weather-primary">
    <SiteNavigation />
    <RouterView class="flex-1" v-slot="{ Component }">
      <Transition name="page">
        <component :is="Component" :key="$route.fullPath" />
      </Transition>
    </RouterView>
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
import SiteNavigation from "./components/SiteNavigation.vue";
</script>

<style>
.page-enter-active {
  transition: 600ms ease all;
  transform-origin: top;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(30px) scale(0.98);
}
</style>