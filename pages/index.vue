<script setup>
import TopBackgroundImage from '~/assets/images/pages/home/top_background.jpeg';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const { t, tm, rt } = useI18n();
const coreStore = useCoreStore()
const localePath = useLocalePath()

const openContactModal = () => {
  coreStore.openContactModal()
}

// Placeholder data for categories
const categories = ref([
  {
    id: 1,
    name: 'Комнатные растения',
    count: 25,
    image: TopBackgroundImage
  },
  {
    id: 2,
    name: 'Садовые цветы',
    count: 18,
    image: TopBackgroundImage
  },
  {
    id: 3,
    name: 'Овощи',
    count: 32,
    image: TopBackgroundImage
  },
  {
    id: 4,
    name: 'Фрукты',
    count: 15,
    image: TopBackgroundImage
  },
  {
    id: 5,
    name: 'Травы',
    count: 12,
    image: TopBackgroundImage
  }
])

// Placeholder data for plants
const plants = ref([
  {
    id: 1,
    name: 'Розовый куст',
    price: '2500',
    image: TopBackgroundImage
  },
  {
    id: 2,
    name: 'Лавандовый куст',
    price: '1800',
    image: TopBackgroundImage
  },
  {
    id: 3,
    name: 'Базилик',
    price: '800',
    image: TopBackgroundImage
  },
  {
    id: 4,
    name: 'Петуния',
    price: '600',
    image: TopBackgroundImage
  },
  {
    id: 5,
    name: 'Томат черри',
    price: '1200',
    image: TopBackgroundImage
  },
  {
    id: 6,
    name: 'Мята',
    price: '500',
    image: TopBackgroundImage
  }
])
</script>

<template>
  <TopHeadingSection :backgroundImage="TopBackgroundImage">
    <h2 class="text-gray-darker text-32px text-center opacity-50 mb-8px">{{ t('home.brandName') }}</h2>
    <h1 class="text-white text-72px text-center font-bold leading-[100%] mb-32px max-md:text-48px">{{ t('home.heroTitle') }}</h1>
    <Button @click="openContactModal" tag="a" href="#" variant="white" class="font-24px">{{ t('home.contactButton') }}</Button>
  </TopHeadingSection>

  <!-- Categories Slider -->
  <section class="py-64px px-16px bg-gradient-to-br from-creme to-gray-darker relative overflow-hidden">
    <div class="absolute inset-0 opacity-30">
      <div class="absolute top-20px left-20px w-3px h-3px bg-green rounded-full"></div>
      <div class="absolute top-40px right-40px w-2px h-2px bg-blue rounded-full"></div>
      <div class="absolute bottom-60px left-60px w-4px h-4px bg-green rounded-full"></div>
      <div class="absolute bottom-40px right-20px w-2px h-2px bg-blue rounded-full"></div>
      <div class="absolute top-60px left-1/3 w-3px h-3px bg-green rounded-full"></div>
      <div class="absolute bottom-80px right-1/3 w-2px h-2px bg-blue rounded-full"></div>
    </div>
    
    <div class="max-w-7xl mx-auto relative z-10">
      <div class="text-center mb-56px">
        <h2 class="text-56px font-bold text-blue mb-16px max-md:text-40px">Категории</h2>
        <div class="w-24px h-2px bg-green mx-auto"></div>
      </div>
      
      <div class="relative pt-32px pb-48px px-8px">
        <Swiper
          :slides-per-view="1"
          :space-between="30"
          :breakpoints="{
            450: { slidesPerView: 1.5, spaceBetween: 20 },
            768: { slidesPerView: 2.5, spaceBetween: 30 },
            1024: { slidesPerView: 3.5, spaceBetween: 40 }
          }"
          :pagination="{ clickable: true }"
          :centered-slides="false"
          :loop="true"
          :autoplay="{ delay: 4000, disableOnInteraction: false }"
          :modules="[Pagination, Autoplay]"
          class="categories-swiper !overflow-visible"
        >
          <SwiperSlide v-for="category in categories" :key="category.id">
            <div class="relative group">
              <!-- Main Card -->
              <div class="bg-white rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 hover:rotate-1 hover:scale-105">
                <!-- Image Section with Overlay -->
                <div class="relative aspect-[3/2] overflow-hidden">
                  <img :src="category.image" :alt="category.name" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
                  <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  
                  <!-- Count Badge -->
                  <div class="absolute top-16px right-16px bg-green text-white px-12px py-6px rounded-full text-14px font-semibold">
                    {{ category.count }}
                  </div>
                  
                  <!-- Category Name Overlay -->
                  <div class="absolute bottom-20px left-20px right-20px">
                    <h3 class="text-24px font-bold text-white mb-4px drop-shadow-lg">{{ category.name }}</h3>
                    <p class="text-14px text-white/90">{{ category.count }} растений</p>
                  </div>
                </div>
                
                <!-- Action Section -->
                <div class="p-20px bg-gradient-to-r from-blue to-blue/90">
                  <div class="flex items-center gap-12px">
                    <Button variant="white" class="text-14px flex-1 font-medium">
                      Подробнее
                    </Button>
                    <button class="p-10px bg-green text-white rounded-full hover:bg-green/90 transition-all duration-300 hover:scale-110 shadow-lg">
                      <Icon name="lucide:share-2" class="w-18px h-18px" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  </section>

  <!-- Plants Slider -->
  <section class="py-64px px-16px bg-white">
    <div class="max-w-7xl mx-auto">
      <h2 class="text-48px font-bold text-blue text-center mb-48px max-md:text-32px">Растения</h2>
      <div class="relative pt-32px pb-48px px-8px">
        <Swiper
          :slides-per-view="1"
          :space-between="20"
          :breakpoints="{
            450: { slidesPerView: 2, spaceBetween: 20 },
            768: { slidesPerView: 3, spaceBetween: 30 },
            1024: { slidesPerView: 4, spaceBetween: 40 }
          }"
          :pagination="{ clickable: true }"
          :loop="true"
          :autoplay="{ delay: 3500, disableOnInteraction: false }"
          :modules="[Pagination, Autoplay]"
          class="plants-swiper !overflow-visible"
        >
          <SwiperSlide v-for="plant in plants" :key="plant.id">
            <div class="bg-gray rounded-lg p-24px shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div class="aspect-[4/3] mb-20px overflow-hidden rounded-lg">
                <img :src="plant.image" :alt="plant.name" class="w-full h-full object-cover">
              </div>
              <h3 class="text-20px font-semibold text-blue mb-8px">{{ plant.name }}</h3>
              <p class="text-16px text-green font-medium mb-16px">{{ plant.price }} ₸</p>
              <div class="flex gap-8px">
                <Button variant="blue" class="text-12px flex-1">Подробнее</Button>
                <Button variant="white" class="text-12px flex-1">В корзину</Button>
                <button class="p-8px bg-green text-white rounded-md hover:bg-green/90 transition-colors">
                  <Icon name="lucide:share-2" class="w-16px h-16px" />
                </button>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  </section>

  <!-- Contact Block -->
  <section class="py-64px px-16px bg-creme">
    <div class="max-w-4xl mx-auto text-center">
      <h2 class="text-48px font-bold text-blue mb-32px max-md:text-32px">Контакты</h2>
      
      <div class="mb-48px">
        <a href="tel:+77777777777" class="text-32px font-semibold text-blue hover:text-green transition-colors duration-300 max-md:text-24px">
          +7 (777) 777-77-77
        </a>
      </div>

      <div class="flex justify-center gap-24px flex-wrap">
        <a href="https://wa.me/77777777777" target="_blank" class="flex items-center justify-center w-56px h-56px bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
          <Icon name="ic:baseline-whatsapp" class="w-32px h-32px text-green" />
        </a>
        <a href="https://instagram.com/" target="_blank" class="flex items-center justify-center w-56px h-56px bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
          <Icon name="mdi:instagram" class="w-32px h-32px text-pink-500" />
        </a>
        <a href="https://ok.ru/" target="_blank" class="flex items-center justify-center w-56px h-56px bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
          <Icon name="ic:baseline-tiktok" class="w-32px h-32px text-orange-500" />
        </a>
        <a href="https://vk.com/" target="_blank" class="flex items-center justify-center w-56px h-56px bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
          <Icon name="mdi:vk" class="w-32px h-32px text-blue-600" />
        </a>
        <a href="https://facebook.com/" target="_blank" class="flex items-center justify-center w-56px h-56px bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
          <Icon name="mdi:facebook" class="w-32px h-32px text-blue-600" />
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
:deep(.swiper-pagination-bullet) {
  background-color: #33689b;
  opacity: 0.3;
}

:deep(.swiper-pagination-bullet-active) {
  background-color: #87b617;
  opacity: 1;
}

:deep(.swiper-pagination) {
  bottom: -40px;
}

:deep(.categories-swiper .swiper-wrapper),
:deep(.plants-swiper .swiper-wrapper) {
  overflow: visible !important;
}

:deep(.categories-swiper .swiper-slide),
:deep(.plants-swiper .swiper-slide) {
  overflow: visible !important;
}
</style>
