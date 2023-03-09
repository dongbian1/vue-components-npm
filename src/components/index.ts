import { App } from 'vue'
import DragTable from './DragTable/index.vue'

export { DragTable }

const component = [DragTable]

const CjxUI = {
  install(app: App) {
    component.forEach((item) => {
      app.component(item.name, item)
    })
  }
}

export default CjxUI
