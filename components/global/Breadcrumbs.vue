<script setup>
const props = defineProps({
  items: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <nav class="flex items-center space-x-2 text-sm text-gray-600 mb-6">
    <template v-for="(item, index) in items" :key="index">
      <NuxtLink 
        v-if="item.to" 
        :to="item.to"
        class="hover:text-green transition-colors duration-200"
      >
        {{ item.label }}
      </NuxtLink>
      <span v-else class="text-blue font-medium">{{ item.label }}</span>
      
      <Icon 
        v-if="index < items.length - 1"
        name="mdi:chevron-right" 
        class="w-4 h-4 text-gray-400"
      />
    </template>
  </nav>
</template>


