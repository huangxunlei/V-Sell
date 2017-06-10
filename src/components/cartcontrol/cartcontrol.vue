<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart_decrease" @click="decreaseCart"
           v-show="food.count>0">
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>
    <div class="cart_count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart_add icon-add_circle" @click="addCart"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue'
  export default {
    props: {
      food: {
        type: Object
      }
    },
    created () {
      //  console.log(this.food)
    },
    methods: {
      addCart (event) {
        if (!event._constructed) {
          return
        }
        //  console.log('click')
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1)
        } else {
          this.food.count++
        }
      },
      decreaseCart (event) {
        if (!event._constructed) {
          return
        }
        if (this.food.count) {
          this.food.count--
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet|stylus">
  .cartcontrol
    font-size 0px
    .cart_decrease
      display inline-block
      padding 6px
      transition all 0.4s linear
      .inner
        padding-top 6px
        line-height 24px
        text-align center
        font-size 24px
        color rgb(0, 160, 220)
      &.move-transition
        opacity 1
        transform translate3D(0, 0, 0)
        .inner
          transition all 0.4s linear
          transform rotate(0)
      &.move-enter, &.move-leave
        opacity 0
        transform translate3D(24px, 0, 0)
        .inner
          transform rotate(180deg)
    .cart_count
      display inline-block
      vertical-align top
      width 12px
      padding-top 6px
      line-height 24px
      text-align center
      font-size 10px
      color rgb(147, 153, 159)
    .cart_add
      display inline-block
      padding 6px
      font-size 24px
      line-height 24px
      color rgb(0, 160, 220)
</style>
