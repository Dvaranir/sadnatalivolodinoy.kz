<script setup>
const currentYear = new Date().getFullYear()
const { t } = useI18n()
</script>

<template>
    <div class="bg-green text-white">
        <Header mode="light" :renderNavigationInMobile="false" :isSticky="false" />
        <div class="text-center text-white/70 py-4">
            {{ t('global.copyright', { year: currentYear }) }}
        </div>
    </div>
</template>
