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
      dropdownLinks: state.dropdownLinks
    }
  }
}
