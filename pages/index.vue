<script setup>
import TopBackgroundImage from '~/assets/images/pages/home/top_background.jpeg';

const { t, tm, rt } = useI18n();
const coreStore = useCoreStore()
const localePath = useLocalePath()

const openContactModal = () => {
  coreStore.openContactModal()
}
</script>

<template>
  <TopHeadingSection :backgroundImage="TopBackgroundImage">
    <h2 class="text-gray-darker text-32px text-center opacity-50 mb-8px">{{ t('home.brandName') }}</h2>
    <h1 class="text-white text-72px text-center font-bold leading-[100%] mb-32px max-md:text-48px">{{ t('home.heroTitle') }}</h1>
    <Button @click="openContactModal" tag="a" href="#" variant="white" class="font-24px">{{ t('home.contactButton') }}</Button>
  </TopHeadingSection>
  
</template>
