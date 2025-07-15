<script setup>
const props = defineProps({
  backgroundImage: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <section
    class="py-[160px] px-[64px] relative bg-transparent overflow-hidden h-fit bg-cover bg-center flex flex-col items-center justify-center"
  >
    <img class="absolute w-full h-full object-cover object-center z-[-1]" :src="props.backgroundImage" alt="" />
    <div class="absolute inset-0 bg-black/60 backdrop-blur-[3px] z-[-1]"></div>
    <slot />
  </section>
</template>

<style></style>