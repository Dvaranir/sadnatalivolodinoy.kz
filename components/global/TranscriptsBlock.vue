<script setup>
const { t } = useI18n()

const props = defineProps({
  blocks: {
    type: Array,
    required: true
  },
  numberPrefix: {
    type: String,
    default: '0',
    required: false,
  },
  setHeadingsHeight: {
    type: Boolean,
    default: false,
    required: false,
  },
  renderButton: {
    type: Boolean,
    default: true,
    required: false,
  },
})

const headingBlocks = ref([])
const maxHeight = ref(0)

const calculateMaxHeight = () => {
  if (!props.setHeadingsHeight) return
  
  nextTick(() => {
    const heights = headingBlocks.value
      .filter(el => el)
      .map(el => el.offsetHeight)
    
    maxHeight.value = Math.max(...heights)
  })
}

const handleButtonClick = (block, index) => {
  if (block.onClick && typeof block.onClick === 'function') {
    block.onClick(block, index)
  }
}

onMounted(calculateMaxHeight)
onUpdated(calculateMaxHeight)
</script>

<template>
    <div class="mx-auto">
      <div class="grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 max-w-[1072px] gap-24px mx-8px">
        <div
            v-for="(block, index) in blocks"
            :key="index"
            :class="`flex flex-col items-center bg-white p-32px max-lg:col-span-1 ${block.rowSpan && block.rowSpan >= 1 && block.rowSpan <= 3 ? `col-span-${block.rowSpan}` : ''}`">
            <div 
                v-if="block?.title || !block.numberRenderingDisabled || !block.numberRenderingDisabled"
                :ref="el => headingBlocks[index] = el"
                class="flex flex-col justify-start w-full"
                :style="setHeadingsHeight && maxHeight ? { height: `${maxHeight}px` } : {}"
            >
                <h2 v-if="!block.numberRenderingDisabled" class="mr-auto text-blue text-48px font-bold">{{ numberPrefix }}{{ index + 1 }}</h2>
                <h2 v-if="block.heading" class="text-blue text-24px font-semibold mb-16px leading-[120%]" v-html="block.heading"></h2>
                <div v-if="block.description || block.checklistItems?.length" class="mb-24px text-blue">
                    <p>{{ block.description }}</p>
                    <Checklist v-if="block.checklistItems?.length" :items="block.checklistItems" :useBullets="true" />
                </div>
            </div>

            <button 
                v-if="renderButton"
                @click="handleButtonClick(block, index)"
                class="mt-auto bg-gray text-blue px-4 py-2 rounded hover:bg-blue hover:text-white cursor-pointer w-full transition-colors"
            >
                {{ block.buttonText || t('global.readMore') }}
            </button>
        </div>
      </div>
    </div>
</template>
