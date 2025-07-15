<script setup>
const coreStore = useCoreStore()

const contentComponents = {
  'DistinctRegistration': resolveComponent('LegalContentDistinctRegistration'),
  'ExplicitProhibitions': resolveComponent('LegalContentExplicitProhibitions'),
  'ProhibitingTipsIsNotAllowed': resolveComponent('LegalContentProhibitingTipsIsNotAllowed'),
  'RecommendedPaymentMethod': resolveComponent('LegalContentRecommendedPaymentMethod'),
  'RestaurantTemporaryIncome': resolveComponent('LegalContentRestaurantTemporaryIncome'),
  'StaffDistribution': resolveComponent('LegalContentStaffDistribution'),
  'TipsThroughExternalService': resolveComponent('LegalContentTipsThroughExternalService'),
}

const currentComponent = computed(() => {
  const contentName = coreStore.legalModalContent
  return contentComponents[contentName] || null
})
</script>

<template>
  <ModalBase 
    :is-open="coreStore.isLegalModalOpen" 
    @close="coreStore.closeLegalModal"
    max-width="max-w-4xl"
  >
    <component :is="currentComponent" v-if="currentComponent" />
  </ModalBase>
</template>
