<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import TopBackgroundImage from '~/assets/images/pages/home/top_background.jpeg'

const route = useRoute()
const router = useRouter()

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
    images: [TopBackgroundImage, TopBackgroundImage, TopBackgroundImage],
    category: 'indoor',
    tags: ['easy-care', 'air-purifying', 'low-light'],
    description: `
      <p class="mb-4">Фикус Бенджамина - одно из самых популярных комнатных растений благодаря своей неприхотливости и эффектному внешнему виду. Это вечнозеленое дерево с густой кроной и мелкими глянцевыми листьями.</p>
      
      <h3 class="text-lg font-bold text-blue mb-2">Особенности ухода:</h3>
      <ul class="list-disc list-inside mb-4 space-y-1">
        <li>Предпочитает яркий рассеянный свет</li>
        <li>Умеренный полив, не допускать пересыхания</li>
        <li>Температура 18-25°C</li>
        <li>Регулярное опрыскивание листьев</li>
      </ul>
      
      <h3 class="text-lg font-bold text-blue mb-2">Польза:</h3>
      <p class="mb-4">Фикус Бенджамина отлично очищает воздух от вредных веществ, создавая здоровую атмосферу в помещении.</p>
    `
  },
  {
    id: 2,
    slug: 'rose-red',
    name: 'Роза красная',
    price: 3500,
    images: [TopBackgroundImage, TopBackgroundImage],
    category: 'flowers',
    tags: ['flowering', 'fragrant'],
    description: `
      <p class="mb-4">Классическая красная роза - символ любви и страсти. Прекрасное растение для сада с яркими ароматными цветами.</p>
      
      <h3 class="text-lg font-bold text-blue mb-2">Особенности ухода:</h3>
      <ul class="list-disc list-inside mb-4 space-y-1">
        <li>Солнечное место, защищенное от сквозняков</li>
        <li>Регулярный полив под корень</li>
        <li>Подкормка в период вегетации</li>
        <li>Обрезка осенью и весной</li>
      </ul>
    `
  },
  {
    id: 3,
    slug: 'lavender',
    name: 'Лаванда',
    price: 2500,
    images: [TopBackgroundImage, TopBackgroundImage, TopBackgroundImage, TopBackgroundImage],
    category: 'herbs',
    tags: ['fragrant', 'medicinal', 'drought-tolerant'],
    description: `
      <p class="mb-4">Лаванда - ароматное растение с множеством полезных свойств. Используется в медицине, косметологии и кулинарии.</p>
      
      <h3 class="text-lg font-bold text-blue mb-2">Лечебные свойства:</h3>
      <ul class="list-disc list-inside mb-4 space-y-1">
        <li>Успокаивающее действие</li>
        <li>Антисептические свойства</li>
        <li>Помогает при бессоннице</li>
        <li>Отпугивает насекомых</li>
      </ul>
    `
  }
])

const plant = computed(() => {
  return mockPlants.value.find(p => p.slug === route.params.slug)
})

const breadcrumbs = computed(() => [
  { label: 'Главная', to: '/' },
  { label: 'Каталог растений', to: '/plants' },
  { label: plant.value?.name || 'Растение не найдено' }
])

const displayTags = computed(() => {
  if (!plant.value?.tags || plant.value.tags.length === 0) return []
  return plant.value.tags.map(tagId => {
    const tag = allTags.value.find(t => t.id === tagId)
    return tag ? { id: tagId, name: tag.name } : { id: tagId, name: tagId }
  })
})

const isShareModalOpen = ref(false)

const shareData = computed(() => ({
  url: `${process.client ? window.location.origin : ''}/plants/${plant.value?.slug}`,
  title: `${plant.value?.name} - ${plant.value?.price} ₸`
}))

const openShareModal = () => {
  isShareModalOpen.value = true
}

const closeShareModal = () => {
  isShareModalOpen.value = false
}

const swiperModules = [Autoplay, Pagination]

if (!plant.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Растение не найдено'
  })
}
</script>

<template>
  <div class="min-h-screen bg-creme">
    <div class="container mx-auto px-4 py-8">
      <Breadcrumbs :items="breadcrumbs" />
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div class="space-y-4">
          <h1 class="text-3xl font-bold text-blue">{{ plant.name }}</h1>
          
          <div class="flex flex-wrap gap-2">
            <NuxtLink
              v-for="tag in displayTags"
              :key="tag.id"
              :to="`/plants?tags=${tag.id}`"
              class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green/10 text-green hover:bg-green hover:text-white transition-colors duration-200"
            >
              #{{ tag.name }}
            </NuxtLink>
          </div>
        </div>
        
        <div class="lg:order-first">
          <div class="relative rounded-3xl overflow-hidden shadow-2xl">
            <Swiper
              :modules="swiperModules"
              :slides-per-view="1"
              :space-between="0"
              :autoplay="{
                delay: 3000,
                disableOnInteraction: false,
              }"
              :pagination="{
                clickable: true,
                dynamicBullets: true,
              }"
              class="h-96 w-full"
            >
              <SwiperSlide v-for="(image, index) in plant.images" :key="index">
                <img :src="image" :alt="`${plant.name} - изображение ${index + 1}`" class="w-full h-full object-cover">
              </SwiperSlide>
            </Swiper>
            
            <div class="absolute top-4 left-4 bg-green text-white px-4 py-2 rounded-full text-lg font-bold shadow-lg z-10">
              {{ plant.price }} ₸
            </div>
          </div>
          
          <div class="flex gap-4 mt-6">
            <button class="flex-1 bg-green text-white font-medium py-3 px-6 rounded-2xl hover:bg-green/90 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
              <Icon name="mdi:cart-plus" class="w-5 h-5 mr-2 inline" />
              В корзину
            </button>
            <button 
              @click="openShareModal"
              class="bg-blue text-white font-medium py-3 px-6 rounded-2xl hover:bg-blue/90 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Icon name="mdi:share" class="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      
      <div class="bg-white rounded-3xl p-8 shadow-xl">
        <h2 class="text-2xl font-bold text-blue mb-6">Описание растения</h2>
        <div class="prose prose-lg max-w-none text-gray-700" v-html="plant.description"></div>
      </div>
      
      <ShareModal
        :is-open="isShareModalOpen"
        :share-url="shareData.url"
        :title="shareData.title"
        @close="closeShareModal"
      />
    </div>
  </div>
</template>