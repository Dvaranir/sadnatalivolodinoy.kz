import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const favorites = ref([])
  const basket = ref([])

  const initializeFavorites = () => {
    if (process.client) {
      const saved = localStorage.getItem('favorites')
      if (saved) {
        favorites.value = JSON.parse(saved)
      }
    }
  }

  const initializeBasket = () => {
    if (process.client) {
      const saved = localStorage.getItem('basket')
      if (saved) {
        basket.value = JSON.parse(saved)
      }
    }
  }

  const saveFavorites = () => {
    if (process.client) {
      localStorage.setItem('favorites', JSON.stringify(favorites.value))
    }
  }

  const saveBasket = () => {
    if (process.client) {
      localStorage.setItem('basket', JSON.stringify(basket.value))
    }
  }

  const toggleFavorite = (plantId) => {
    const index = favorites.value.indexOf(plantId)
    if (index === -1) {
      favorites.value.push(plantId)
    } else {
      favorites.value.splice(index, 1)
    }
    saveFavorites()
  }

  const isFavorite = (plantId) => {
    return favorites.value.includes(plantId)
  }

  const addToBasket = (plantId) => {
    const existingItem = basket.value.find(item => item.id === plantId)
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      basket.value.push({ id: plantId, quantity: 1 })
    }
    saveBasket()
  }

  const removeFromBasket = (plantId) => {
    const existingItem = basket.value.find(item => item.id === plantId)
    if (existingItem) {
      if (existingItem.quantity > 1) {
        existingItem.quantity -= 1
      } else {
        basket.value = basket.value.filter(item => item.id !== plantId)
      }
    }
    saveBasket()
  }

  const getBasketItemQuantity = (plantId) => {
    const item = basket.value.find(item => item.id === plantId)
    return item ? item.quantity : 0
  }

  const isInBasket = (plantId) => {
    return basket.value.some(item => item.id === plantId)
  }

  const basketItemsCount = computed(() => {
    return basket.value.reduce((total, item) => total + item.quantity, 0)
  })

  const favoritesCount = computed(() => {
    return favorites.value.length
  })

  initializeFavorites()
  initializeBasket()

  return {
    favorites: readonly(favorites),
    basket: readonly(basket),
    toggleFavorite,
    isFavorite,
    addToBasket,
    removeFromBasket,
    getBasketItemQuantity,
    isInBasket,
    basketItemsCount,
    favoritesCount,
    initializeFavorites,
    initializeBasket
  }
})
