<script setup>
const props = defineProps({
  mode: {
    type: String,
    default: 'light'
  }
})

const userStore = useUserStore()

const buttonClasses = computed(() => {
  return props.mode === 'light' 
    ? 'text-white hover:text-white/80' 
    : 'text-white hover:text-white/80'
})

const badgeClasses = computed(() => {
  return 'absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold'
})
</script>

<template>
  <div class="flex items-center gap-4">
    <NuxtLink 
      to="/favorites"
      class="relative p-2 rounded-lg transition-colors duration-300"
      :class="buttonClasses"
    >
      <Icon name="mdi:heart" class="w-6 h-6" />
      <span 
        v-if="userStore.favoritesCount > 0"
        :class="badgeClasses"
      >
        {{ userStore.favoritesCount }}
      </span>
    </NuxtLink>
    
    <NuxtLink 
      to="/basket"
      class="relative flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-300"
      :class="buttonClasses"
    >
      <Icon name="mdi:cart" class="w-6 h-6" />
      <span class="font-medium">Корзина</span>
      <span 
        v-if="userStore.basketItemsCount > 0"
        :class="badgeClasses"
      >
        {{ userStore.basketItemsCount }}
      </span>
    </NuxtLink>
  </div>
</template>
