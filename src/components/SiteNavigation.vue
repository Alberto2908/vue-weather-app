<template>
  <header class="sticky top-0 bg-weather-primary shadow-lg">
    <nav class="container flex flex-col sm:flex-row items-center gap-4 text-white py-6">
      <RouterLink :to="{ name: 'home' }">
        <div class="flex items-center gap-3">
          <i class="fa-solid fa-sun text-2xl"></i>
          <p class="text-2xl">El tiempo local</p>
        </div>
      </RouterLink>

      <div class="flex gap-3 flex-1 justify-end">
        <i class="fa-solid fa-circle-info text-xl hover:text-weather-secondary duration-150 cursor-pointer"
          @click="toggleModal"></i>
        <i class="fa-solid fa-plus text-xl hover:text-weather-secondary duration-150 cursor-pointer"></i>
      </div>

      <BaseModal :modalActive="modalActive" @close-modal="toggleModal">
        <div class="text-black">
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
import { RouterLink } from "vue-router";
import BaseModal from "./BaseModal.vue"

const modalActive = ref(null);
const toggleModal = () => {
  modalActive.value = !modalActive.value;
};
</script>
