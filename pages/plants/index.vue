<script setup>
import { Combobox, ComboboxInput, ComboboxButton, ComboboxOptions, ComboboxOption, Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'
import TopBackgroundImage from '~/assets/images/pages/home/top_background.jpeg'

const route = useRoute()
const router = useRouter()

const searchQuery = ref(route.query.search || '')
const selectedCategory = ref(route.query.category || '')
const selectedTags = ref(route.query.tags ? route.query.tags.split(',') : [])

const categories = ref([
  { id: 'all', name: 'Все категории' },
  { id: 'indoor', name: 'Комнатные растения' },
  { id: 'outdoor', name: 'Садовые растения' },
  { id: 'flowers', name: 'Цветы' },
  { id: 'trees', name: 'Деревья' },
  { id: 'herbs', name: 'Травы' }
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

const mockPlants = ref([
  {
    id: 1,
    slug: 'ficus-benjamin',
    name: 'Фикус Бенджамина',
    price: 5000,
    image: TopBackgroundImage,
    category: 'indoor',
    tags: ['easy-care', 'air-purifying', 'low-light']
  },
  {
    id: 2,
    slug: 'rose-red',
    name: 'Роза красная',
    price: 3500,
    image: TopBackgroundImage,
    category: 'flowers',
    tags: ['flowering', 'fragrant']
  },
  {
    id: 3,
    slug: 'lavender',
    name: 'Лаванда',
    price: 2500,
    image: TopBackgroundImage,
    category: 'herbs',
    tags: ['fragrant', 'medicinal', 'drought-tolerant']
  },
  {
    id: 4,
    slug: 'apple-tree',
    name: 'Яблоня',
    price: 15000,
    image: TopBackgroundImage,
    category: 'trees',
    tags: ['fast-growing', 'flowering']
  },
  {
    id: 5,
    slug: 'monstera',
    name: 'Монстера деликатесная',
    price: 8000,
    image: TopBackgroundImage,
    category: 'indoor',
    tags: ['easy-care', 'air-purifying', 'fast-growing', 'low-light']
  },
  {
    id: 6,
    slug: 'petunia',
    name: 'Петуния',
    price: 1500,
    image: TopBackgroundImage,
    category: 'flowers',
    tags: ['flowering', 'easy-care']
  }
])

const filteredPlants = computed(() => {
  return mockPlants.value.filter(plant => {
    const matchesSearch = plant.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesCategory = selectedCategory.value === '' || selectedCategory.value === 'all' || plant.category === selectedCategory.value
    const matchesTags = selectedTags.value.length === 0 || selectedTags.value.every(tag => plant.tags.includes(tag))
    return matchesSearch && matchesCategory && matchesTags
  })
})

const updateFilters = () => {
  const query = {}
  if (searchQuery.value) query.search = searchQuery.value
  if (selectedCategory.value && selectedCategory.value !== 'all') query.category = selectedCategory.value
  if (selectedTags.value.length > 0) query.tags = selectedTags.value.join(',')
  
  router.push({ query })
}

watch([searchQuery, selectedCategory, selectedTags], updateFilters)
</script>

<template>
  <div class="min-h-screen bg-creme">
    <div class="container mx-auto px-4 py-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-blue mb-6">Каталог растений</h1>
        
        <div class="flex flex-col md:flex-row gap-4 mb-8">
          <div class="flex-1">
            <Combobox v-model="searchQuery" nullable>
              <div class="relative">
                <ComboboxInput
                  class="w-full h-14 px-6 pr-12 bg-white border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent placeholder-gray-400 text-blue font-medium shadow-lg transition-all duration-300"
                  placeholder="Поиск растений..."
                  @change="searchQuery = $event.target.value"
                />
                <ComboboxButton class="absolute inset-y-0 right-0 flex items-center pr-4">
                  <Icon name="mdi:magnify" class="h-5 w-5 text-gray-400" />
                </ComboboxButton>
              </div>
            </Combobox>
          </div>
          
          <div class="md:w-64">
            <Listbox v-model="selectedCategory">
              <div class="relative">
                <ListboxButton class="w-full h-14 px-6 pr-12 bg-white border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent text-left text-blue font-medium shadow-lg transition-all duration-300 hover:border-green">
                  <span class="block truncate">
                    {{ categories.find(c => c.id === selectedCategory)?.name || 'Все категории' }}
                  </span>
                  <span class="absolute inset-y-0 right-0 flex items-center pr-4">
                    <Icon name="mdi:chevron-down" class="h-5 w-5 text-gray-400" />
                  </span>
                </ListboxButton>
                <ListboxOptions class="absolute z-10 mt-2 w-full bg-white border-2 border-gray-200 rounded-2xl shadow-xl max-h-60 overflow-auto">
                  <ListboxOption
                    v-for="category in categories"
                    :key="category.id"
                    :value="category.id"
                    class="relative cursor-pointer select-none py-3 px-6 text-blue hover:bg-green hover:text-white transition-colors duration-200"
                    v-slot="{ active, selected }"
                  >
                    <span class="block truncate font-medium" :class="{ 'font-bold': selected }">
                      {{ category.name }}
                    </span>
                    <span v-if="selected" class="absolute inset-y-0 right-0 flex items-center pr-4">
                      <Icon name="mdi:check" class="h-5 w-5" />
                    </span>
                  </ListboxOption>
                </ListboxOptions>
              </div>
            </Listbox>
          </div>
          
          <div class="md:w-64">
            <Listbox v-model="selectedTags" multiple>
              <div class="relative">
                <ListboxButton class="w-full h-14 px-6 pr-12 bg-white border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent text-left text-blue font-medium shadow-lg transition-all duration-300 hover:border-green">
                  <span class="block truncate">
                    {{ selectedTags.length === 0 ? 'Теги' : `Выбрано: ${selectedTags.length}` }}
                  </span>
                  <span class="absolute inset-y-0 right-0 flex items-center pr-4">
                    <Icon name="mdi:tag-multiple" class="h-5 w-5 text-gray-400" />
                  </span>
                </ListboxButton>
                <ListboxOptions class="absolute z-10 mt-2 w-full bg-white border-2 border-gray-200 rounded-2xl shadow-xl max-h-60 overflow-auto">
                  <ListboxOption
                    v-for="tag in allTags"
                    :key="tag.id"
                    :value="tag.id"
                    class="relative cursor-pointer select-none py-3 px-6 text-blue hover:bg-green hover:text-white transition-colors duration-200"
                    v-slot="{ active, selected }"
                  >
                    <span class="block truncate font-medium" :class="{ 'font-bold': selected }">
                      {{ tag.name }}
                    </span>
                    <span v-if="selected" class="absolute inset-y-0 right-0 flex items-center pr-4">
                      <Icon name="mdi:check" class="h-5 w-5" />
                    </span>
                  </ListboxOption>
                </ListboxOptions>
              </div>
            </Listbox>
          </div>
        </div>
      </div>
      
      <div class="mb-6">
        <p class="text-gray-600">
          Найдено {{ filteredPlants.length }} растений
          <span v-if="searchQuery || (selectedCategory && selectedCategory !== 'all')" class="text-green font-medium">
            по вашему запросу
          </span>
        </p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <Plant
          v-for="plant in filteredPlants"
          :key="plant.id"
          :plant="plant"
          :show-tags="true"
          :all-tags="allTags"
        />
      </div>
      
      <div v-if="filteredPlants.length === 0" class="text-center py-12">
        <div class="text-gray-500 text-lg">
          <Icon name="mdi:leaf-off" class="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p>Растения не найдены</p>
          <p class="text-sm mt-2">Попробуйте изменить критерии поиска</p>
        </div>
      </div>
    </div>
  </div>
</template>
