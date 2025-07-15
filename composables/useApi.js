export const useApi = () => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.apiUrl || 'https://yp-dev-crm.checkngo.pro'

  const buildUrl = (endpoint, params = {}) => {
    const url = new URL(endpoint, baseUrl)
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, value)
      }
    })
    return url.toString()
  }

  const send = async (url, options = {}) => {
    const response = await fetch(url, options)
    return await response.json()
  }

  const get = async (endpoint, params = {}) => {
    const url = buildUrl(endpoint, params)
    return await send(url, { method: 'GET' })
  }

  const post = async (endpoint, data = {}, options = {}) => {
    const { json = false } = options
    const url = buildUrl(endpoint)
    
    let body
    let headers = {}

    if (json) {
      body = JSON.stringify(data)
      headers['Content-Type'] = 'application/json'
    } else {
      body = new FormData()
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          body.append(key, value)
        }
      })
    }

    return await send(url, {
      method: 'POST',
      body,
      headers,
      ...options
    })
  }

  const put = async (endpoint, data = {}, options = {}) => {
    const { json = false } = options
    const url = buildUrl(endpoint)
    
    let body
    let headers = {}

    if (json) {
      body = JSON.stringify(data)
      headers['Content-Type'] = 'application/json'
    } else {
      body = new FormData()
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          body.append(key, value)
        }
      })
    }

    return await send(url, {
      method: 'PUT',
      body,
      headers,
      ...options
    })
  }

  const del = async (endpoint, params = {}) => {
    const url = buildUrl(endpoint, params)
    return await send(url, { method: 'DELETE' })
  }

  return {
    get,
    post,
    put,
    delete: del
  }
}
