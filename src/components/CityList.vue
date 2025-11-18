<template>
    <div v-for="city in savedCities" :key="city.id">
        <CityCard :city="city" @click="goToCityView(city)" />
    </div>

    <div v-if="savedCities.length === 0" class="mt-4 rounded-2xl border border-dashed border-white/10 bg-slate-900/60 px-4 py-5 text-sm text-slate-300">
        <p class="font-medium">Aún no has añadido ninguna ubicación.</p>
        <p class="mt-1 text-xs text-slate-400">Empieza buscando una ciudad en el buscador superior y añádela con el icono "+".</p>
    </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import CityCard from "./CityCard.vue";
import { useRouter } from "vue-router";

const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

const savedCities = ref([]);
const getCities = async () => {
    if (localStorage.getItem('savedCities')) {
        savedCities.value = JSON.parse(localStorage.getItem("savedCities"));

        const requests = [];
        savedCities.value.forEach((city) => {
            requests.push(
                axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${city.coords.lat}&lon=${city.coords.lng}&exclude=minutely&appid=${apiKey}&units=metric&lang=es`)
            );
        });

        const weatherData = await Promise.all(requests);

        await new Promise((res) => setTimeout(res, 1000));

        weatherData.forEach((value, index) => {
            savedCities.value[index].weather = value.data;
        });
    };
};
await getCities();

const router = useRouter();
const goToCityView = (city) => {
    router.push({
        name: 'cityView',
        params: { state: city.state, city: city.city },
        query: { id: city.id, lat: city.coords.lat, lng: city.coords.lng },
    });
};
</script>