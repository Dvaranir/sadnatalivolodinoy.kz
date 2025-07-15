<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination } from 'swiper/modules'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  plants: {
    type: Array,
    required: true
  },
  allTags: {
    type: Array,
    default: () => []
  }
})

const swiperModules = [Autoplay, Pagination]
</script>

<template>
  <div class="mt-12">
    <div class="flex items-center gap-4 mb-8">
      <div class="w-12 h-12 bg-gradient-to-br from-green to-blue rounded-2xl flex items-center justify-center">
        <Icon name="mdi:heart" class="w-6 h-6 text-white" />
      </div>
      <h2 class="text-2xl font-bold text-blue">{{ title }}</h2>
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
        <SwiperSlide v-for="plant in plants" :key="plant.id">
          <Plant
            :plant="plant"
            :show-tags="false"
            :all-tags="allTags"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  </div>
</template>

