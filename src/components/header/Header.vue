<template>
  <div class="header">
    <div class="content_wrapper">
      <div class="avatar">
        <img height="64" width="64" v-bind:src="seller.avatar"/>
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="supports">
          <span class="icon"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
    </div>

    <div class="bulletin_wrapper"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    props: {
      seller: {
        type: Object
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet|stylus">
  .header
    color #fff
    background #000
    .content_wrapper
      padding 24px 12px 18px 24px
      font-size 0px
      .avatar
        display inline-block
      .content
        display inline-block
        font-size 14px
        margin-left 16px

</style>
