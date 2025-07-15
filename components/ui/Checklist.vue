<script setup>
defineProps({
  items: {
    type: Array,
    required: true
  },
  useBullets: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <ul class="space-y-2">
    <li v-for="(item, index) in items" :key="index" class="flex items-start gap-3">
      <div v-if="useBullets" class="w-1.5 h-1.5 bg-current rounded-full mt-2 flex-shrink-0"></div>
      <img v-else src="/assets/svg/tick.svg" alt="✓" class="w-5 h-5 flex-shrink-0" />
      <span>{{ item }}</span>
    </li>
  </ul>
</template>
