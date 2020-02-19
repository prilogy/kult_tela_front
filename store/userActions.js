export const state = () => ({
  actions: [
    {
      title: 'Центр тренировок',
      minPlan: 0,
      url: '/workout',
      color: '#f27108'
    },
    {
      title: 'Центр питания',
      minPlan: 0,
      url: '/food',
      color: '#f2b3dd'
    },
    {
      title: 'Онлайн консультация',
      minPlan: 0,
      url: '/special/consultation',
      color: '#219653'
    },
    { title: 'Редактировать профиль', minPlan: 0, url: '/edit' },
    { title: 'Обновить вес', url: '/update-weight' }
  ]
})

export const mutations = {}

export const actions = {}

export const getters = {
  GET_ACTIONS(state) {
    return state.actions
  }
}
