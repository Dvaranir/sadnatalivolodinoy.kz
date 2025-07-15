<script setup>
const props = defineProps({
  plant: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="relative group">
    <div class="bg-gradient-to-br from-gray to-gray-darker rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:rotate-1">
      
      <div class="relative aspect-[4/3] overflow-hidden">
        <img :src="plant.image" :alt="plant.name" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
        
        <div class="absolute top-16px left-16px bg-green text-white px-16px py-8px rounded-full text-16px font-bold shadow-lg">
          {{ plant.price }} ₸
        </div>
        
        <div class="absolute top-16px right-16px">
          <button class="w-40px h-40px bg-white/90 backdrop-blur-sm text-blue rounded-full hover:bg-white hover:scale-110 transition-all duration-300 shadow-lg flex items-center justify-center">
            <Icon name="mdi:share" class="w-20px h-20px" />
          </button>
        </div>
      </div>
      
      <div class="p-24px bg-white relative">
        <div class="absolute top-0 right-0 w-0 h-0 border-l-[30px] border-l-transparent border-b-[30px] border-b-green opacity-10"></div>
        
        <h3 class="text-16px font-bold text-blue mb-12px leading-tight h-[40px] overflow-hidden line-clamp-2">{{ plant.name }}</h3>
        
        <div class="flex gap-8px mt-20px">
          <Button variant="blue" class="text-12px font-medium hover:bg-blue/90 transition-colors duration-300">
            Подробнее
          </Button>
          <button class="text-12px whitespace-nowrap font-medium border-2 border-green text-green bg-white hover:bg-green hover:text-white hover:border-green transition-all duration-300 px-12px py-8px rounded-lg">
            В корзину
          </button>
        </div>
      </div>
      
      <div class="h-4px bg-gradient-to-r from-green via-blue to-green"></div>
    </div>
    
    <div class="absolute -bottom-8px -right-8px w-6px h-6px bg-green rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100"></div>
    <div class="absolute -top-8px -left-8px w-4px h-4px bg-blue rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 delay-200"></div>
  </div>
</template>