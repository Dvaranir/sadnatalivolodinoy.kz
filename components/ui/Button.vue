<script setup>
const props = defineProps({
  tag: {
    type: String,
    default: 'button',
    validator: (value) => ['button', 'a', 'nuxt-link'].includes(value)
  },
  variant: {
    type: String,
    default: 'blue',
    validator: (value) => ['blue', 'white', 'blue'].includes(value)
  },
  href: {
    type: String,
    default: '#'
  },
  to: {
    type: [String, Object],
    default: undefined
  }
})

const emit = defineEmits(['click'])

const variantClasses = {
  'blue': 'bg-blue text-white hover:bg-blue',
  'white': 'bg-white/85 text-blue hover:bg-white/95',
  'blue': 'bg-blue text-white hover:bg-blue'
}

const handleClick = (event) => {
  emit('click', event)
}
</script>

<template>
  <NuxtLink 
    v-if="tag === 'nuxt-link'"
    :to="to"
    :class="[
      'block p-12px w-fit mx-auto rounded-md transition-colors duration-200 ease-in-out',
      variantClasses[variant]
    ]"
    @click="handleClick"
  >
    <slot />
  </NuxtLink>
  <a 
    v-else-if="tag === 'a'"
    :href="href"
    :class="[
      'block p-12px w-fit mx-auto rounded-md transition-colors duration-200 ease-in-out',
      variantClasses[variant]
    ]"
    @click="handleClick"
  >
    <slot />
  </a>
  <button 
    v-else
    :class="[
      'block p-12px w-fit mx-auto rounded-md transition-colors duration-200 ease-in-out',
      variantClasses[variant]
    ]"
    @click="handleClick"
  >
    <slot />
  </button>
</template>
