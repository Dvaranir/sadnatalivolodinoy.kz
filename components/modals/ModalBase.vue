<script setup>
import { Dialog, DialogPanel, DialogOverlay, TransitionRoot, TransitionChild } from '@headlessui/vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  maxWidth: {
    type: String,
    default: 'max-w-md'
  }
})

const emit = defineEmits(['close'])

const closeModal = () => {
  emit('close')
}
</script>

<template>
  <TransitionRoot :show="isOpen" as="template">
    <Dialog @close="closeModal">
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <TransitionChild
          enter="transition-opacity duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="transition-opacity duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <DialogOverlay class="fixed inset-0 bg-white/80" />
        </TransitionChild>
        
        <TransitionChild
          enter="transition-all duration-300"
          enter-from="opacity-0 scale-95"
          enter-to="opacity-100 scale-100"
          leave="transition-all duration-200"
          leave-from="opacity-100 scale-100"
          leave-to="opacity-0 scale-95"
          :class="`relative w-full ${maxWidth}`"
        >
          <DialogPanel class="relative p-32px bg-white text-16px rounded-lg w-full max-h-[95svh] overflow-y-auto shadow-[0_0_25px_-5px_rgba(0,0,0,0.25),0_0_10px_-6px_rgba(0,0,0,0.1)]">
            <button 
              @click="closeModal"
              class="absolute top-16px right-16px p-8px hover:bg-gray-100 rounded transition-colors"
            >
              <img src="~/assets/svg/cross.svg" alt="Cerrar" class="w-12px h-12px" />
            </button>

            <slot />
          </DialogPanel>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
