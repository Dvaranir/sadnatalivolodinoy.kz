<script setup>
import TopBackgroundImage from '~/assets/images/pages/home/top_background.jpeg';
import { Swiper, SwiperSlide } from 'swiper/vue';
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
  <section class="py-64px px-16px bg-creme">
    <div class="max-w-7xl mx-auto">
      <h2 class="text-48px font-bold text-blue text-center mb-48px max-md:text-32px">Категории</h2>
      <div class="relative">
        <Swiper
          :slides-per-view="1"
          :space-between="20"
          :breakpoints="{
            450: { slidesPerView: 2, spaceBetween: 20 },
            768: { slidesPerView: 3, spaceBetween: 30 },
            1024: { slidesPerView: 4, spaceBetween: 40 }
          }"
          :pagination="{ clickable: true }"
          class="categories-swiper"
        >
          <SwiperSlide v-for="category in categories" :key="category.id">
            <div class="bg-white rounded-lg p-24px shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div class="aspect-[4/3] mb-20px overflow-hidden rounded-lg">
                <img :src="category.image" :alt="category.name" class="w-full h-full object-cover">
              </div>
              <h3 class="text-20px font-semibold text-blue mb-8px">{{ category.name }}</h3>
              <p class="text-16px text-gray-600 mb-16px">{{ category.count }} растений</p>
              <div class="flex gap-8px">
                <Button variant="blue" class="text-12px flex-1">Подробнее</Button>
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

  <!-- Plants Slider -->
  <section class="py-64px px-16px bg-white">
    <div class="max-w-7xl mx-auto">
      <h2 class="text-48px font-bold text-blue text-center mb-48px max-md:text-32px">Растения</h2>
      <div class="relative">
        <Swiper
          :slides-per-view="1"
          :space-between="20"
          :breakpoints="{
            450: { slidesPerView: 2, spaceBetween: 20 },
            768: { slidesPerView: 3, spaceBetween: 30 },
            1024: { slidesPerView: 4, spaceBetween: 40 }
          }"
          :pagination="{ clickable: true }"
          class="plants-swiper"
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
</style>
