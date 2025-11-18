<template>
  <header class="rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 shadow-lg shadow-purple-900/50 backdrop-blur-xl">
    <nav class="flex flex-col items-center justify-between gap-4 text-slate-50 sm:flex-row">
      <RouterLink :to="{ name: 'home' }">
        <div class="flex items-center gap-3">
          <div class="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-weather-accent to-weather-accent-soft shadow-[0_0_40px_rgba(168,85,247,0.75)]">
            <i class="fa-solid fa-sun text-lg text-white"></i>
          </div>
          <div class="flex flex-col">
            <p class="text-xl font-semibold tracking-tight">El tiempo local</p>
            <p class="text-xs font-medium uppercase tracking-[0.25em] text-slate-500">Pronóstico global</p>
          </div>
        </div>
      </RouterLink>

      <div class="flex flex-1 items-center justify-end gap-3">
        <div class="hidden items-center gap-2 rounded-full bg-slate-900/80 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-slate-300 sm:flex">
          <span class="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
          <span>Tiempo en vivo</span>
        </div>
        <i class="fa-solid fa-circle-info flex h-8 w-8 items-center justify-center text-sm sm:text-base cursor-pointer rounded-full border border-white/15 bg-slate-900/80 text-white transition hover:border-weather-accent hover:bg-weather-accent/20"
          role="button" aria-label="Información de la aplicación" @click="toggleModal"></i>
        <i class="fa-solid fa-plus flex h-8 w-8 items-center justify-center text-sm sm:text-base cursor-pointer rounded-full border border-weather-accent/70 bg-weather-accent text-white shadow-md shadow-purple-900/60 transition hover:bg-weather-accent-soft"
          role="button" aria-label="Seguir ciudad" @click="addCity()" v-if="route.query.preview"></i>
      </div>

      <BaseModal :modalActive="modalActive" @close-modal="toggleModal">
        <div class="text-slate-50">
          <h1 class="text-2xl mb-1">Sobre nosotros:</h1>
          <p class="mb-4">
            La aplicación El Tiempo Local te permite consultar el tiempo actual y el tiempo futuro de las ciudades que
            elijas.
          </p>
          <h2 class="text-2xl">Cómo funciona:</h2>
          <ol class="list-decimal list-inside mb-4">
            <li>
              Busque su ciudad introduciendo el nombre en la barra de búsqueda.
            </li>
            <li>
              Seleccione una ciudad de los resultados. Esto le llevará a la información meteorológica actual de la
              ciudad seleccionada.
            </li>
            <li>
              Para seguir la ciudad, haga clic en el icono "+" en la esquina superior derecha. Esto guardará la ciudad
              para verla más tarde en la página de inicio.
            </li>
          </ol>

          <h2 class="text-2xl">Borrar una ciudad:</h2>
          <p>
            Si ya no desea realizar un seguimiento de una ciudad, simplemente la ciudad en la página de inicio. En la
            parte inferior de la página, encontrará la opción para eliminar la ciudad.
          </p>
        </div>

      </BaseModal>
    </nav>
  </header>
</template>

<script setup>
import { ref } from "vue";
import { uid } from "uid";
import { RouterLink, useRoute, useRouter } from "vue-router";
import BaseModal from "./BaseModal.vue"

const savedCities = ref([]);
const route = useRoute();
const router = useRouter();
const addCity = () => {
  if (localStorage.getItem('savedCities')) {
    savedCities.value = JSON.parse(localStorage.getItem('savedCities'));
  }
  const locationObj = {
    id: uid(),
    state: route.params.state,
    city: route.params.city,
    coords: {
      lat: route.query.lat,
      lng: route.query.lng,
    },
  };

  savedCities.value.push(locationObj);
  localStorage.setItem('savedCities', JSON.stringify(savedCities.value));

  let query = Object.assign({}, route.query);
  delete query.preview;
  query.id = locationObj.id;
  router.replace({ query });
}

const modalActive = ref(null);
const toggleModal = () => {
  modalActive.value = !modalActive.value;
};
</script>
