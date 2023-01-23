
const baseUrl = 'http://localhost:3333';

export const http = {
  token: '',
  fetch(url, options) {

    url = url?.substr(0,1) === '/' ? baseUrl+url : url;

    const config = {
      ...options,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': this.token,
        ...options?.headers,
      },
      body: JSON.stringify(options?.body)
    }

    return fetch(url, config)
      .then(res => (res.status >= 400) ? res.json().then(body => {res.data = body; return Promise.reject(res)}) : res)
      .then(res => res.json())
  },

  get(url) {
    return this.fetch(url)
  },

  post(url, body = {}) {
    return this.fetch(url, {
      method: 'POST',
      body,
    })
  },

  patch(url, body = {}) {
    return this.fetch(url, {
      method: 'PATCH',
      body,
    })
  },

  put(url, body = {}) {
    return this.fetch(url, {
      method: 'PUT',
      body,
    })
  },

  delete(url, body = {}) {
    return this.fetch(url, {
      method: 'DELETE',
      body,
    })
  },
}