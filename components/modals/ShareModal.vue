<script setup>
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  shareUrl: {
    type: String,
    required: true
  },
  title: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['close'])

const socialNetworks = [
  {
    name: 'WhatsApp',
    icon: 'mdi:whatsapp',
    color: 'bg-green-500',
    hoverColor: 'hover:bg-green-600',
    getUrl: (url, title) => `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`
  },
  {
    name: 'Одноклассники',
    icon: 'mdi:odnoklassniki',
    color: 'bg-orange-500',
    hoverColor: 'hover:bg-orange-600',
    getUrl: (url, title) => `https://connect.ok.ru/dk?st.cmd=WidgetSharePreview&st.shareUrl=${encodeURIComponent(url)}&st.comments=${encodeURIComponent(title)}`
  },
  {
    name: 'VK',
    icon: 'mdi:vk',
    color: 'bg-blue-600',
    hoverColor: 'hover:bg-blue-700',
    getUrl: (url, title) => `https://vk.com/share.php?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`
  },
  {
    name: 'Facebook',
    icon: 'mdi:facebook',
    color: 'bg-blue-700',
    hoverColor: 'hover:bg-blue-800',
    getUrl: (url, title) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(title)}`
  }
]

const handleShare = (network) => {
  const url = network.getUrl(props.shareUrl, props.title)
  window.open(url, '_blank', 'width=600,height=400')
}

const handleBackdropClick = (e) => {
  if (e.target === e.currentTarget) {
    emit('close')
  }
}

const handleKeydown = (e) => {
  if (e.key === 'Escape') {
    emit('close')
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-16px"
        @click="handleBackdropClick"
      >
        <Transition
          enter-active-class="transition-all duration-400 ease-out"
          enter-from-class="opacity-0 scale-95 rotate-3 translate-y-8"
          enter-to-class="opacity-100 scale-100 rotate-0 translate-y-0"
          leave-active-class="transition-all duration-300 ease-in"
          leave-from-class="opacity-100 scale-100 rotate-0 translate-y-0"
          leave-to-class="opacity-0 scale-95 -rotate-3 translate-y-8"
        >
          <div
            v-if="isOpen"
            class="relative bg-white rounded-3xl shadow-2xl p-24px sm:p-32px w-full max-w-[min(90vw,448px)] mx-auto transform"
            @click.stop
          >
            <div class="absolute -top-2 -right-2 w-6 h-6 bg-green rounded-full animate-pulse"></div>
            <div class="absolute -bottom-2 -left-2 w-4 h-4 bg-blue rounded-full animate-pulse delay-300"></div>
            
            <div class="flex justify-between items-center mb-24px">
              <h3 class="text-20px sm:text-24px font-bold text-blue">Поделиться</h3>
              <button
                @click="emit('close')"
                class="w-32px h-32px bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
              >
                <Icon name="mdi:close" class="w-16px h-16px text-gray-600" />
              </button>
            </div>
            
            <div class="grid grid-cols-2 gap-16px sm:gap-20px">
              <button
                v-for="(network, index) in socialNetworks"
                :key="network.name"
                @click="handleShare(network)"
                :class="`${network.color} ${network.hoverColor}`"
                class="group relative overflow-hidden rounded-2xl p-16px sm:p-20px text-white transition-all duration-300 hover:scale-105 hover:shadow-xl transform hover:-translate-y-1"
                :style="{ animationDelay: `${index * 100}ms` }"
              >
                <div class="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div class="relative z-10 flex flex-col items-center gap-8px sm:gap-12px">
                  <div class="w-32px h-32px sm:w-40px sm:h-40px bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
                    <Icon :name="network.icon" class="w-16px h-16px sm:w-20px sm:h-20px text-white" />
                  </div>
                  <span class="text-12px sm:text-14px font-medium text-center leading-tight">{{ network.name }}</span>
                </div>
                
                <div class="absolute -bottom-4 -right-4 w-8 h-8 bg-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100"></div>
              </button>
            </div>
            
            <div class="mt-20px text-center">
              <p class="text-12px sm:text-14px text-gray-600">Выберите социальную сеть для публикации</p>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
