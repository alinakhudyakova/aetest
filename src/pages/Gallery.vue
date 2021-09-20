<template>
  <div class="gallery">
    <ImagePopup v-if="image"
                :image="image"
                :hide-prev="hidePrev"
                :hide-next="hideNext"
                @catchnavigation="catchNavigation" />
    <div class="gallery__wrapper">
      <ImageTile v-for="(item, index) in images"
                 :key="index"
                 :image="item"
                 class="gallery__item" />
    </div>
    <div :class="{'gallery__active-loader': progressActive}"></div>
    <button v-if="showLoadBtn"
            class="gallery__btn"
            @click="loadMoreImages">Load more</button>
  </div>
</template>

<script>
    import {mapState} from 'vuex';
    import ImageTile from '@/components/gallery/ImageTile';
    import ImagePopup from '@/components/gallery/ImagePopup';

    export default {
        components: {
            ImagePopup,
            ImageTile
        },
        data() {
            return {
                progressActive: false
            };
        },
        computed: {
            ...mapState('GalleryStore', [
                'images',
                'page',
                'totalPages'
            ]),
            ...mapState('ImagePopupStore', [
                'image'
            ]),
            routeImageId() {
                return this.$route.query.image;
            },
            hidePrev() {
                return this.images.length ? this.routeImageId == this.images[0].id : true;
            },
            hideNext() {
                const isLastImage = this.images.length ? this.routeImageId == this.images[this.images.length - 1].id : true;

                return !this.showLoadBtn && isLastImage;
            },
            showLoadBtn() {
                return this.page < this.totalPages;
            }
        },
        watch: {
            routeImageId(newVal, oldVal) {
                if (newVal && !oldVal) {
                    this.$store.dispatch('ImagePopupStore/getImage', newVal);
                } else if (newVal && oldVal && newVal != oldVal) {
                    this.$store.commit('ImagePopupStore/removeImage');
                    this.$store.dispatch('ImagePopupStore/getImage', newVal);
                } else if (!newVal && oldVal) {
                    this.$store.commit('ImagePopupStore/removeImage');
                }
            }
        },
        methods: {
            loadMoreImages() {
              this.$store.commit('GalleryStore/incrementPage');
              this.getImages();
            },
            getImages(successCallback) {
                this.progressActive = true;
                this.$store.dispatch('GalleryStore/getImages')
                    .finally(() => {
                        this.progressActive = false;
                        if (successCallback) successCallback();
                    });
            },
            findIndexByID(id) {
                return this.images.findIndex(image => image.id == id);
            },
            catchNavigation(type, imageId) {
                console.log('asdasd');
                const currentIndex = this.findIndexByID(imageId);
                if (type === 'prev') {
                    const id = this.images[currentIndex - 1].id;

                    this.$router.push({name: this.$route.name, query: {image: id}});
                } else if (type === 'next') {
                    const id = this.images[currentIndex + 1].id;

                    if (currentIndex == this.images.length - 1) {
                        this.getImages(() => {
                            this.$router.push({name: this.$route.name, query: {image: id}});
                        });
                    } else {
                        this.$router.push({name: this.$route.name, query: {image: id}});
                    }
                }
            }
        },
        mounted() {
            this.getImages(() => {
                if (this.$route.query.image) {
                    this.$store.dispatch('ImagePopupStore/getImage', this.$route.query.image);
                }
            });
        }
    }
</script>

<style scoped>

  .gallery__wrapper {
    display: flex;
    flex-wrap: wrap;
    margin: 0 auto;
  }

  .gallery__item {
    display: block;
    width: 300px;
    height: 200px;
    margin: 10px;
  }

  .gallery__btn {
    display: block;
    margin: 20px auto;
    padding: 15px 32px;
    background-color: #4CAF50; /* Green */
    border: none;
    color: white;
    text-align: center;
    text-decoration: none;
    font-size: 16px;
  }

  .gallery__active-loader {
    margin: 20px auto;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 10px solid transparent;
    border-top: 10px solid #4CAF50;
    border-bottom: 10px solid #4CAF50;
    animation: rotate 1.8s linear infinite;
  }
</style>
