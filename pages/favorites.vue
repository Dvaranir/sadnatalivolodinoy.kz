<script setup>
const userStore = useUserStore()

const breadcrumbs = [
  { label: 'Главная', to: '/' },
  { label: 'Избранное' }
]

const mockPlants = [
  {
    id: 1,
    name: 'Роза красная',
    price: 2500,
    image: '/assets/images/plant1.jpg',
    slug: 'rosa-krasnaya',
    tags: [1, 2]
  },
  {
    id: 2,
    name: 'Тюльпан желтый',
    price: 1800,
    image: '/assets/images/plant2.jpg',
    slug: 'tulpan-zheltyi',
    tags: [1, 3]
  },
  {
    id: 3,
    name: 'Пионы белые',
    price: 3200,
    image: '/assets/images/plant3.jpg',
    slug: 'piony-belye',
    tags: [2, 3]
  },
  {
    id: 4,
    name: 'Лилии розовые',
    price: 2800,
    image: '/assets/images/plant4.jpg',
    slug: 'lilii-rozovye',
    tags: [1, 2, 3]
  },
  {
    id: 5,
    name: 'Хризантемы',
    price: 2200,
    image: '/assets/images/plant5.jpg',
    slug: 'khrizantemy',
    tags: [2]
  },
  {
    id: 6,
    name: 'Гербера оранжевая',
    price: 1900,
    image: '/assets/images/plant6.jpg',
    slug: 'gerbera-oranzhevaya',
    tags: [1, 3]
  }
]

const mockTags = [
  { id: 1, name: 'Цветы' },
  { id: 2, name: 'Многолетние' },
  { id: 3, name: 'Декоративные' }
]

const favoritePlants = computed(() => {
  return mockPlants.filter(plant => userStore.isFavorite(plant.id))
})
</script>

<template>
  <div class="min-h-screen bg-creme">
    <div class="container mx-auto px-4 py-8">
      <Breadcrumbs :items="breadcrumbs" />
      
      <h1 class="text-3xl font-bold text-blue mb-8">Избранное</h1>
      
      <div v-if="favoritePlants.length === 0" class="text-center py-16">
        <p class="text-gray-600 text-lg mb-4">В избранном пока нет товаров</p>
        <NuxtLink to="/plants" class="inline-block bg-green text-white px-6 py-3 rounded-lg hover:bg-green/90 transition-colors">
          Перейти к каталогу
        </NuxtLink>
      </div>
      
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-max">
        <Plant
          v-for="plant in favoritePlants"
          :key="plant.id"
          :plant="plant"
          :show-tags="true"
          :all-tags="mockTags"
          class="max-w-sm mx-auto w-full"
        />
      </div>
    </div>
  </div>
</template>
