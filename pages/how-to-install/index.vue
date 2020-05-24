<template>
  <div>
    <VPageHeading button>
      Установка приложения
    </VPageHeading>
    <VH3 mb="var(--space-half)" color="var(--white-base)">Какое устройство вы используете?</VH3>
    <ul class="list">
      <li @click="deviceId = device.id" v-for="device in devices" :key="device.id"
          :style="{color: device.id === deviceId ? 'var(--yellow-base)' : ''}">
        {{device.title}}
      </li>
    </ul>

    <div v-if="currentDevice != null" class="guide">
      <VPageHeading level="3">
        {{currentDevice.guideTitle}}
        <template v-slot:info>{{currentDevice.guideDesc}}</template>
      </VPageHeading>
      <div class="step" v-for="step in currentDevice.guide" :key="step.id">
        <div class="__num">
          <VH3>{{step.id + 1}}</VH3>
          <div class="__line"></div>
        </div>
        <div class="__info">
          <VP color="var(--yellow-base)">
            {{step.text}}
          </VP>
          <img :src="step.image" alt="1">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        deviceId: null,
        devices: [
          {
            id: 0,
            title: 'Устройство на Android',
            guideTitle: 'Установка приложения на Android',
            guideDesc: 'Для установки приложения на Android рекомендуется использовать браузер Google Chrome.',
            guide: [
              {
                id: 0,
                text: 'Откройте меню браузера и нажмите на кнопку "Добавить на главный экран".',
                image: '/images/install/android1.jpg'
              },
              {
                id: 1,
                text: 'Нажмите на "Добавить" для подтверждения установки.',
                image: '/images/install/android2.jpg'
              },
              {
                id: 2,
                text: 'Готово! Теперь Культ Тела появится в вашем списке приложений!',
                image: '/images/install/android3.jpg'
              }
            ]
          },
          {
            id: 1,
            title: 'Устройство на iOS',
            guideTitle: 'Установка приложения на iOS',
            guideDesc: 'Для установки приложения на iOS рекомендуется использовать браузер Safari.',
            guide: [
              {
                id: 0,
                text: 'Откройте меню браузера и нажмите на кнопку "На экран <<Домой>>".',
                image: '/images/install/ios1.jpg'
              },
              {
                id: 1,
                text: 'Нажмите на "Добавить" для подтверждения установки.',
                image: '/images/install/ios2.jpg'
              },
              {
                id: 2,
                text: 'Готово! Теперь Культ Тела появится в вашем списке приложений!',
                image: '/images/install/ios3.jpg'
              }
            ]
          },
          {
            id: 2,
            title: 'Компьютер на Windows',
            guideTitle: 'Установка приложения на Windows',
            guideDesc: 'Для установки приложения на Windows рекомендуется использовать браузер Google Chrome.',
            guide: [
              {
                id: 0,
                text: 'Откройте меню браузера и нажмите на кнопку "Установка приложения culttela.ru...".',
                image: '/images/install/pc1.png'
              },
              {
                id: 1,
                text: 'Нажмите на "Установить" для подтверждения установки.',
                image: '/images/install/pc2.png'
              },
              {
                id: 2,
                text: 'Готово! Теперь Культ Тела появится в вашем меню пуск приложений!',
                image: '/images/install/pc3.png'
              }
            ]
          }
        ]
      }
    },
    computed: {
      currentDevice() {
        if (this.deviceId != null) {
          return this.devices.filter(d => d.id === this.deviceId)[0]
        }
        return null
      }
    }
  }
</script>

<style scoped>
  .list {
    list-style: disc;
    margin-left: var(--space);
  }

  .list li {
    font-size: 20px;
    color: var(--grey-light3);
    line-height: 2;
    cursor: pointer;
  }

  img {
    max-width: 70%;
    border-radius: var(--radius);
    margin-top: var(--space-half);
    border: solid 2px var(--yellow-trans1);
  }

  .guide {
    margin-top: var(--space-half);
  }

  .step {
    display: flex;
    margin-bottom: var(--space-half);
  }

  .step .__num {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .step .__num .__line {
    content: "";
    height: 100%;
    width: 3px;
    background: var(--grey-light1);
    border-radius: var(--radius);
    margin: var(--space-half) 0;
  }

  .step .__info {
    margin: 4px 0 0 var(--space-half);
  }
</style>
