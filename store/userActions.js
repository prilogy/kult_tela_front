export const state = () => ({
  actions: [
    {
      title: 'Центр тренировок',
      url: '/workout',
      color: '#4f8bf2'
    },
    {
      title: 'Центр питания',
      url: '/food',
      color: '#f2bda7'
    },
    {
      title: 'Иммунитет',
      url: '/immunity',
      color: '#30cdb3'
    },
    {
      title: 'Онлайн-консультация',
      url: '/special/consultation',
      color: '#e15e4c',
      paid: true
    },
    {
      title: 'Сменить пакет',
      url: '/subscription/change',
      color: '#e0e23c',
      maxPlan: 2
    },
    { title: 'Редактировать профиль', url: '/edit' },
    { title: 'Обновить вес', url: '/update-weight' },
    { title: 'О приложении', url: '/about' }
  ]
})

export const mutations = {}

export const actions = {}

export const getters = {
  GET_ACTIONS(state) {
    return state.actions
  }
}
