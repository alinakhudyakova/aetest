<template>
  <router-link :to="link"
               :style="styles"
               class="image-tile"></router-link>
</template>

<script>
    export default {
        props: {
            image: {
                type: Object,
                default: () => {
                    return {
                        id: '',
                        cropped_picture: ''
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
                const imgId = this.image.id;

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
                const imgUrl = this.image.cropped_picture;

                return imgUrl
                    ? {
                        backgroundImage: `url(${encodeURI(imgUrl)})`
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
