<template>
  <main class="flex flex-1 flex-col gap-6 rounded-3xl p-6 text-slate-50 sm:p-8">
    <section class="grid gap-6 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
      <div class="relative rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-6 shadow-xl shadow-purple-950/40">
        <div class="mb-4 flex items-center justify-between">
          <div>
            <h1 class="text-xl font-semibold tracking-tight sm:text-2xl">Busca una ciudad</h1>
            <p class="mt-1 text-sm text-slate-400">Explora el mapa mundial y guarda tus ubicaciones favoritas.</p>
          </div>
          <div class="hidden h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-weather-accent/20 to-weather-accent-soft/40 ring-1 ring-weather-accent/40 sm:flex">
            <i class="fa-solid fa-globe text-2xl text-weather-accent-soft"></i>
          </div>
        </div>
        <div class="relative">
          <input type="text" v-model="searchQuery" @input="getSearchResults" placeholder="Busca una ciudad o país"
            class="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm placeholder:text-slate-400 shadow-sm outline-none transition focus:border-weather-accent focus:bg-slate-900 focus:ring-2 focus:ring-weather-accent/40" />
          <ul class="absolute top-[52px] z-10 w-full rounded-2xl border border-white/10 bg-slate-950/95 py-2 px-1 text-slate-50 shadow-2xl backdrop-blur"
            v-if="mapboxSearchResults">
            <p v-if="searchError">Lo siento, algo salió mal, intentalo de nuevo.</p>
            <p v-if="!searchError && mapboxSearchResults.length === 0">No se encontraron resultados, prueba otra búsqueda.
            </p>
            <template v-else>
              <li v-for="searchResult in mapboxSearchResults" :key="searchResult.id" class="cursor-pointer rounded-xl py-2 px-3 text-sm hover:bg-slate-800/80"
                @click="previewCity(searchResult)">
                {{ searchResult.place_name }}
              </li>
            </template>
          </ul>
        </div>
      </div>
      <div class="flex flex-col justify-between rounded-3xl border border-white/10 bg-slate-950/70 p-5">
        <div>
          <p class="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Resumen</p>
          <h2 class="mt-2 text-lg font-semibold">Tus ubicaciones guardadas</h2>
          <p class="mt-1 text-sm text-slate-400">Accede rápidamente al clima actual y al pronóstico extendido.</p>
        </div>
        <div class="mt-4 flex flex-wrap gap-2 text-xs text-slate-300">
          <span class="rounded-full bg-slate-800/80 px-3 py-1">Tiempo actual</span>
          <span class="rounded-full bg-slate-800/80 px-3 py-1">Pronóstico 7 días</span>
          <span class="rounded-full bg-slate-800/80 px-3 py-1">Pronóstico por horas</span>
          <span class="rounded-full bg-slate-800/80 px-3 py-1">Ciudades favoritas</span>
        </div>
      </div>
    </section>

    <section class="mt-2 flex flex-1 flex-col">
      <h2 class="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Localizaciones</h2>
      <div class="flex flex-1 flex-col gap-4">
        <Suspense>
          <CityList />
          <template #fallback>
            <CityCardSkeleton />
          </template>
        </Suspense>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, Suspense } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import CityList from "@/components/CityList.vue";
import CityCardSkeleton from "@/components/CityCardSkeleton.vue";

const router = useRouter();
const previewCity = (searchResult) => {
  console.log(searchResult);
  const [city, state] = searchResult.place_name.split(",");
  router.push({
    name: "cityView",
    params: { state: state.replaceAll(" ", ""), city: city },
    query: {
      lat: searchResult.geometry.coordinates[1],
      lng: searchResult.geometry.coordinates[0],
      preview: true,
    },
  });
};

const mapboxAPIKey = import.meta.env.VITE_MAPBOX_API_KEY;
const searchQuery = ref("");
const queryTimeOut = ref(null);
const mapboxSearchResults = ref(null);
const searchError = ref(null);

const getSearchResults = () => {
  clearTimeout(queryTimeOut.value);
  queryTimeOut.value = setTimeout(async () => {
    if (searchQuery.value !== "") {
      try {
        const result = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}.json?access_token=${mapboxAPIKey}&types=place`
        );
        mapboxSearchResults.value = result.data.features;
      } catch {
        searchError.value = true;
      }
      return;
    }
    mapboxSearchResults.value = null;
  }, 100);
};
</script>
