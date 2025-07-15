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

const plants = ref([
  {
    id: 1,
    name: 'Розовый куст фыв фыв фыв фы вфыв фы вфывфыв',
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

  <div class="w-8px h-5px text-gray-11 transition-transform duration-300 flex items-center justify-center">
    <Icon name="mdi:moon-waning-crescent" class="w-full h-full" />
  </div>

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
            <Category :category="category" />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  </section>

  <section class="py-64px px-16px bg-white relative">
    <div class="absolute inset-0 opacity-5">
      <div class="absolute top-10% left-10% w-20px h-20px border-2 border-green rounded-full"></div>
      <div class="absolute top-20% right-15% w-16px h-16px border-2 border-blue rounded-full"></div>
      <div class="absolute bottom-30% left-20% w-12px h-12px border-2 border-green rounded-full"></div>
      <div class="absolute bottom-20% right-10% w-18px h-18px border-2 border-blue rounded-full"></div>
    </div>
    
    <div class="max-w-7xl mx-auto relative z-10">
      <div class="text-center mb-56px">
        <h2 class="text-56px font-bold text-blue mb-16px max-md:text-40px">Растения</h2>
        <div class="w-24px h-2px bg-blue mx-auto"></div>
      </div>
      
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
            <Plant :plant="plant" />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  </section>

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
          <Icon name="mdi:whatsapp" class="w-32px h-32px text-green" />
        </a>
        <a href="https://instagram.com/" target="_blank" class="flex items-center justify-center w-56px h-56px bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
          <Icon name="mdi:instagram" class="w-32px h-32px text-pink-500" />
        </a>
        <a href="https://ok.ru/" target="_blank" class="flex items-center justify-center w-56px h-56px bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
          <Icon name="mdi:web" class="w-32px h-32px text-orange-500" />
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
