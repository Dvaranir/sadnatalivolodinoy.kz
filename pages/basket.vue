<script setup>
import { ref, computed } from 'vue'
import * as yup from 'yup'
import { TransitionGroup } from 'vue'
import TopBackgroundImage from '~/assets/images/pages/home/top_background.jpeg'

const userStore = useUserStore()

const form = ref({
  name: '',
  phone: '',
  email: '',
  message: ''
})

const validationSchema = yup.object({
  name: yup.string().required('Имя обязательно'),
  phone: yup.string(),
  email: yup.string().email('Некорректный email'),
  message: yup.string()
}).test('phone-or-email', 'Необходимо указать телефон или email', function(value) {
  const { phone, email } = value
  return (phone && phone.length > 0) || (email && email.length > 0)
})

const errors = ref({})

const mockPlants = ref([
  {
    id: 1,
    slug: 'ficus-benjamin',
    name: 'Фикус Бенджамина',
    price: 5000,
    images: [TopBackgroundImage],
    category: 'indoor',
    tags: ['easy-care', 'air-purifying', 'low-light']
  },
  {
    id: 2,
    slug: 'rose-red',
    name: 'Роза красная',
    price: 3500,
    images: [TopBackgroundImage],
    category: 'flowers',
    tags: ['flowering', 'fragrant']
  },
  {
    id: 3,
    slug: 'lavender',
    name: 'Лаванда',
    price: 2500,
    images: [TopBackgroundImage],
    category: 'herbs',
    tags: ['fragrant', 'medicinal', 'drought-tolerant']
  },
  {
    id: 4,
    slug: 'monstera',
    name: 'Монстера деликатесная',
    price: 8000,
    images: [TopBackgroundImage],
    category: 'indoor',
    tags: ['easy-care', 'air-purifying', 'fast-growing', 'low-light']
  },
  {
    id: 5,
    slug: 'aloe-vera',
    name: 'Алоэ вера',
    price: 1800,
    images: [TopBackgroundImage],
    category: 'indoor',
    tags: ['easy-care', 'medicinal', 'drought-tolerant']
  },
  {
    id: 6,
    slug: 'peace-lily',
    name: 'Спатифиллум',
    price: 3200,
    images: [TopBackgroundImage],
    category: 'indoor',
    tags: ['flowering', 'air-purifying', 'low-light']
  },
  {
    id: 7,
    slug: 'snake-plant',
    name: 'Сансевиерия',
    price: 2800,
    images: [TopBackgroundImage],
    category: 'indoor',
    tags: ['easy-care', 'air-purifying', 'low-light', 'drought-tolerant']
  }
])

const allTags = ref([
  { id: 'easy-care', name: 'Простой уход' },
  { id: 'low-light', name: 'Тенелюбивые' },
  { id: 'air-purifying', name: 'Очищают воздух' },
  { id: 'flowering', name: 'Цветущие' },
  { id: 'drought-tolerant', name: 'Засухоустойчивые' },
  { id: 'fast-growing', name: 'Быстрорастущие' },
  { id: 'fragrant', name: 'Ароматные' },
  { id: 'medicinal', name: 'Лекарственные' }
])

const basketItems = computed(() => {
  return userStore.basket.map(item => ({
    ...item,
    plant: mockPlants.value.find(plant => plant.id === item.id)
  })).filter(item => item.plant)
})

const totalPrice = computed(() => {
  return basketItems.value.reduce((total, item) => total + (item.plant.price * item.quantity), 0)
})

const breadcrumbs = computed(() => [
  { label: 'Главная', to: '/' },
  { label: 'Корзина' }
])

const availablePlants = computed(() => {
  const basketPlantIds = basketItems.value.map(item => item.plant.id)
  return mockPlants.value.filter(plant => !basketPlantIds.includes(plant.id)).slice(0, 6)
})

const addToBasket = (plantId) => {
  userStore.addToBasket(plantId)
}

const removeFromBasket = (plantId) => {
  userStore.removeFromBasket(plantId)
}

const toggleFavorite = (plantId) => {
  userStore.toggleFavorite(plantId)
}

const isFavorite = (plantId) => {
  return userStore.isFavorite(plantId)
}

const validateForm = async () => {
  try {
    await validationSchema.validate(form.value, { abortEarly: false })
    errors.value = {}
    return true
  } catch (error) {
    errors.value = {}
    error.inner.forEach(err => {
      errors.value[err.path] = err.message
    })
    return false
  }
}

const submitForm = async () => {
  const isValid = await validateForm()
  if (isValid) {
    // Handle form submission
    console.log('Form submitted:', form.value)
  }
}
</script>

<template>
  <div class="min-h-screen bg-creme">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs :items="breadcrumbs" />
      
      <div class="mb-8">
        <h1 class="text-3xl md:text-4xl font-bold text-blue mb-2">Корзина</h1>
        <p class="text-gray-600">Выберите способ связи и оформите заказ</p>
      </div>

      <div v-if="basketItems.length === 0" class="text-center py-16">
        <Icon name="mdi:cart-outline" class="w-24 h-24 text-gray-400 mx-auto mb-4" />
        <h2 class="text-2xl font-bold text-blue mb-4">Ваша корзина пуста</h2>
        <p class="text-gray-600 mb-8">Добавьте растения в корзину для оформления заказа</p>
        <NuxtLink to="/plants" class="inline-flex items-center gap-2 px-6 py-3 bg-green text-white rounded-xl hover:bg-green/90 transition-colors">
          <Icon name="mdi:leaf" class="w-5 h-5" />
          Перейти к каталогу
        </NuxtLink>
      </div>

      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Список растений -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-3xl p-6 shadow-xl">
            <h2 class="text-2xl font-bold text-blue mb-6">Товары в корзине</h2>
            
            <TransitionGroup name="basket-item" tag="div" class="space-y-4">
              <div 
                v-for="item in basketItems" 
                :key="item.id"
                class="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors"
              >
                <div class="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                  <img 
                    :src="item.plant.images[0]" 
                    :alt="item.plant.name"
                    class="w-full h-full object-cover"
                  />
                </div>
                
                <div class="flex-1">
                  <h3 class="font-semibold text-blue mb-1">{{ item.plant.name }}</h3>
                  <p class="text-green font-bold">{{ item.plant.price.toLocaleString() }} ₸</p>
                  
                  <div class="flex items-center gap-3 mt-2">
                    <div class="flex items-center gap-2">
                      <button 
                        @click="removeFromBasket(item.plant.id)"
                        class="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors"
                      >
                        <Icon name="mdi:minus" class="w-4 h-4" />
                      </button>
                      <span class="w-8 text-center font-semibold">{{ item.quantity }}</span>
                      <button 
                        @click="addToBasket(item.plant.id)"
                        class="w-8 h-8 rounded-full bg-green text-white flex items-center justify-center hover:bg-green/90 transition-colors"
                      >
                        <Icon name="mdi:plus" class="w-4 h-4" />
                      </button>
                    </div>
                    
                    <button 
                      @click="toggleFavorite(item.plant.id)"
                      class="flex items-center gap-1 px-3 py-1 rounded-full text-sm transition-colors"
                      :class="isFavorite(item.plant.id) ? 'bg-red-100 text-red-600' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'"
                    >
                      <Icon 
                        :name="isFavorite(item.plant.id) ? 'mdi:heart' : 'mdi:heart-outline'" 
                        class="w-4 h-4" 
                      />
                      {{ isFavorite(item.plant.id) ? 'В избранном' : 'В избранное' }}
                    </button>
                  </div>
                </div>
                
                <div class="text-right">
                  <p class="font-bold text-blue">{{ (item.plant.price * item.quantity).toLocaleString() }} ₸</p>
                </div>
              </div>
            </TransitionGroup>
            
            <div class="mt-6 pt-6 border-t border-gray-200">
              <div class="flex justify-between items-center text-xl font-bold text-blue">
                <span>Итого:</span>
                <span>{{ totalPrice.toLocaleString() }} ₸</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Форма -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-3xl p-6 shadow-xl">
            <h2 class="text-2xl font-bold text-blue mb-6">Оформление заказа</h2>
            
            <form @submit.prevent="submitForm" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Имя *</label>
                <input 
                  v-model="form.name"
                  type="text"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green focus:border-green transition-colors"
                  :class="{ 'border-red-500 focus:ring-red-500 focus:border-red-500': errors.name }"
                />
                <p v-if="errors.name" class="text-red-500 text-sm mt-1">{{ errors.name }}</p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Телефон</label>
                <input 
                  v-model="form.phone"
                  type="tel"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green focus:border-green transition-colors"
                  :class="{ 'border-red-500 focus:ring-red-500 focus:border-red-500': errors.phone }"
                />
                <p v-if="errors.phone" class="text-red-500 text-sm mt-1">{{ errors.phone }}</p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input 
                  v-model="form.email"
                  type="email"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green focus:border-green transition-colors"
                  :class="{ 'border-red-500 focus:ring-red-500 focus:border-red-500': errors.email }"
                />
                <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Сообщение</label>
                <textarea 
                  v-model="form.message"
                  rows="4"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green focus:border-green transition-colors resize-none"
                  placeholder="Дополнительная информация о заказе..."
                ></textarea>
              </div>

              <button 
                type="submit"
                class="w-full bg-green text-white py-3 rounded-xl font-semibold hover:bg-green/90 transition-colors flex items-center justify-center gap-2"
              >
                <Icon name="mdi:send" class="w-5 h-5" />
                Отправить заказ
              </button>
            </form>

            <p class="text-sm text-gray-600 mt-4">
              * Обязательно указать телефон или email для связи
            </p>
          </div>
        </div>
      </div>

      <!-- Блок рекомендаций -->
      <div v-if="availablePlants.length > 0">
        <PlantsSlider 
          title="Вам может понравиться"
          :plants="availablePlants"
          :all-tags="allTags"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.basket-item-enter-active,
.basket-item-leave-active {
  transition: all 0.3s ease;
}

.basket-item-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}

.basket-item-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

.basket-item-move {
  transition: transform 0.3s ease;
}
</style>
