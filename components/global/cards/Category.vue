<script setup>
const props = defineProps({
  category: {
    type: Object,
    required: true
  }
})

const isShareModalOpen = ref(false)

const shareData = computed(() => ({
  url: `${window.location.origin}/category/${props.category.id || props.category.slug || props.category.name}`,
  title: `${props.category.name} - ${props.category.count} растений`
}))

const openShareModal = () => {
  isShareModalOpen.value = true
}

const closeShareModal = () => {
  isShareModalOpen.value = false
}
</script>

<template>
  <div class="relative group">
    <div class="bg-white rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 hover:rotate-1 hover:scale-105">
      <div class="relative aspect-[3/2] overflow-hidden">
        <img :src="category.image" :alt="category.name" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
        <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        
        <div class="absolute top-16px right-16px bg-green text-white px-12px py-6px rounded-full text-14px font-semibold">
          {{ category.count }}
        </div>
        
        <div class="absolute bottom-20px left-20px right-20px">
          <h3 class="text-24px font-bold text-white mb-4px drop-shadow-lg">{{ category.name }}</h3>
          <p class="text-14px text-white/90">{{ category.count }} растений</p>
        </div>
      </div>
      
      <div class="p-20px bg-gradient-to-r from-blue to-blue/90">
        <div class="flex items-center gap-12px">
          <Button variant="white" class="text-14px flex-1 font-medium">
            Подробнее
          </Button>
          <button class="p-10px bg-green text-white rounded-full hover:bg-green/90 transition-all duration-300 hover:scale-110 shadow-lg" @click="openShareModal">
            <Icon name="mdi:share" class="w-18px h-18px" />
          </button>
        </div>
      </div>
    </div>
    
    <ShareModal
      :is-open="isShareModalOpen"
      :share-url="shareData.url"
      :title="shareData.title"
      @close="closeShareModal"
    />
  </div>
</template>
