import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import CKEditor from '@ckeditor/ckeditor5-vue'

let app = createApp(App);

app.use(CKEditor)
app.use(router)
app.mount('#app')