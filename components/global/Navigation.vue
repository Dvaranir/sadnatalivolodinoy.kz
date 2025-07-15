<script setup>
const localePath = useLocalePath()

const props = defineProps({
  mode: {
    type: String,
    default: 'light',
  },
})

const emit = defineEmits(['navigate'])

const pages = computed(() => [
  { name: 'navigation.home', path: localePath('/') },
  { name: 'navigation.categories', path: localePath('/categories') },
  { name: 'navigation.plants', path: localePath('/plants') },
  { name: 'navigation.about', path: localePath('/about') },
])

const handleNavClick = () => {
  emit('navigate')
}
</script>

<template>
  <ul class="flex gap-16px max-lg:flex-col max-lg:space-y-2">
    <li v-for="page in pages" :key="page.path" class="text-white">
      <NuxtLink 
        :to="page.path" 
        class="hover:underline font-400 max-md:text-24px max-md:font-bold text-white"
        active-class="border-b-2 border-white"
        @click="handleNavClick"
      >
        {{ $t(page.name) }}
      </NuxtLink>
    </li>
  </ul>
</template>
