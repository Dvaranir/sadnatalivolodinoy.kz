<script setup>
const { locale, locales: allLocales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const props = defineProps({
  mode: {
    type: String,
    default: 'light',
  },
})

const locales = computed(() => {
  return allLocales.value.filter(l => l.code !== locale.value)
})

const isDropdownOpen = ref(false)
const buttonRef = ref(null)
const isDropdownAbove = ref(false)

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
  
  if (isDropdownOpen.value && buttonRef.value) {
    nextTick(() => {
      const rect = buttonRef.value.getBoundingClientRect()
      const spaceBelow = window.innerHeight - rect.bottom
      const spaceAbove = rect.top
      
      isDropdownAbove.value = spaceBelow < 120 && spaceAbove > 120
    })
  }
}

const closeDropdown = () => {
  setTimeout(() => {
    isDropdownOpen.value = false
  }, 150)
}

</script>

<template>
  <div class="relative">
    <button 
      ref="buttonRef"
      @click="toggleDropdown"
      @blur="closeDropdown"
      class="flex items-center space-x-1 px-1 py-1 text-sm rounded-md hover:bg-gray-50 h-8"
    >
      <span :class="['font-medium max-md:text-20px', {'text-blue': props.mode === 'light'}, {'text-white': props.mode === 'dark'}]">{{ allLocales.find(l => l.code === locale)?.name || locale.toUpperCase() }}</span>
      <svg 
        :class="['w-4 h-4 transition-transform duration-200', {'rotate-180': isDropdownOpen}, {'text-blue': props.mode === 'light'}, {'text-white': props.mode === 'dark'}]"
        fill="none" 
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
    
    <div 
      v-if="isDropdownOpen && locales.length"
      :class="[
        'absolute left-0 z-10 bg-white border border-gray-200 rounded-md shadow-lg',
        isDropdownAbove ? 'bottom-full mb-1' : 'top-full mt-1'
      ]"
    >
      <NuxtLink
        v-for="availableLocale in locales"
        :key="availableLocale.code"
        :to="switchLocalePath(availableLocale.code)"
        class="block px-3 py-1 text-sm text-center hover:bg-gray-100 rounded-md transition-colors duration-150 whitespace-nowrap max-md:text-20px"
      >
        {{ availableLocale.name }}
      </NuxtLink>
    </div>
  </div>
</template>
