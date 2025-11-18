<template>
    <div class="flex cursor-pointer items-center gap-4 rounded-2xl border border-white/5 bg-slate-900/80 px-5 py-4 shadow-md shadow-purple-900/40 transition-transform transition-shadow duration-200 hover:-translate-y-0.5 hover:border-weather-accent hover:bg-slate-900 hover:shadow-[0_18px_40px_rgba(88,28,135,0.5)]">
        <div class="flex flex-1 flex-col">
            <h2 class="text-lg font-semibold tracking-tight sm:text-xl">{{ city.city }}</h2>
            <h3 class="text-xs text-slate-400 sm:text-sm">{{ city.state }}</h3>
        </div>

        <div class="flex flex-col items-end gap-1">
            <p class="self-end text-2xl font-semibold sm:text-3xl">
                {{ Math.round(city.weather.current.temp) }}&deg;
            </p>
            <div class="flex gap-2 text-[11px] text-slate-300 sm:text-xs">
                <span class="whitespace-nowrap">
                    Máx:
                    {{ Math.round(city.weather.daily[0].temp.max) }}&deg;
                </span>
                <span class="whitespace-nowrap">
                    Mín:
                    {{ Math.round(city.weather.daily[0].temp.min) }}&deg;
                </span>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    city: {
        type: Object,
        default: () => {},
    },
});
</script>