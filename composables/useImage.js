export const $image = (endPoint) => {
    const config = useRuntimeConfig()
    return `${config.public.API_URL}${endPoint}`
}