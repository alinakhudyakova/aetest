<template>
  <div class="gallery">
    <div class="gallery__wrapper">
      <ImageTile v-for="(item, index) in images"
                 :key="index"
                 :img="item"
                 class="gallery__item" />
    </div>
    <button class="gallery__btn"
            @click="loadMoreImages">Load more</button>
  </div>
</template>

<script>
    import {mapState} from 'vuex';
    import ImageTile from '@/components/gallery/ImageTile';

    export default {
        components: {
            ImageTile
        },
        data() {
            return {
                progressActive: false
            };
        },
        computed: {
            ...mapState('GalleryStore', [
                'images'
            ])
        },
        methods: {
            loadMoreImages() {
              this.$store.commit('GalleryStore/incrementPage');
              this.getImages();
            },
            getImages() {
                this.progressActive = true;
                this.$store.dispatch('GalleryStore/getImages')
                    .finally(() => {
                        this.progressActive = false;
                    });
            }
        },
        mounted() {
            this.getImages();
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
</style>
