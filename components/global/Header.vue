<script setup>
import DarkLogo from '~/assets/images/global/logo.jpg';
import LightLogo from '~/assets/images/global/logo.jpg';

const props = defineProps({
  mode: {
    type: String,
    default: 'light',
  },
  renderNavigationInMobile: {
    type: Boolean,
    default: true,
  },
  isSticky: {
	type: Boolean,
	default: true,
  },
})

const isMenuOpen = ref(false)

const logo = computed(() => {
  return props.mode === 'light' ? LightLogo : DarkLogo;
})

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
</script>

<template>
	<header :class="{'bg-green': props.mode === 'light', 'bg-blue': props.mode === 'dark', 'sticky top-0 left-0 right-0 z-50': props.isSticky}">
		<div v-if="!props.renderNavigationInMobile" class="flex items-center justify-between p-4 min-sm:flex-row flex-col gap-32px">
			<div class="min-sm:order-1 order-1">
				<img class="h-32px cursor-pointer" :src="logo" @click="scrollToTop" />
			</div>
			<div class="max-lg:hidden order-2">
				<Navigation :mode="props.mode" />
			</div>
			<div class="max-sm:hidden order-3">
				<BasketFavoriteButtons :mode="props.mode" />
			</div>
		</div>
		
		<div v-else class="flex justify-between items-center p-4">
			<img class="h-32px cursor-pointer" :src="logo" @click="scrollToTop" />
			
			<div class="max-lg:hidden">
				<Navigation :mode="props.mode" />
			</div>
			<div class="max-lg:hidden flex items-center space-x-4">
				<LanguageSwitcher :mode="props.mode" />
				<BasketFavoriteButtons :mode="props.mode" />
			</div>

			<button 
				@click="toggleMenu"
				class="min-lg:hidden flex flex-col justify-center items-center w-6 h-6 space-y-1"
				:class="{'text-white': props.mode === 'light', 'text-white': props.mode === 'dark'}"
			>
				<span 
					class="block w-5 h-0.5 bg-current transition-all duration-300"
					:class="{ 'rotate-45 translate-y-1.5': isMenuOpen }"
				></span>
				<span 
					class="block w-5 h-0.5 bg-current transition-all duration-300"
					:class="{ 'opacity-0': isMenuOpen }"
				></span>
				<span 
					class="block w-5 h-0.5 bg-current transition-all duration-300"
					:class="{ '-rotate-45 -translate-y-1.5': isMenuOpen }"
				></span>
			</button>
		</div>

		<div 
			v-show="props.renderNavigationInMobile"
			class="min-lg:hidden fixed top-0 right-0 h-full w-full z-100 transition-all duration-300"
			:class="[
				{ 'opacity-100 translate-x-0': isMenuOpen, 'opacity-0 translate-x-full pointer-events-none': !isMenuOpen },
				{ 'bg-white shadow-lg': props.mode === 'light', 'bg-blue shadow-lg': props.mode === 'dark' }
			]"
		>
			<div class="flex flex-col p-4 space-y-4 h-full">
				<div class="flex justify-between items-center mb-32px">
					<img class="h-32px cursor-pointer" :src="logo" @click="scrollToTop" />
					<button 
						@click="toggleMenu"
						class="flex justify-center items-center w-6 h-6 relative"
						:class="{'text-white	': props.mode === 'light', 'text-white': props.mode === 'dark'}"
					>
						<span class="absolute block w-5 h-0.5 bg-current rotate-45"></span>
						<span class="absolute block w-5 h-0.5 bg-current -rotate-45"></span>
					</button>
				</div>
				
				<Navigation :mode="props.mode" @navigate="toggleMenu" />
				<div class="mt-auto flex flex-col gap-16px w-fit items-start">
					<LanguageSwitcher :mode="props.mode" />
					<BasketFavoriteButtons :mode="props.mode" />
				</div>
				
			</div>
		</div>
	</header>
</template>
