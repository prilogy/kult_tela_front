export const state = () => ({
  actions: [
    {
      title: 'Вебинар с Мариной Богомоловой',
      minPlan: 0,
      url: '/special/webinar',
      color: '#56CCF2'
    },
    {
      title: 'Онлайн консультация',
      minPlan: 0,
      url: '/special/consultation',
      color: '#219653'
    },
    { title: 'Калькулятор калорий', minPlan: 0, url: '/calculator' },
    { title: 'Посмотреть планы', minPlan: 0, url: '/plans' },
    { title: 'Редактировать профиль', minPlan: 0, url: '/edit' },
    { title: 'Советы по питанию', minPlan: 0, url: '/food/tips' }
  ]
})

export const mutations = {}

export const actions = {}

export const getters = {
  GET_ACTIONS(state) {
    return state.actions
  }
}
