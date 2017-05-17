<template>
  <div id="app">
    <vHeader :seller="seller"></vHeader>
    <div class="tab">
      <div class="tab_item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab_item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab_item">
        <router-link to="/sell">商家</router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import vHeader from '@/components/header/Header'
  const ERR_OK = 0
  export default {
    data () {
      return {
        seller: {}
      }
    },
    created () {
      this.$http.get('/api/seller').then((response) => {
        response = response.body
        if (response.errno === ERR_OK) {
          this.seller = response.data
          console.log(this.seller)
        }
      })
    },
    components: {vHeader}
  }
</script>

<style lang="stylus" rel="stylesheet|stylus">
  #app
    .tab
      display: flex
      height: 40px
      width: 100%
      line-height: 40px

  .tab_item
    flex: 1
    text-align: center

</style>
