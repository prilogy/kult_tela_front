<template>
  <div class="readme">
    <VPageHeading button>Белки</VPageHeading>
    <div>
      <VP>
        Белки являются главной составной частью всех органов и тканей организма,
        с ними тесно связаны все жизненные процессы: обмен веществ,
        сократимость, раздражимость, способность к росту, размножению и
        мышлению. Основное назначение белков пищи – участие в построении новых
        клеток и тканей, обеспечение роста и развития молодых растущих
        организмов и регенерация изношенных, отживших клеток в зрелом возрасте.
        Из белков пищи постоянно синтезируются белки организма, ферменты,
        гормоны, антитела. Белки участвуют в транспорте кровью кислорода,
        липидов, углеводов, некоторых витаминов, гормонов. Организм человека не
        имеет резервов белка. Он поступает с пищей и относится к незаменимым
        компонентам рациона. Белки содержатся в мясе животных и птицы, рыбе,
        яйцах, молоке и молочных продуктах, семенах растений – орехах, фасоли,
        горохе, зерне и его производных – крупах и муке.
      </VP>
      <VTipSmall>
        <VP color="var(--grey-light3)">
          Поскольку человек принадлежит к животному миру, белки животного
          происхождения – т.е. полученные из яиц, молока, рыбы и птицы –
          усваиваются им лучше, чем растительные.
        </VP>
      </VTipSmall>
      <img alt="Белки" src="/images/tips/proteins1.png" />
      <img alt="Белки2" src="/images/tips/proteins2.png" />
    </div>
  </div>
</template>
<script>
import VTipSmall from '../../../../components/ui/VTipSmall'
export default {
  middleware: 'requireSub',
  components: { VTipSmall }
}
</script>
