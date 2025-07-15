<script setup>
const props = defineProps({
  plant: {
    type: Object,
    required: true
  },
  showTags: {
    type: Boolean,
    default: false
  },
  allTags: {
    type: Array,
    default: () => []
  }
})

const isShareModalOpen = ref(false)
const userStore = useUserStore()

const shareData = computed(() => ({
  url: `${window.location.origin}/plants/${props.plant.slug}`,
  title: `${props.plant.name} - ${props.plant.price} ₸`
}))

const openShareModal = () => {
  isShareModalOpen.value = true
}

const closeShareModal = () => {
  isShareModalOpen.value = false
}

const toggleFavorite = () => {
  userStore.toggleFavorite(props.plant.id)
}

const isFavorite = computed(() => {
  return userStore.isFavorite(props.plant.id)
})

const addToBasket = () => {
  userStore.addToBasket(props.plant.id)
}

const removeFromBasket = () => {
  userStore.removeFromBasket(props.plant.id)
}

const basketQuantity = computed(() => {
  return userStore.getBasketItemQuantity(props.plant.id)
})

const isInBasket = computed(() => {
  return userStore.isInBasket(props.plant.id)
})

const displayTags = computed(() => {
  if (!props.showTags || !props.plant.tags || props.plant.tags.length === 0) return []
  return props.plant.tags.map(tagId => {
      const tag = props.allTags.find(t => t.id === tagId)
    return tag ? { id: tagId, name: tag.name } : { id: tagId, name: tagId }
  })
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
        
        <div class="absolute top-16px right-16px flex gap-8px">
          <button 
            class="w-40px h-40px bg-white/90 backdrop-blur-sm rounded-full hover:bg-white hover:scale-110 transition-all duration-300 shadow-lg flex items-center justify-center"
            :class="isFavorite ? 'text-red-500' : 'text-gray-400'"
            @click="toggleFavorite"
          >
            <Icon :name="isFavorite ? 'mdi:heart' : 'mdi:heart-outline'" class="w-20px h-20px" />
          </button>
          <button class="w-40px h-40px bg-white/90 backdrop-blur-sm text-blue rounded-full hover:bg-white hover:scale-110 transition-all duration-300 shadow-lg flex items-center justify-center" @click="openShareModal">
            <Icon name="mdi:share" class="w-20px h-20px" />
          </button>
        </div>
      </div>
      
      <div class="p-24px bg-white relative">
        <div class="absolute top-0 right-0 w-0 h-0 border-l-[30px] border-l-transparent border-b-[30px] border-b-green opacity-10"></div>
        
        <h3 class="text-16px font-bold text-blue mb-12px leading-tight h-[40px] overflow-hidden line-clamp-2">{{ plant.name }}</h3>
        
        <div class="flex gap-8px mt-20px">
          <NuxtLink :to="`/plants/${plant.slug}`" class="text-12px font-medium bg-blue text-white px-12px py-8px rounded-lg hover:bg-blue/90 transition-colors duration-300 inline-block text-center">
            Подробнее
          </NuxtLink>
          
          <div v-if="isInBasket" class="flex items-center gap-4px">
            <button 
              @click="removeFromBasket"
              class="text-12px font-medium w-24px h-24px rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors duration-300 flex items-center justify-center"
            >
              -
            </button>
            <span class="text-12px font-medium text-green px-8px">{{ basketQuantity }}</span>
            <button 
              @click="addToBasket"
              class="text-12px font-medium w-24px h-24px rounded-lg bg-green text-white hover:bg-green/90 transition-colors duration-300 flex items-center justify-center"
            >
              +
            </button>
          </div>
          
          <button 
            v-else
            @click="addToBasket"
            class="text-12px whitespace-nowrap font-medium border-2 border-green text-green bg-white hover:bg-green hover:text-white hover:border-green transition-all duration-300 px-12px py-8px rounded-lg"
          >
            В корзину
          </button>
        </div>
        
        <div v-if="showTags && displayTags.length > 0" class="mt-12px">
          <div class="flex flex-wrap gap-x-2 text-12px leading-tight max-h-[16px] overflow-hidden">
            <NuxtLink 
              v-for="(tag, index) in displayTags" 
              :key="index"
              :to="`/plants?tags=${tag.id}`"
              class="text-blue hover:text-blue/80 transition-colors duration-200 whitespace-nowrap"
            >
              #{{ tag.name }}
            </NuxtLink>
          </div>
        </div>
      </div>
      
      <div class="h-4px bg-gradient-to-r from-green via-blue to-green"></div>
    </div>
    
    <div class="absolute -bottom-8px -right-8px w-6px h-6px bg-green rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100"></div>
    <div class="absolute -top-8px -left-8px w-4px h-4px bg-blue rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 delay-200"></div>
    
    <ShareModal
      :is-open="isShareModalOpen"
      :share-url="shareData.url"
      :title="shareData.title"
      @close="closeShareModal"
    />
  </div>
</template>