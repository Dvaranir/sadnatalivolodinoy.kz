<script setup>
const coreStore = useCoreStore()
const { t } = useI18n()

const props = defineProps({
  mode: {
    type: String,
    default: 'light',
  },
})

const openContactModal = () => {
  coreStore.openContactModal()
}
</script>

<template>
  <button
    @click="openContactModal"
    class="rounded-md p-8px leading-[100%] font-regular text-16px transition-colors duration-200 ease-in-out w-fit max-sm:text-24px max-sm:font-bold text-blue bg-white border-1 border-white hover:!text-white hover:!bg-blue">
    {{ t('global.contactButton') }}
  </button>
</template>

<style></style>
