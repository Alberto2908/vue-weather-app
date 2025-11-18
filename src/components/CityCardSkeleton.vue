<template>
    <div class="flex py-6 px-3 rounded-2xl border border-white/5 bg-slate-900/80 shadow-md shadow-purple-900/40">
        <div class="flex flex-col flex-1 gap-2">
            <AnimatedPlaceholder class="max-w-[50%]" />
            <AnimatedPlaceholder class="max-w-[40%]" />
        </div>

        <div class="flex flex-col items-end flex-1 gap-2">
            <AnimatedPlaceholder class="max-w-[50px] w-full" />
            <AnimatedPlaceholder class="max-w-[75px] w-full" />
        </div>
    </div>
</template>

<script setup>
import AnimatedPlaceholder from './AnimatedPlaceholder.vue';


</script>
