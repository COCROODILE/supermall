<template>
  <div class="param-info" v-if="Object.keys(paramInfo).length !== 0">
    <table v-for="(table,index) in paramInfo.rule.tables" :key="index" class="info-size">
      <tr v-for="(tr,indey) in table" :key="indey">
        <td v-for="(td,indez) in tr" :key="indez">{{td}}</td>
      </tr>
    </table>
    <table class="info-param">
      <tr v-for="(info,index) in paramInfo.info.set" :key="index">
        <td class="info-params-key">{{info.key}}</td>
        <td class="param-value">{{info.value}}</td>
      </tr>
    </table>
    <div class="info-img" v-if="paramInfo.info.images">
      <img :src="paramInfo.info.images[0]" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name:'DetailParamInfo',
  props:{
    paramInfo:{
      type:Object,
      default(){
        return {}
      }
    }
  }
}
</script>

<style scoped>
  .param-info{
    padding: 20px 15px;
    font-size: 14px;
    border-bottom: 5px solid #f2f5f8;
  }
  .param-info table{
    width: 100%;
    border-collapse:collapse
  }
  .param-info table tr{
    height: 42px;
  }
  .param-info table tr td{
    border-bottom: 1px solid rgba(100,100,100,.1);
  }
  .info-param{
    border-top: 1px solid rgba(100,100,100,.1);
  }
  /* .info-params-key{
    width: 95%;
  } */
  
  .param-value{
    width: 80%;
    color: #eb4868;
  }
  .info-img img{
    width: 100%;
  }
</style>