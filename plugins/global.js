import VH1 from '~/components/typography/VH1'
import VH2 from '~/components/typography/VH2'
import VH3 from '~/components/typography/VH3'
import VP from '~/components/typography/VP'
import VCaption from '~/components/typography/VCaption'
import VButton from '~/components/ui/VButton'
import VPageHeading from '~/components/ui/VPageHeading'

import Vue from 'vue'

Vue.component('VH1', VH1)
Vue.component('VH2', VH2)
Vue.component('VH3', VH3)
Vue.component('VP', VP)
Vue.component('VCaption', VCaption)

Vue.component('VButton', VButton)

Vue.component('VPageHeading', VPageHeading)

import ds from '@/services/Colors.js'

Vue.prototype.$ds = ds
