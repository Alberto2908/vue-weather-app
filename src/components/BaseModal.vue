<template>
    <Teleport to="body">
        <Transition name="modal-outer">
            <div v-show="modalActive"
                class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 backdrop-blur-sm"
                @click.self="emit('close-modal')">
                <Transition name="modal-inner">
                    <div v-if="modalActive" role="dialog" aria-modal="true" class="relative max-w-lg w-full rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950/95 p-6 text-slate-50 shadow-[0_24px_80px_rgba(15,23,42,0.9)] ring-1 ring-weather-accent/25">
                        <button type="button" class="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-slate-800/80 text-slate-300 text-sm hover:bg-slate-700 hover:text-white"
                            aria-label="Cerrar" @click="emit('close-modal')">
                            <i class="fa-solid fa-xmark"></i>
                        </button>
                        <slot />
                        <button class="mt-8 rounded-full bg-weather-accent px-6 py-2 text-sm font-medium text-slate-950 shadow-sm transition hover:bg-weather-accent-soft" @click="emit('close-modal')">
                            Cerrar
                        </button>
                    </div>
                </Transition>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from "vue";

const emit = defineEmits(['close-modal']);
defineProps({
    modalActive: {
        type: Boolean,
        default: false,
    },
})

const handleKeydown = (event) => {
    if (event.key === 'Escape') {
        emit('close-modal');
    }
};

onMounted(() => {
    window.addEventListener('keydown', handleKeydown);
});

onBeforeUnmount(() => {
    window.removeEventListener('keydown', handleKeydown);
});
</script>

<style scoped>
.modal-outer-enter-active,
.modal-outer-leave-active {
    transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-outer-enter-from,
.modal-outer-leave-to {
    opacity: 0;
}

.modal-inner-enter-active {
    transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}

.modal-inner-leave-active {
    transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-inner-enter-from {
    opacity: 0;
    transform: scale(0.8);
}

.modal-inner-leave-to {
    transform: scale(0.8);
}
</style>