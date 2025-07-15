export const useApi = () => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.apiUrl || 'http://localhost:1337'

  const buildUrl = (endpoint, params = {}) => {
    const url = new URL(`/api${endpoint}`, baseUrl)
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, value)
      }
    })
    return url.toString()
  }

  const send = async (url, options = {}) => {
    const defaultHeaders = {
      'Content-Type': 'application/json',
      ...options.headers
    }

    const response = await fetch(url, {
      ...options,
      headers: defaultHeaders
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  }

  const get = async (endpoint, params = {}) => {
    const url = buildUrl(endpoint, params)
    return await send(url, { method: 'GET' })
  }

  const post = async (endpoint, data = {}, options = {}) => {
    const url = buildUrl(endpoint)
    return await send(url, {
      method: 'POST',
      body: JSON.stringify({ data }),
      ...options
    })
  }

  const put = async (endpoint, data = {}, options = {}) => {
    const url = buildUrl(endpoint)
    return await send(url, {
      method: 'PUT',
      body: JSON.stringify({ data }),
      ...options
    })
  }

  const del = async (endpoint, params = {}) => {
    const url = buildUrl(endpoint, params)
    return await send(url, { method: 'DELETE' })
  }

  const findOne = async (collection, id, params = {}) => {
    return await get(`/${collection}/${id}`, params)
  }

  const findMany = async (collection, params = {}) => {
    return await get(`/${collection}`, params)
  }

  const create = async (collection, data = {}, options = {}) => {
    return await post(`/${collection}`, data, options)
  }

  const update = async (collection, id, data = {}, options = {}) => {
    return await put(`/${collection}/${id}`, data, options)
  }

  const remove = async (collection, id, params = {}) => {
    return await del(`/${collection}/${id}`, params)
  }

  return {
    get,
    post,
    put,
    delete: del,
    findOne,
    findMany,
    create,
    update,
    remove
  }
}
