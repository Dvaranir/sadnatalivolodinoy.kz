<script setup>
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

onMounted(() => {
  calculateMaxHeight()
})
onUpdated(() => {
  calculateMaxHeight()
})
</script>

<template>
    <div class="mx-auto">
        <div class="grid grid-cols-2 max-md:grid-cols-1 max-w-[1072px] gap-24px mx-8px">
            <div
                v-for="(block, index) in blocks"
                :key="index"
                class="flex flex-col items-center max-w-[524px] bg-white p-16px">
                <div 
                    v-if="block?.title || !block.numberRenderingDisabled || !block.numberRenderingDisabled"
                    class="flex flex-col items-start w-full mb-16px"
                    :ref="el => headingBlocks[index] = el"
                    :style="setHeadingsHeight && maxHeight ? { height: `${maxHeight}px` } : {}"
                >
                    <h2 v-if="!block.numberRenderingDisabled" class="mr-auto text-blue text-48px font-bold">{{ numberPrefix }}{{ index + 1 }}</h2>
                    <h2 v-if="block.title" class="text-blue text-24px font-semibold mb-12px">{{ block.title }}</h2>
                    <div v-if="block.description || block.checklistItems?.length" class="mb-24px text-blue text-16px font-light">
                        <p class="text-16px">{{ block.description }}</p>
                        <Checklist v-if="block.checklistItems?.length" :items="block.checklistItems" />
                    </div>
                </div>
                
                <div
                    v-if="block?.images?.length"
                    :class="`grid gap-x-16px max-md:!grid-cols-1 max-md:gap-y-16px h-fit ${block.imagesVerticalAlignment === 'top' ? 'mb-auto': 'mt-auto'}`"
                    :style="`grid-template-columns: repeat(${block.images.length}, 1fr);`"
                >
                    <div
                        v-for="(image, imgIndex) in block.images"
                        :key="imgIndex"
                        class="flex flex-col items-center h-fit"    
                    >
                        <img
                            :src="image.src"
                            :alt="image.alt"
                            class="h-full" />
                        <p v-if="image.caption" class="text-center text-blue/50">{{ image.caption }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
