
import fileSystem from './fileSystem.vue';
function install(app) {
    app.component('fileSystem', fileSystem)
}
export { fileSystem }
export default {
    install
}
