export const state = () => ({
  currentLinkId: null,
  links: [
    { id: 0, name: 'Профиль', icon: '', url: '/profile' },
    { id: 1, name: 'Тренировка', icon: '' },
    { id: 2, name: 'Моё питание', icon: '' },
    { id: 3, name: 'Топ 100', icon: '' }
  ],
  dropdownLinks: [
    { id: 0, name: 'Оповещения' },
    { id: 1, name: 'Обновить вес', url: '/update-weight' },
    { id: 2, name: 'Моё питание' },
    { id: 3, name: 'Калькулятор каллорий' },
    { id: 4, name: 'Связь с поддержкой' },
    { id: 5, name: 'Общий чат' },
    {
      id: 6,
      name: 'Выйти из аккаунта',
      action: () => $nuxt.$store.dispatch('auth/LOGOUT', { root: true })
    }
  ],
  icons: [
    {
      id: 0,
      value: `M17.5 0C7.833 0 0 7.833 0 17.5S7.833 35 17.5 35 35 27.167 35 17.5 27.167 0 17.5 0zm0 6.774a6.21 6.21 0 110 12.42 6.21 6.21 0 010-12.42zm0 24.274c-4.142 0-7.854-1.877-10.338-4.812 1.327-2.498 3.924-4.22 6.95-4.22.17 0 .34.028.502.078.917.296 1.877.487 2.886.487 1.01 0 1.976-.19 2.886-.487.162-.05.332-.078.501-.078 3.027 0 5.624 1.722 6.95 4.22-2.483 2.935-6.195 4.812-10.337 4.812z`
    }
  ]
})

export const mutations = {
  SET_CURRENT_LINK_ID(state, payload) {
    state.currentLinkId = payload
  }
}

export const actions = {
  SET_CURRENT_LINK_ID({ commit, getters }) {
    const currentName = '/' + this.$router.history.current.name
    const currentLink = getters.GET_LINKS.links.filter(
      link => link.url === currentName
    )[0]
    if (currentLink) commit('SET_CURRENT_LINK_ID', currentLink.id)
    else commit('SET_CURRENT_LINK_ID', null)
  }
}

export const getters = {
  GET_LINKS(state) {
    return {
      currentLinkId: state.currentLinkId,
      links: state.links,
      dropdownLinks: state.dropdownLinks,
      icons: state.icons
    }
  }
}
