export const state = () => ({
  actions: [
    {
      id: 0,
      title: 'Вебинар с Мариной Богомоловой',
      minPlan: 0,
      url: '/special/webinar',
      color: '#56CCF2'
    },
    {
      id: 1,
      title: 'Онлайн консультация',
      minPlan: 0,
      url: '/special/consultation',
      color: '#219653'
    },
    { id: 2, title: 'Калькулятор калорий', minPlan: 0, url: '/calculator' },
    { id: 3, title: 'Посмотреть планы', minPlan: 0, url: '/plans' },
    { id: 4, title: 'Все рецепты', minPlan: 0, url: '/recipe' }
  ]
})

export const mutations = {}

export const actions = {}

export const getters = {
  GET_ACTIONS(state) {
    return state.actions
  }
}
