<template>
  <div class="hello">
    <group v-for='(item,index) in msg' v-if="index < 10" :key='index' gutter='0'>
      <cell value-align='left'>{{ item.name }}</cell>
      <group v-for='(item,index) in item.artists'>
        <cell>{{ item.name}}</cell>
      </group>
      
    </Group>
    <group>
        <x-switch title="loading标题" v-model="show1" ></x-switch>
      </group>
    <loading :show="show1" text="text1"></loading>
  </div>  
</template>

<script>
  import { Actionsheet,Loading,Group ,XSwitch,Cell} from 'vux'

  import { mapState } from 'vuex'
export default {
  name: 'HelloWorld',
  data () {
    return {
      show1: true,
      msg: '',
      artist:''
    }
  },
  components:{
    Loading,Group,XSwitch,Cell
  },
  computed:{
    ...mapState([
        'isLoading'
      ])
  },
  mounted(){
    
  },
  created(){
    this.$http.get('/gp/api/playlist/detail?id=19723756', {}, {
          headers: {},
          emulateJSON: true
    }).then((res)=>{
      this.msg=res.data.result.tracks;
      this.artist=this.msg;
      return res
    }).then(()=>{
      this.show1=this.isLoading
    })      
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
