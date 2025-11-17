<template>
    <div>
        <Suspense>
            <AsyncCityView />
            <template #fallback>
                <p>Cargando...</p>
            </template>
        </Suspense>
    </div>
</template>

<script setup>
import AsyncCityView from "./AsyncCityView.vue";

</script>
