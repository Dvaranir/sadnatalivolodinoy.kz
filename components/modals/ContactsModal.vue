<script setup>
import * as yup from 'yup'

const coreStore = useCoreStore()
const api = useApi()

const schema = yup.object({
  name: yup.string().required('Nombre es requerido'),
  email: yup.string().email('Email inválido').required('Email es requerido'),
  restaurant: yup.string().required('Restaurante es requerido'),
  message: yup.string().required('Mensaje es requerido')
})

const form = reactive({
  name: '',
  email: '',
  restaurant: '',
  message: ''
})

const errors = ref({})

const validateField = async (field) => {
  try {
    await schema.validateAt(field, form)
    errors.value[field] = ''
  } catch (error) {
    errors.value[field] = error.message
  }
}

const handleSubmit = async () => {
  try {
    await schema.validate(form, { abortEarly: false })

    const response = await api.get('/enp/mail/proposals_for_cooperation', {
      name: form.name,
      restaurant: form.restaurant,
      email: form.email,
      message: form.message
    })

    if (response.success) {
      setTimeout(() => {
        coreStore.closeContactModal()
        Object.keys(form).forEach(key => form[key] = '')
        errors.value = {}
      }, 200)
    }
  } catch (error) {
    if (error.inner) {
      const newErrors = {}
      error.inner.forEach(err => {
        newErrors[err.path] = err.message
      })
      errors.value = newErrors
    }
  }
}
</script>

<template>
  <ModalBase :is-open="coreStore.isContactModalOpen" @close="coreStore.closeContactModal">
    <div class="flex flex-col gap-24px">
      <h2 class="leading-[120%] text-24px font-bold">Contactos</h2>

      <div>
        <label class="block leading-[140%] text-16px mb-8px">Nombre</label>
        <input 
          v-model="form.name"
          @blur="validateField('name')"
          type="text"
          class="w-full p-12px border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue"
          :class="{ 'border-red-500': errors.name }"
        />
        <span v-if="errors.name" class="text-red-500 text-14px">{{ errors.name }}</span>
      </div>

      <div>
        <label class="block leading-[140%] text-16px mb-8px">Email</label>
        <input 
          v-model="form.email"
          @blur="validateField('email')"
          type="email"
          class="w-full p-12px border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue"
          :class="{ 'border-red-500': errors.email }"
        />
        <span v-if="errors.email" class="text-red-500 text-14px">{{ errors.email }}</span>
      </div>

      <div>
        <label class="block leading-[140%] text-16px mb-8px">Restaurante</label>
        <input 
          v-model="form.restaurant"
          @blur="validateField('restaurant')"
          type="text"
          class="w-full p-12px border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue"
          :class="{ 'border-red-500': errors.restaurant }"
        />
        <span v-if="errors.restaurant" class="text-red-500 text-14px">{{ errors.restaurant }}</span>
      </div>

      <div>
        <label class="block leading-[140%] text-16px mb-8px">Mensaje</label>
        <textarea 
          v-model="form.message"
          @blur="validateField('message')"
          class="w-full p-12px border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue max-h-[256px] resize-none"
          :class="{ 'border-red-500': errors.message }"
        ></textarea>
        <span v-if="errors.message" class="text-red-500 text-14px">{{ errors.message }}</span>
      </div>

      <Button variant="blue" @click="handleSubmit">
        Entregar
      </Button>
    </div>
  </ModalBase>
</template>