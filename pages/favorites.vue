<script setup>
const userStore = useUserStore()

const allTags = ref([
  { id: 'easy-care', name: 'Простой уход' },
  { id: 'low-light', name: 'Тенелюбивые' },
  { id: 'air-purifying', name: 'Очищают воздух' },
  { id: 'flowering', name: 'Цветущие' },
  { id: 'drought-tolerant', name: 'Засухоустойчивые' },
  { id: 'fast-growing', name: 'Быстрорастущие' },
  { id: 'fragrant', name: 'Ароматные' },
  { id: 'medicinal', name: 'Лекарственные' }
])

const mockPlants = ref([
  {
    id: 1,
    slug: 'ficus-benjamin',
    name: 'Фикус Бенджамина',
    price: 5000,
    image: '/assets/images/pages/home/top_background.jpeg',
    tags: ['easy-care', 'air-purifying', 'low-light']
  },
  {
    id: 2,
    slug: 'rose-red',
    name: 'Роза красная',
    price: 3500,
    image: '/assets/images/pages/home/top_background.jpeg',
    tags: ['flowering', 'fragrant']
  },
  {
    id: 3,
    slug: 'lavender',
    name: 'Лаванда',
    price: 2500,
    image: '/assets/images/pages/home/top_background.jpeg',
    tags: ['fragrant', 'medicinal', 'drought-tolerant']
  },
  {
    id: 4,
    slug: 'monstera',
    name: 'Монстера деликатесная',
    price: 8000,
    image: '/assets/images/pages/home/top_background.jpeg',
    tags: ['easy-care', 'air-purifying', 'fast-growing', 'low-light']
  },
  {
    id: 5,
    slug: 'aloe-vera',
    name: 'Алоэ вера',
    price: 1800,
    image: '/assets/images/pages/home/top_background.jpeg',
    tags: ['easy-care', 'medicinal', 'drought-tolerant']
  },
  {
    id: 6,
    slug: 'peace-lily',
    name: 'Спатифиллум',
    price: 3200,
    image: '/assets/images/pages/home/top_background.jpeg',
    tags: ['flowering', 'air-purifying', 'low-light']
  },
  {
    id: 7,
    slug: 'snake-plant',
    name: 'Сансевиерия',
    price: 2800,
    image: '/assets/images/pages/home/top_background.jpeg',
    tags: ['easy-care', 'air-purifying', 'low-light', 'drought-tolerant']
  }
])

const favoritePlants = computed(() => {
  return mockPlants.value.filter(plant => userStore.favorites.includes(plant.id))
})

const breadcrumbs = computed(() => [
  { label: 'Главная', to: '/' },
  { label: 'Избранное' }
])
</script>

<template>
  <div class="min-h-screen bg-creme">
    <div class="container mx-auto px-4 py-8">
      <Breadcrumbs :items="breadcrumbs" />
      
      <div class="flex items-center gap-4 mb-8">
        <div class="w-12 h-12 bg-gradient-to-br from-red-500 to-red-400 rounded-2xl flex items-center justify-center">
          <Icon name="mdi:heart" class="w-6 h-6 text-white" />
        </div>
        <h1 class="text-3xl font-bold text-blue">Избранное</h1>
        <span class="text-lg text-gray-600">({{ favoritePlants.length }})</span>
      </div>
      
      <div v-if="favoritePlants.length === 0" class="text-center py-16">
        <Icon name="mdi:heart-outline" class="w-24 h-24 text-gray-400 mx-auto mb-4" />
        <p class="text-xl text-gray-600 mb-4">Ваш список избранного пуст</p>
        <NuxtLink to="/plants" class="inline-block bg-green text-white px-6 py-3 rounded-lg hover:bg-green/90 transition-colors duration-300">
          Перейти к каталогу
        </NuxtLink>
      </div>
      
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <Plant
          v-for="plant in favoritePlants"
          :key="plant.id"
          :plant="plant"
          :show-tags="true"
          :all-tags="allTags"
        />
      </div>
    </div>
  </div>
</template>
