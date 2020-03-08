export const state = () => ({
  currentLinkId: null,
  links: [
    {
      id: 0,
      name: 'Профиль',
      url: '/',
      nested_urls: ['/edit'],
      icon:
        'M17.5 0C7.833 0 0 7.833 0 17.5S7.833 35 17.5 35 35 27.167 35 17.5 27.167 0 17.5 0zm0 6.774a6.21 6.21 0 110 12.42 6.21 6.21 0 010-12.42zm0 24.274c-4.142 0-7.854-1.877-10.338-4.812 1.327-2.498 3.924-4.22 6.95-4.22.17 0 .34.028.502.078.917.296 1.877.487 2.886.487 1.01 0 1.976-.19 2.886-.487.162-.05.332-.078.501-.078 3.027 0 5.624 1.722 6.95 4.22-2.483 2.935-6.195 4.812-10.337 4.812z'
    },
    {
      id: 1,
      name: 'Тренировка',
      url: '/workout',
      nested_urls: [
        '/workout/personal',
        '/workout/exercise',
        '/workout/tips',
        '/workout/tips/health',
        '/workout/tips/common',
        '/workout/exercise/id',
        '/workout/personal/previous',
        '/workout/fill/info'
      ],
      icon:
        'M12.573 31.412a.705.705 0 01-.035.991l-1.52 1.422a.7.7 0 01-.988-.036l-8.854-9.542a.705.705 0 01.036-.992l1.522-1.42a.7.7 0 01.988.037l8.851 9.54zm11.298-17.955a.705.705 0 01-.035.991l-9.57 8.939a.7.7 0 01-.987-.036l-2.284-2.464a.705.705 0 01.036-.992l9.566-8.939a.697.697 0 01.987.036l2.287 2.465zM15.83 28.369a.705.705 0 01-.036.991l-1.522 1.421a.7.7 0 01-.988-.036l-8.85-9.542a.705.705 0 01.036-.991l1.52-1.42a.7.7 0 01.987.035l8.853 9.542zm14.744-14.57a.705.705 0 01-.036.991l-1.522 1.421a.7.7 0 01-.988-.035l-8.851-9.54a.704.704 0 01.035-.991l1.526-1.425a.697.697 0 01.987.036l8.85 9.543zm3.251-3.038a.706.706 0 01-.036.992l-1.519 1.42a.697.697 0 01-.987-.035l-8.85-9.544a.706.706 0 01.036-.992l1.52-1.423a.697.697 0 01.987.035l8.849 9.547z'
    },
    {
      id: 2,
      name: 'Моё питание',
      url: '/food',
      nested_urls: [
        '/food/personal',
        '/food/tips',
        '/food/tips/nutrients',
        '/food/tips/nutrients/fats',
        '/food/tips/nutrients/carbohydrates',
        '/food/tips/nutrients/proteins',
        '/food/tips/nutrients/water',
        '/food/personal/report',
        '/food/tips/videos',
        '/food/tips/videos/id',
        '/food/tips/intro'
      ],
      icon:
        'M32.083 26.25a5.834 5.834 0 01-5.833 5.833h-4.375a5.833 5.833 0 01-5.833-5.833v-2.917h9.902l4.025-6.956 2.275 1.313-3.267 5.643h3.106v2.917zm-18.958 5.833H2.917c0-4.375 0-8.75.48-13.373.395-3.69 1.095-7.54 1.853-11.418h-.875V4.375h7.292v2.917h-.875c.758 3.879 1.458 7.729 1.852 11.418.481 4.623.481 8.998.481 13.373z'
    },
    {
      id: 3,
      name: 'Топ 100',
      url: '/top',
      icon:
        'M11.78 20.809c0-.723-.498-1.268-1.158-1.268H1.97c-.66 0-1.158.545-1.158 1.268 0 .703.504 1.235 1.174 1.235H4.99v9.742c0 .71.539 1.202 1.31 1.202.775 0 1.316-.492 1.316-1.202v-9.742h3.006c.648 0 1.156-.543 1.156-1.235M16.98 19.305c-3.679 0-6.059 2.71-6.059 6.904 0 4.214 2.378 6.936 6.06 6.936 3.66 0 6.026-2.716 6.026-6.918 0-4.206-2.363-6.922-6.027-6.922zm0 11.354c-2.086 0-3.381-1.698-3.381-4.432 0-2.745 1.295-4.453 3.381-4.453 2.068 0 3.351 1.672 3.351 4.357.002 2.877-1.22 4.528-3.35 4.528M29.75 19.54h-3.487c-1.432 0-2.16.758-2.16 2.256v9.957c0 .739.523 1.234 1.3 1.234.762 0 1.296-.5 1.296-1.218v-3.886h2.99c2.818 0 4.502-1.6 4.502-4.281 0-2.542-1.66-4.062-4.441-4.062zm1.782 4.094c0 1.22-.613 1.812-1.877 1.812h-2.957v-3.452h2.957c1.264 0 1.877.537 1.877 1.64M20.686 16.156V10.52h1.578c.928 0 1.692-.889 1.783-2.028L16.94.319l-7.058 8.17c.091 1.139.854 2.03 1.783 2.03h1.579v5.636h7.44'
    }
  ],
  dropdownLinks: [
    { id: 6, name: 'Техническая помощь', url: '/support' },
    {
      id: 5,
      name: 'Выйти из аккаунта',
      action: () => {
        $nuxt.$store.dispatch('auth/LOGOUT', { root: true })
      }
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
    const name = this.$router.history.current.name
    let currentName = ('/' + (name === 'index' ? '' : name)).replace(/-/g, '/')

    const currentLink = getters.GET_LINKS.links.filter(
      link =>
        link.url === currentName ||
        (link.nested_urls && link.nested_urls.includes(currentName))
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
