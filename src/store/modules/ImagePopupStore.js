import api from '@/api';

export default {
    namespaced: true,
    state: {
        image: ''
    },
    actions: {
        getImage({commit}, id) {
            console.log('sadfs');
            return new Promise((resolve, reject) => {
                api.getImageById(id).then((data = {}) => {
                    console.log('sadfs');
                    commit('setImage', data.data);
                    resolve(data);
                }).catch((response) => {
                    reject(response);
                });
            });
        }
    },
    mutations: {
        setImage(state, data) {
            state.image = data;
        },
        removeImage(state) {
            state.image = '';
        }
    }
}
