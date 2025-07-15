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
  },
  {
    id: 4,
    slug: 'monstera',
    name: 'Монстера деликатесная',
    price: 8000,
    images: [TopBackgroundImage, TopBackgroundImage],
    category: 'indoor',
    tags: ['easy-care', 'air-purifying', 'fast-growing', 'low-light'],
    description: `
      <p class="mb-4">Монстера - тропическое растение с эффектными резными листьями. Идеально подходит для украшения интерьера.</p>
    `
  },
  {
    id: 5,
    slug: 'aloe-vera',
    name: 'Алоэ вера',
    price: 1800,
    images: [TopBackgroundImage],
    category: 'indoor',
    tags: ['easy-care', 'medicinal', 'drought-tolerant'],
    description: `
      <p class="mb-4">Алоэ вера - суккулент с лечебными свойствами. Неприхотливое растение для начинающих.</p>
    `
  },
  {
    id: 6,
    slug: 'peace-lily',
    name: 'Спатифиллум',
    price: 3200,
    images: [TopBackgroundImage, TopBackgroundImage],
    category: 'indoor',
    tags: ['flowering', 'air-purifying', 'low-light'],
    description: `
      <p class="mb-4">Спатифиллум - элегантное растение с белыми цветами. Отлично очищает воздух.</p>
    `
  },
  {
    id: 7,
    slug: 'snake-plant',
    name: 'Сансевиерия',
    price: 2800,
    images: [TopBackgroundImage],
    category: 'indoor',
    tags: ['easy-care', 'air-purifying', 'low-light', 'drought-tolerant'],
    description: `
      <p class="mb-4">Сансевиерия - одно из самых неприхотливых комнатных растений. Выдерживает любые условия.</p>
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

const isAddingToCart = ref(false)

const addToCart = async () => {
  isAddingToCart.value = true
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  isAddingToCart.value = false
  // Show success message or redirect
}

const swiperModules = [Autoplay, Pagination]

const relatedPlants = computed(() => {
  return mockPlants.value.filter(p => p.id !== plant.value?.id).slice(0, 6)
})

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
      
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div class="lg:col-span-2">
          <div class="relative h-[70vh] min-h-[600px] rounded-3xl overflow-hidden shadow-2xl">
            <Swiper
              :modules="swiperModules"
              :slides-per-view="1"
              :space-between="0"
              :autoplay="{
                delay: 4000,
                disableOnInteraction: false,
              }"
              :pagination="{
                clickable: true,
                dynamicBullets: true,
              }"
              class="h-full w-full"
            >
              <SwiperSlide v-for="(image, index) in plant.images" :key="index">
                <div class="relative h-full">
                  <img :src="image" :alt="`${plant.name} - изображение ${index + 1}`" class="w-full h-full object-cover">
                </div>
              </SwiperSlide>
            </Swiper>
            
            <div class="absolute top-8 left-8 bg-gradient-to-r from-green to-green/80 text-white px-6 py-3 rounded-2xl text-2xl font-bold shadow-2xl z-10 backdrop-blur-sm">
              {{ plant.price }} ₸
            </div>
            
            <div class="absolute top-8 right-8 z-10">
              <button 
                @click="openShareModal"
                class="w-14 h-14 bg-white/20 backdrop-blur-md text-white rounded-2xl hover:bg-white/30 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-110 flex items-center justify-center"
              >
                <Icon name="mdi:share" class="w-6 h-6" />
              </button>
            </div>
            
            <div class="absolute -top-4 -right-4 w-8 h-8 bg-green rounded-full opacity-60 animate-pulse"></div>
            <div class="absolute -bottom-4 -left-4 w-6 h-6 bg-blue rounded-full opacity-60 animate-pulse delay-500"></div>
          </div>
        </div>
        
        <div class="flex flex-col justify-center">
          <div class="bg-white rounded-3xl p-8 shadow-2xl transform hover:scale-105 transition-all duration-500 relative overflow-hidden">
            <div class="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green/10 to-blue/10 rounded-full -mr-10 -mt-10"></div>
            <div class="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-blue/10 to-green/10 rounded-full -ml-8 -mb-8"></div>
            
            <div class="relative z-10">
              <h1 class="text-3xl lg:text-4xl font-bold text-blue mb-8 leading-tight">{{ plant.name }}</h1>
              
              <div class="space-y-4">
                <button 
                  @click="addToCart"
                  :disabled="isAddingToCart"
                  class="w-full bg-gradient-to-r from-green to-green/80 text-white font-bold py-4 px-6 rounded-2xl hover:from-green/90 hover:to-green/70 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  <Icon :name="isAddingToCart ? 'mdi:loading' : 'mdi:cart-plus'" :class="isAddingToCart ? 'animate-spin' : ''" class="w-5 h-5" />
                  {{ isAddingToCart ? 'Добавляем...' : 'В корзину' }}
                </button>
                
                <button class="w-full bg-gradient-to-r from-blue to-blue/80 text-white font-bold py-4 px-6 rounded-2xl hover:from-blue/90 hover:to-blue/70 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2">
                  <Icon name="mdi:heart-outline" class="w-5 h-5" />
                  В избранное
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="bg-white rounded-3xl p-8 shadow-xl transform hover:scale-[1.02] transition-all duration-500 mb-8">
        <div class="flex items-center gap-4 mb-6">
          <div class="w-12 h-12 bg-gradient-to-br from-green to-blue rounded-2xl flex items-center justify-center">
            <Icon name="mdi:leaf" class="w-6 h-6 text-white" />
          </div>
          <h2 class="text-2xl font-bold text-blue">Описание растения</h2>
        </div>
        <div class="prose prose-lg max-w-none text-gray-700 leading-relaxed" v-html="plant.description"></div>
      </div>
      
      <div class="bg-white rounded-3xl p-8 shadow-xl transform hover:scale-[1.02] transition-all duration-500">
        <div class="flex items-center gap-4 mb-6">
          <div class="w-12 h-12 bg-gradient-to-br from-blue to-green rounded-2xl flex items-center justify-center">
            <Icon name="mdi:tag-multiple" class="w-6 h-6 text-white" />
          </div>
          <h2 class="text-2xl font-bold text-blue">Теги растения</h2>
        </div>
        <div class="flex flex-wrap gap-3">
          <NuxtLink
            v-for="tag in displayTags"
            :key="tag.id"
            :to="`/plants?tags=${tag.id}`"
            class="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-green/10 text-green hover:bg-green hover:text-white transition-all duration-200 hover:scale-105 border border-green/20 hover:border-green"
          >
            #{{ tag.name }}
          </NuxtLink>
        </div>
      </div>
      
      <div class="mt-12">
        <div class="flex items-center gap-4 mb-8">
          <div class="w-12 h-12 bg-gradient-to-br from-green to-blue rounded-2xl flex items-center justify-center">
            <Icon name="mdi:heart" class="w-6 h-6 text-white" />
          </div>
          <h2 class="text-2xl font-bold text-blue">Вам возможно понравится</h2>
        </div>
        
        <div class="relative">
          <Swiper
            :modules="swiperModules"
            :slides-per-view="1"
            :space-between="20"
            :autoplay="{
              delay: 3000,
              disableOnInteraction: false,
            }"
            :breakpoints="{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
            }"
            class="related-plants-swiper"
          >
            <SwiperSlide v-for="relatedPlant in relatedPlants" :key="relatedPlant.id">
              <Plant
                :plant="relatedPlant"
                :show-tags="false"
                :all-tags="allTags"
              />
            </SwiperSlide>
          </Swiper>
        </div>
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