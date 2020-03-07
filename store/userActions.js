export const state = () => ({
  actions: [
    {
      title: 'Центр тренировок',
      url: '/workout',
      color: '#f27108'
    },
    {
      title: 'Центр питания',
      url: '/food',
      color: '#f2b3dd'
    },
    {
      title: 'Онлайн консультация',
      url: '/special/consultation',
      color: '#219653'
    },
    {
      title: 'Сменить план',
      url: '/subscription/change',
      color: '#e0e23c',
      maxPlan: 2
    },
    { title: 'Редактировать профиль', url: '/edit' },
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
