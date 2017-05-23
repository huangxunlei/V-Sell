<template>
  <div class="goods">
    <div class="menu_wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item,key) in goods" class="menu_item" :class="{'current':currentIndex===key}"
            @click="selectMenu(key,$event)">
          <span class="text border-1px">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}</span>
        </li>
      </ul>
    </div>
    <div class="foods_wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="item in goods" class="food_list food_list_hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food_item  border-1px">
              <div class="icon">
                <img :src="food.icon" width="57px" height="57px"/>
              </div>
              <div class="content">
                <h1 class="name">{{food.name}}</h1>
                <p v-show="food.description" class="desc">{{food.description}}</p>
                <div class="extra">
                  <span>月售{{food.sellCount}}份</span>
                  <span class="good_ratings">好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span>￥{{food.price}}</span>
                  <span class="old_price" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  const ERR_OK = 0
  export default {
    props: {
      seller: Object
    },
    data () {
      return {
        goods: {},
        listHeight: [],
        scrollY: 0
      }
    },
    created () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
      this.$http.get('/api/goods').then((response) => {
        response = response.body
        if (response.errno === ERR_OK) {
          this.goods = response.data
          this.$nextTick(() => {
            this._initScroll()
            this._calculateHeight()
          })
        }
      })
    },
    computed: {
      currentIndex () {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i]
          let height2 = this.listHeight[i + 1]
          if (!height2 || this.scrollY >= height1 && this.scrollY < height2) {
            return i
          }
        }
        return 0
      }
    },
    methods: {
      selectMenu (index, evenst) {
        if (!event._constructed) {
          return
        }
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food_list_hook')
        let el = foodList[index]
        this.foodsScroll.scrollToElement(el, 300)
      },
      _initScroll () {
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        })
        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
          probeType: 3
        })
        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y))
        })
      },
      _calculateHeight () {
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food_list_hook')
        let height = 0
        this.listHeight.push(height)
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet|stylus">
  @import "../../commen/stylus/mixin.styl"
  .goods
    display flex
    position absolute
    width 100%
    top: 174px
    bottom 64px
    overflow hidden
    .menu_wrapper
      flex 0 0 80px
      width 80px
      background #f3f5f7
      .menu_item
        display table
        padding 0 12px
        width 56px
        height 54px
        line-height 14px
        &.current
          position relative
          margin-top -1px
          z-index 10
          background #fff
          font-weight 700
          .text
            border-none()
        .icon
          display inline-block
          width 12px
          height 12px
          vertical-align top
          margin-right 2px
          background-size 12px 12px
          background-repeat no-repeat
          &.decrease
            bg-image('decrease_3')
          &.discount
            bg-image('discount_3')
          &.guarantee
            bg-image('guarantee_3')
          &.invoice
            bg-image('invoice_3')
          &.special
            bg-image('special_3')
        .text
          display table-cell
          vertical-align middle
          font-size 12px
          font-weight 200
          border-1px(rgba(7, 17, 27, 0.1))
          width 56px
    .foods_wrapper
      flex 1
      .title
        padding-left 14px
        font-size 12px
        line-height 26px
        border-left 2px solid #d9dde1
        color rgb(147, 153, 159)
        background #f3f5f7
        height 26px
      .food_item
        display flex
        padding-bottom 18px
        border-1px(rgba(7, 17, 27, 0.1))
        margin 18px
        &:last-child
          border-none()
          margin-bottom 0px
        .icon
          flex 0 0 57px
          margin-right 10px
        .content
          flex 1
          .name
            margin 2px 0 8px 0
            height 14px
            font-size 14px
            color rgb(7, 17, 27)
            line-height 14px
          .desc
            font-size 10px
            color rgb(147, 153, 159)
            margin-bottom 8px
            line-height 14px
          .extra
            font-size 10px
            color rgb(147, 153, 159)
            line-height 10px
            .good_ratings
              margin-left 12px
          .price
            margin-top 8px
            font-size 10px
            font-weight normal
            color rgb(240, 20, 20)
            line-height 12px
            .old_price
              font-weight normal / 700
              line-height 12px
              margin-left 8px
              color rgb(147, 153, 159)
              text-decoration line-through
              font-size 10px


</style>
