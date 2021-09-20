import fetcher from '@/api/fetcher';

export default {
    getImages(page = 1, limit = 20) {
        return new Promise((resolve, reject) => {
            const params = {
                page,
                limit
            };

            fetcher.get('/images', params).then((response) => {
                resolve(response);
            }).catch((error) => {
                reject(error);
            });
        });
    },
    getImageById(id) {
        return new Promise((resolve, reject) => {
            fetcher.get(`/images/${id}`).then((response) => {
                resolve(response);
            }).catch((error) => {
                reject(error);
            });
        });
    },
}
