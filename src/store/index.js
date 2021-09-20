import Vue from 'vue';
import Vuex from 'vuex';
// MODULES
import GalleryStore from '@/store/modules/GalleryStore';
import ImagePopupStore from '@/store/modules/ImagePopupStore';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {},
    actions: {},
    mutations: {},
    modules: {
        GalleryStore,
        ImagePopupStore
    }
});
