<template>
  <div>
    <VPageHeading button to="/">О приложении</VPageHeading>
    <VP>
      Информационное приложение фитнес-проекта "Культ тела". Носит
      рекомендательный характер.
    </VP>
    <VP>Все авторские права принадлежат ИП Титков Е.А.</VP>
    <VDivider mt="var(--space)" mb="var(--space-half"></VDivider>
    <VP>
      Приложение разработано и поддерживается компанией Prilogy.
    </VP>
    <VP>
      Мы погружаемся с головой в каждый проект, чтобы сделать его максимально
      удобным для пользователя и прибыльным для бизнеса.
    </VP>
    <VP>Наши контакты:</VP>
    <ul>
      <li>
        <VP>
          Написать -
          <a href="mailto:commerc@prilogy.ru">commerc@prilogy.ru</a>
        </VP>
      </li>
      <li>
        <VP>
          Позвонить -
          <a href="tel:+79648708939">+78043336816</a>
          (звонок бесплатный)
        </VP>
      </li>
      <li>
        <VP>
          Узнать больше -
          <a href="http://www.prilogy.ru" target="_blank">prilogy.ru</a>
        </VP>
      </li>
    </ul>

    <VDivider mt="var(--space)" mb="var(--space-half"></VDivider>
    <VP>
      Копирование или изменение, обнародование или использование, а также
      размещение в интернете в коммерческих или рекламных целях без согласия
      правообладателя, либо без явного указания в тех случаях, когда дано
      разрешение на некоммерческое использование или использование в
      образовательных целях материалов, изображений или видео, предоставляемых
      приложением, будет являться прямым нарушением авторских прав, что может
      повлечь гражданско-правовую, административную или уголовную
      ответственность.
    </VP>
    <VDivider mt="var(--space)" mb="var(--space-half"></VDivider>
    <VP class="p-header">ИП Титков Е.А.</VP>
    <ul>
      <li>
        <VP>ОГРНИП 313583702100013</VP>
      </li>
      <li>
        <VP>ИНН 583712953194</VP>
      </li>
    </ul>
    <VP></VP>
    <VDivider mt="var(--space)" mb="var(--space-half"></VDivider>
    <VP>© Культ Тела 2020. Все права защищены.</VP>
  </div>
</template>

<script>
import VDivider from '../components/ui/VDivider'

export default {
  components: { VDivider }
}
</script>

<style scoped>
p {
  color: var(--grey-light3) !important;
  text-align: justify !important;
  font-size: 18px;
  margin-bottom: var(--space-third);
}

.p-header {
  color: var(--white-base) !important;
}

a {
  color: var(--yellow-base);
}

ul {
  margin-top: var(--space-half);
}

ul > li {
  margin-left: var(--space-half);
  margin-bottom: var(--space-third);
}

ul > li > p {
  text-align: left !important;
}
</style>
