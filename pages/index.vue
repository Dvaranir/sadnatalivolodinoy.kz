<script setup>
import TopBackgroundImage from '~/assets/images/pages/home/top_background.jpeg';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const { t, tm, rt } = useI18n();
const { locale } = useI18n();
const coreStore = useCoreStore()
const localePath = useLocalePath()
const api = useApi()

const openContactModal = () => {
  coreStore.openContactModal()
}

const pageData = ref(null)
const categories = ref([])
const plants = ref([])

const { data: pageHomeData } = await useAsyncData('page-home', () => 
  api.findOne('page-home', '', {
    populate: [
      'categories.images',
      'plants.images', 
      'socials',
      'phone'
    ],
    locale: locale.value
  })
)

if (pageHomeData.value) {
  if(pageHomeData.value.data){
    pageData.value = pageHomeData.value.data.attributes
  }

  if(pageHomeData.value.data.categories){
    categories.value = pageHomeData.value.data.categories || []
  }

  if(pageHomeData.value.data.plants){
    plants.value = pageHomeData.value.data.plants || []
  }
}
</script>

<template>
  <TopHeadingSection :backgroundImage="TopBackgroundImage">
    <h2 class="text-gray-darker text-32px text-center opacity-50 mb-8px">{{ pageData?.companyName || t('home.brandName') }}</h2>
    <h1 class="text-white text-72px text-center font-bold leading-[100%] mb-32px max-md:text-48px">{{ pageData?.mainHeading || t('home.heroTitle') }}</h1>
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
        <h2 class="text-56px font-bold text-blue mb-16px max-md:text-40px">{{ pageData?.categorySectionHeading || 'Категории' }}</h2>
        <div class="w-24px h-2px bg-green mx-auto"></div>
      </div>
      
      <div class="relative pt-32px pb-48px px-8px" v-if="categories.length > 0">
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
        <template v-for="category in categories" :key="category.id">
          <SwiperSlide v-if="category.name">
            <Category :category="category" />
          </SwiperSlide>
        </template>
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
        <h2 class="text-56px font-bold text-blue mb-16px max-md:text-40px">{{ pageData?.plantsSectionHeading || 'Растения' }}</h2>
        <div class="w-24px h-2px bg-blue mx-auto"></div>
      </div>
      
      <div class="relative pt-32px pb-48px px-8px" v-if="plants.length > 0">
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
        <template v-for="plant in plants" :key="plant.id">
          <SwiperSlide v-if="plant.name">
            <Plant :plant="plant" />
          </SwiperSlide>
        </template>
        </Swiper>
      </div>
    </div>
  </section>

  <section class="py-64px px-16px bg-creme">
    <div class="max-w-4xl mx-auto text-center">
      <h2 class="text-48px font-bold text-blue mb-32px max-md:text-32px">{{ pageData?.contactsSectionHeading || 'Контакты' }}</h2>
      
      <div class="mb-48px" v-if="pageData?.phone?.name">
        <a :href="`tel:${pageData.phone.url}`" class="text-32px font-semibold text-blue hover:text-green transition-colors duration-300 max-md:text-24px">
          {{ pageData.phone.name }}
        </a>
      </div>

      <div class="flex justify-center gap-24px flex-wrap" v-if="pageData?.socials?.length > 0">
        <a 
          v-for="social in pageData.socials" 
          :key="social.id"
          :href="social.url" 
          target="_blank" 
          class="flex items-center justify-center w-56px h-56px bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        >
          <Icon :name="social.icon" class="w-32px h-32px" :class="social.color" />
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
