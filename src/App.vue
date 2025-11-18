<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 font-Roboto text-slate-50">
    <div class="mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-6">
      <SiteNavigation />
      <main class="mt-4 flex flex-1 flex-col rounded-3xl border border-white/5 bg-slate-900/60 shadow-[0_0_100px_rgba(124,58,237,0.35)] backdrop-blur-xl">
        <RouterView class="flex-1" v-slot="{ Component }">
          <Transition name="page">
            <component :is="Component" :key="$route.fullPath" />
          </Transition>
        </RouterView>
      </main>
    </div>
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