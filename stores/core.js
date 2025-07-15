import { defineStore } from 'pinia'

export const useCoreStore = defineStore('core', () => {
  const isThemeDark = ref(true)
  const isContactModalOpen = ref(false)
  const isLegalModalOpen = ref(false)
  const legalModalContent = ref('')

  const toggleTheme = () => isThemeDark.value = !isThemeDark.value

  const selectedTheme = computed(() => isThemeDark.value ? 'dark' : 'light')

  const openContactModal = () => isContactModalOpen.value = true
  const closeContactModal = () => isContactModalOpen.value = false

  const openLegalModal = (contentName) => {
    legalModalContent.value = contentName
    isLegalModalOpen.value = true
  }
  const closeLegalModal = () => {
    isLegalModalOpen.value = false
    legalModalContent.value = ''
  }

  return {
    isThemeDark,
    toggleTheme,
    selectedTheme,
    isContactModalOpen,
    openContactModal,
    closeContactModal,
    isLegalModalOpen,
    legalModalContent,
    openLegalModal,
    closeLegalModal,
  }
})
