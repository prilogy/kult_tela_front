<template>
  <div class="messages">
    <VH2 class="messages__title">Сообщения</VH2>
    <div>
      <ul v-for="room in rooms" :key="room.id" class="messages__contacts">
        <li class="messages__contacts__item">
          <div class="contact">
            <img :src="room.avatar_src" class="contact__avatar" alt="avatar" />
            <div class="contact__aside">
              <div class="contact__aside__top">
                <VP class="contact__aside__top__name">{{ room.name }}</VP>
                <VP class="contact__aside__top__time">{{ room.date }}</VP>
              </div>
              <div class="contact__aside__bottom">
                <VP class="contact__aside__bottom__text">
                  {{ cutUnderWidth(room.text) }}
                </VP>
                <div class="contact__aside__bottom__mark">
                  <VCaption>2</VCaption>
                </div>
              </div>
            </div>
          </div>
          <VDivider class="contact__divider"></VDivider>
        </li>
      </ul>
    </div>
    <div><VP ref="phantomChar" class="phantom-char">S</VP></div>
  </div>
</template>

<script>
import { VDivider } from '../../components/'
export default {
  components: { VDivider },
  data() {
    return {
      charWidth: null,
      rooms: [
        {
          id: 0,
          name: 'Иван Иванов',
          text: 'Алло ты где ? Тута...',
          unread: 2,
          avatar_src:
            'https://i.pinimg.com/originals/bd/71/46/bd7146bb7f82b89c3a39489e44b36941.jpg',
          date: '15:50'
        },
        {
          id: 1,
          name: 'Инджирбашвилли Куов',
          text: 'Что по поводу завтра? ГО?!!! yf[[asdas[ asdasdas dashdasy das',
          unread: 2,
          avatar_src:
            'https://i.pinimg.com/originals/bd/71/46/bd7146bb7f82b89c3a39489e44b36941.jpg',
          date: '3 Окт.'
        }
      ]
    }
  },
  methods: {
    cutUnderWidth(value) {
      if (!value) return ''
      value = value.toString()
      const safeWidth = window.innerWidth - 50 - 10
      const safeAmount = Math.floor(safeWidth / this.charWidth) - 2

      const diff = value.length - safeAmount
      console.log(`len: ${value.length}, safeAM: ${safeAmount}, diff: ${diff}`)
      return diff > 0 ? value.substr(0, value.length - diff) + '...' : value
    }
  },
  mounted() {
    this.charWidth = this.$refs.phantomChar.$el.offsetWidth
  }
}
</script>

<style scoped>
.messages {
}

.messages__title {
  margin-bottom: var(--space-half);
}

.messages__contacts__item {
  --avatar-size: 50px;
  margin-left: calc(-1 * var(--space-third));
}

.messages__contacts__item .contact {
  display: flex;
  align-items: center;
  width: 100%;
}

.contact .contact__avatar {
  min-width: var(--avatar-size) !important;
  max-width: var(--avatar-size) !important;
  height: var(--avatar-size);
  border-radius: calc(var(--avatar-size) * 2);
  margin-right: var(--space-half);
}

.contact__aside {
  width: 100%;
}

.contact__aside__bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.contact__aside__bottom__mark {
  border-radius: 100px;
  background: var(--yellow-trans1);
  padding: 4px 8px;
}

.contact__aside__bottom__mark p {
  color: var(--grey-base);
  font-weight: 500;
}

.contact__aside__bottom__text {
  color: var(--white-trans1);
}

.messages__contacts__item .contact__divider {
  margin: var(--space-half) 0;
  margin-left: calc(var(--avatar-size) + 5px);
  margin-right: calc(-1 * (var(--space)));
}

.contact__aside__top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 3px;
}
.contact__aside__top__time {
  font-weight: 300;
  color: var(--white-trans1);
}

.phantom-char {
  position: fixed;
  bottom: 0;
  right: 0;
  opacity: 0;
}
</style>
