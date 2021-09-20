import api from '@/api';

export default {
    namespaced: true,
    state: {
        images: [],
        page: 1,
        totalPages: 0
    },
    actions: {
        getImages({commit, state}) {
            return new Promise((resolve, reject) => {
                api.getImages(state.page).then((data = {}) => {
                    commit('setImages', data.data.pictures);
                    resolve(data);
                }).catch((response) => {
                    reject(response);
                });
            });
        }
    },
    mutations: {
        setImages(state, data) {
            state.images = [
                ...state.images,
                ...data
            ];
        },
        incrementPage(state) {
            state.page += 1;
        }
    }
}
