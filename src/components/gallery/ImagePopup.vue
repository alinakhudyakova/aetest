<template>
  <div class="image-popup"
       @click="closeModal">
    <button class="image-popup__close-btn">X</button>
    <div class="image-popup__content"
         @click.stop="">
      <button v-clipboard:copy="path"
              class="image-popup__clipboard"
              @click="handleCopySuccess">
        <span v-if="isCopied">Copied!</span>
        <span v-else>Copy link!</span>
      </button>
      <div :style="styles"
           class="image-popup__image">
        <p class="image-popup__image-info">{{ imageInfo }}</p>
        <button v-if="!hidePrev"
                class="image-popup__btn image-popup__btn--prev"
                @click="emitNavigation('prev')">Prev</button>
        <button v-if="!hideNext"
                class="image-popup__btn image-popup__btn--next"
                @click="emitNavigation('next')">Next</button>
      </div>
    </div>
  </div>
</template>

<script>
    import {mapMutations} from 'vuex';

    export default {
        props: {
            image: {
                type: Object,
                default: () => {
                    return {
                        full_picture: ''
                    };
                }
            },
            hidePrev: Boolean,
            hideNext: Boolean
        },
        data() {
            return {
                isCopied: false,
                isCopyLinkActive: false,
                timerId: false
            }
        },
        computed: {
            path() {
                return window.location.href;
            },
            styles() {
                return this.image.full_picture
                    ? {
                        backgroundImage: `url(${encodeURI(this.image.full_picture)})`
                    }
                    : undefined;
            },
            imageInfo() {
                return [this.image.author || '', this.image.camera || '', this.image.tags || ''].join(', ');
            }
        },
        methods: {
            ...mapMutations('ImagePopupStore', [
                'removeImage'
            ]),
            emitNavigation(type) {
                this.$emit('catchnavigation', type, this.image.id);
            },
            closeModal() {
                this.$router.push({name: this.$route.name, query: {}});
            },
            handleCopySuccess() {
                if (this.isCopied) {
                    this.isCopied = false;
                    this.isCopyLinkActive = false;
                    clearTimeout(this.timerId);
                } else {
                    this.isCopied = true;
                    this.isCopyLinkActive = true;
                    if (this.timerId) {
                        this.timerId = null;
                        clearTimeout(this.timerId);
                    }
                    if (!this.timerId) {
                        this.timerId = setTimeout(() => {
                            this.isCopied = false;
                        }, 500);
                    }
                }
            }
        },
        beforeDestroy() {
            this.removeImage();
        }
    };
</script>

<style scoped>
  .image-popup {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.45);
  }

  .image-popup__content {
    position: relative;
    display: block;
    background-color: #ffffff;
  }

  .image-popup__image {
    width: 500px;
    height: 300px;
    max-width: 95vw;
    max-height: 95vh;
    background-color: #ccc;
    background-size: 95%;
  }

  .image-popup__image-info {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    padding: 10px;
    font-size: 14px;
    color: #ffffff;
    background-color: rgba(10, 10, 10, 0.6);
  }

  .image-popup__btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px 32px;
    background-color: #4CAF50; /* Green */
    border: none;
    color: white;
    text-align: center;
    text-decoration: none;
    font-size: 16px;
  }

  .image-popup__btn--prev {
    left: 10px;
  }

  .image-popup__btn--next {
    right: 10px;
  }

  .image-popup__btn:hover,
  .image-popup__close-btn:hover {
    opacity: 0.85;
  }

  .image-popup__close-btn {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 10;
    display: block;
    width: 45px;
    height: 45px;
    font-size: 25px;
    font-weight: bold;
    border: none;
  }

  .image-popup__clipboard {
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    display: inline-block;
    height: 25px;
    padding: 0 10px;
    font-size: 12px;
    font-weight: bold;
    color: #ffffff;
    background-color: rgba(10, 10, 10, 0.85);
    border: none;
    opacity: 0.45;
  }

  .image-popup__copy-path-btn span {
    position: absolute;
    top: calc(100% + 10px);
    left: 50%;
    transform: translateX(-50%);
    font-size: 10px;
    font-weight: bold;
    text-shadow: 0 0 3px #000000;
    color: #ffffff;
    background-color: rgba(10, 10, 10, 0.85);
  }
</style>
