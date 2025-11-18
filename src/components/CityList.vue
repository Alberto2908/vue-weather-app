<template>
    <div v-for="city in savedCities" :key="city.id">
        <CityCard :city="city" @click="goToCityView(city)" />
    </div>

    <p v-if="savedCities.length === 0">
        No se han añadido ubicaciones. Para empezar a rastrear una ubicación, realice una búsqueda en el campo de
        arriba.
    </p>
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