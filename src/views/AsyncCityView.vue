<template>
  <div class="flex flex-1 flex-col">
    <div v-if="route.query.preview" class="w-full rounded-t-3xl border-b border-amber-400/30 bg-amber-500/10 px-4 py-3 text-center text-xs text-amber-200">
      <p>
        Estas previsualizando esta ciudad, pulsa en el icono "+" para seguir esta ciudad.
      </p>
    </div>

    <section class="grid flex-1 gap-6 p-6 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
      <Transition name="city-panel-left">
        <div class="flex flex-col justify-between rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 px-6 py-8 text-slate-50 shadow-xl shadow-purple-950/40">
        <div class="flex flex-col items-start gap-3">
          <h1 class="text-3xl font-semibold tracking-tight sm:text-4xl">{{ route.params.city }}</h1>
          <p class="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
            Clima actual ·
            {{
              new Date(weatherData.currentTime).toLocaleDateString(
                "es-ES",
                {
                  weekday: "short",
                  day: "2-digit",
                  month: "long",
                }
              )
            }}
            ·
            {{
              new Date(weatherData.currentTime).toLocaleTimeString(
                "es-ES",
                {
                  timeStyle: "short",
                }
              )
            }}
          </p>
        </div>
        <div class="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div class="flex flex-col items-center sm:items-start">
            <p class="text-7xl font-semibold leading-none sm:text-8xl">
              {{ Math.round(weatherData.current.temp) }}&deg;
            </p>
            <p class="mt-3 inline-flex items-center gap-2 rounded-full bg-slate-900/80 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-slate-300">
              <span class="h-1.5 w-1.5 rounded-full bg-weather-accent-soft"></span>
              Sensación térmica {{ Math.round(weatherData.current.feels_like) }}&deg;
            </p>
            <div class="mt-2 flex flex-wrap gap-2 text-[11px] text-slate-300 sm:text-xs">
              <span class="inline-flex items-center gap-1 rounded-full bg-slate-900/70 px-3 py-1">
                <i class="fa-solid fa-droplet text-[10px]"></i>
                Humedad {{ weatherData.current.humidity }}%
              </span>
              <span class="inline-flex items-center gap-1 rounded-full bg-slate-900/70 px-3 py-1">
                <i class="fa-solid fa-wind text-[10px]"></i>
                Viento {{ Math.round(weatherData.current.wind_speed) }} km/h
              </span>
            </div>
            <p class="mt-2 inline-flex items-center gap-2 rounded-full bg-slate-950/70 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-slate-300">
              <i class="fa-solid fa-cloud text-[10px]"></i>
              {{ weatherData.current.weather[0].description }}
            </p>
          </div>
          <div class="flex flex-col items-center gap-3">
            <div class="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-weather-accent/30 to-weather-accent-soft/40 ring-2 ring-weather-accent/60">
              <img class="h-[90px] w-[90px] object-contain" :src="`http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`"
                alt="" />
            </div>
          </div>
        </div>
      </div>
      </Transition>

      <Transition name="city-panel-right">
        <div class="flex flex-col justify-between gap-4 rounded-3xl border border-white/10 bg-slate-950/70 p-5 text-slate-50">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Resumen diario</p>
            <h2 class="mt-2 text-lg font-semibold">Pronóstico rápido</h2>
            <p class="mt-1 text-sm text-slate-400">Consulta de un vistazo el tiempo de hoy y los próximos días.</p>
          </div>
          <div class="mt-4 space-y-2 text-sm text-slate-300">
            <p>Salida de sol: <span class="font-medium">{{ new Date(weatherData.currentTime).toLocaleTimeString('es-ES', { timeStyle: 'short' }) }}</span></p>
            <p>Máx hoy: <span class="font-medium">{{ Math.round(weatherData.daily[0].temp.max) }}&deg;</span></p>
            <p>Mín hoy: <span class="font-medium">{{ Math.round(weatherData.daily[0].temp.min) }}&deg;</span></p>
            <p>Índice UV: <span class="font-medium">{{ Math.round(weatherData.current.uvi) }}</span></p>
            <p>Prob. lluvia hoy: <span class="font-medium">{{ Math.round(weatherData.daily[0].pop * 100) }}%</span></p>
          </div>
        </div>
      </Transition>
    </section>

    <div class="w-full px-6 pb-6">
      <div class="mx-auto max-w-screen-md text-slate-50">
        <h2 class="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Tiempo por horas</h2>
        <div class="flex gap-6 overflow-x-auto pb-2">
          <div v-for="hourData in weatherData.hourly" :key="hourData.dt" class="flex min-w-[80px] flex-col items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/70 px-3 py-4 text-xs">
            <p class="whitespace-nowrap text-[11px] text-slate-300">
              {{
                new Date(
                  hourData.currentTime
                ).toLocaleTimeString("en-us", {
                  hour: "numeric",
                })
              }}
            </p>
            <img class="h-[40px] w-auto object-cover" :src="`http://openweathermap.org/img/wn/${hourData.weather[0].icon}@2x.png`"
              alt="" />
            <p class="text-base font-semibold">
              {{ Math.round(hourData.temp) }}&deg;
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="w-full px-6 pb-10">
      <div class="mx-auto max-w-screen-md text-slate-50">
        <h2 class="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">7 días de pronóstico</h2>
        <div class="space-y-2">
          <div v-for="day in weatherData.daily" :key="day.dt" class="flex flex-col gap-2 rounded-2xl border border-white/5 bg-slate-900/70 px-4 py-3 text-sm">
            <p class="capitalize text-slate-200">
              {{
                new Date(day.dt * 1000).toLocaleDateString(
                  "es-ES",
                  {
                    weekday: "long",
                  }
                )
              }}
            </p>
            <div class="flex items-center justify-between gap-4">
              <div class="flex items-center gap-3">
                <img class="h-[36px] w-[36px] object-cover" :src="`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`"
                  alt="" />
                <p class="text-xs text-slate-300 capitalize sm:text-sm">{{ day.weather[0].description }}</p>
              </div>
              <div class="flex flex-1 items-center justify-end gap-4">
                <div class="relative hidden h-[6px] w-32 items-center rounded-full bg-slate-800/90 sm:flex">
                  <div class="absolute h-full rounded-full bg-gradient-to-r from-sky-400 via-weather-accent-soft to-pink-500"
                    :style="getTempRangeStyle(day.temp.min, day.temp.max)"></div>
                </div>
                <div class="flex gap-3 text-[11px] text-slate-300 sm:text-xs">
                  <p>Máx: <span class="font-semibold">{{ Math.round(day.temp.max) }}&deg;</span></p>
                  <p>Mín: <span class="font-semibold">{{ Math.round(day.temp.min) }}&deg;</span></p>
                  <p v-if="day.pop !== undefined">Prob. lluvia: <span class="font-semibold">{{ Math.round(day.pop * 100) }}%</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="route.query.id" class="flex items-center justify-center gap-2 pb-10 text-sm text-slate-300 transition hover:text-red-400"
      @click="removeCity()">
      <i class="fa-solid fa-trash"></i>
      <p>Borrar ciudad</p>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
const getWeatherData = async () => {
  try {
    const weatherData = await axios.get(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${route.query.lat}&lon=${route.query.lng}&exclude=minutely&appid=${apiKey}&units=metric&lang=es`
    );

    const localOffset = new Date().getTimezoneOffset() * 60000;
    const utc = weatherData.data.current.dt * 1000 + localOffset;
    weatherData.data.currentTime =
      utc + 1000 * weatherData.data.timezone_offset;

    weatherData.data.hourly.forEach((hour) => {
      const utc = hour.dt * 1000 + localOffset;
      hour.currentTime =
        utc + 1000 * weatherData.data.timezone_offset;
    });

    await new Promise((res) => setTimeout(res, 1000));

    return weatherData.data;
  } catch (err) {
    console.log(err);
  }
};
const weatherData = await getWeatherData();

const TEMP_MIN = -10;
const TEMP_MAX = 40;
const getTempPosition = (temp) => {
  const clamped = Math.min(Math.max(temp, TEMP_MIN), TEMP_MAX);
  const range = TEMP_MAX - TEMP_MIN;
  return ((clamped - TEMP_MIN) / range) * 100;
};

const getTempRangeStyle = (min, max) => {
  const start = getTempPosition(min);
  const end = getTempPosition(max);
  const left = Math.min(start, end);
  const width = Math.max(5, Math.abs(end - start));
  return {
    left: `${left}%`,
    width: `${width}%`,
  };
};

const router = useRouter();
const removeCity = () => {
  const cities = JSON.parse(localStorage.getItem("savedCities"));
  const updateCities = cities.filter((city) => city.id !== route.query.id);
  localStorage.setItem('savedCities', JSON.stringify(updateCities));
  router.push({
    name: "home",
  })
};
</script>

<style scoped>
.city-panel-left-enter-active,
.city-panel-left-leave-active,
.city-panel-right-enter-active,
.city-panel-right-leave-active {
  transition: all 0.35s cubic-bezier(0.22, 0.61, 0.36, 1);
}

.city-panel-left-enter-from,
.city-panel-left-leave-to {
  opacity: 0;
  transform: translateX(-12px);
}

.city-panel-right-enter-from,
.city-panel-right-leave-to {
  opacity: 0;
  transform: translateX(12px);
}
</style>
