<template>
  <router-link :to="link"
               :style="styles"
               class="image-tile"></router-link>
</template>

<script>
    export default {
        props: {
            img: {
                type: Object,
                default: () => {
                    return {
                        id: ''
                    }
                }
            }
        },
        data() {
            return {
                loaded: false
            }
        },
        computed: {
            link() {
                const imgId = this.img.id;

                return imgId
                    ? {
                        name: this.$route.name,
                        query: {
                            image: imgId
                        }
                    }
                    : {};
            },
            styles() {
                return this.img.cropped_picture
                    ? {
                        backgroundImage: `url(${encodeURI(this.img.cropped_picture)})`
                    }
                    : {};
            }
        }
    }
</script>

<style scoped>
  .image-tile {
    background-position: 50% 50%;
    background-size: cover;
    background-repeat: no-repeat;
    animation: none;
  }
</style>
