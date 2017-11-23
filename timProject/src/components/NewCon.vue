<template>
 <div>
    <group>
    <div>
      <cell title="title" value="value" is-link link='/HelloWorld/99' primary="title" arrow-direction='down' disabled>
		
      </cell>
      <cell primary="title" title="1111" is-loading :border-intent='false'>11111</cell>
	  <cell primary="content" title="222" >22222</cell>
      <cell :title="name" value="value" is-link></cell>
      <router-link to="/HelloWorld/213">>>进入HelloWorld{{$route.params.id}}</router-link><br/>
      <router-link to="/HellFromVux">>>进入HellFromVux</router-link> 



    <div class="ActionsheetPage" v-if="isShow">
	   <div>
	    <cell :left-options="{showBack: true}" title="===========================Actionsheet"></cell>
	    <group title="点击遮罩层区域自动关闭">
	       <cell title="遮罩层使用" is-link @click.native="OpenSheet1"></cell>
	    </group>
	    <group title="禁用遮罩层区域自动关闭">
	       <cell title="禁用遮罩层使用" is-link @click.native="OpenSheet2"></cell>
	    </group>
	    <actionsheet theme='ios' v-model="sheetShow1" :menus="sheetMenus1" @on-click-menu="SheetClick"
	                   :close-on-clicking-mask.stopPragation="!isClickMask"  show-cancel>
	    </actionsheet>
	    <confirm  title='我是弹框title' v-model="showConfirm" :class="centerAlign?'text-algin-center':''" confirm-text="开启" cancel-text="取消">
	        {{confirmText}}
	    </confirm>
		<group title="==============================alert+loading">
	      <x-switch title="点击显示" @click.native="showPlugin"></x-switch>
	      <x-switch title="3s自动消失" @click.native="showPluginAuto" ></x-switch>
	    </group>
	    <group>
	      <x-switch title="loading标题" v-model="show1" @on-change="show1change"></x-switch>
	    </group>
		<div>
			<alert v-model="show" :content="alertContent" @on-show='onAlertShow' :title='alertTtile'></alert>
			<loading transition='vux-mask' :show="show1" :text="text1"></loading>
	        <loading :show="show1" :text="text1"></loading>
		    <div style="padding: 15px;">
		      <x-button @click.native="showLoading" type="primary">Show Me Now</x-button>
		    </div>
		</div>
		<group title="==============================popup">
			<x-switch title="Default popup" v-model="show11"></x-switch>
	    </group>
	    <div>
			<popup v-model='show11' @on-hide="log('hide')" @on-show="log('show')" position='bottom' height='100%' > 
				<div class="popup0">
					<group>
						<x-switch title="Another Switch"  v-model="show11"></x-switch>
						<x-switch title="Show Toast"  v-model="showToast"></x-switch>
					</group>
				</div>
			</popup>
	    </div>
	    <toast v-model="showToast">You did it!</toast>

	    <div>
	    	<group title="==============================toast">
				<x-button @click.native="showPosition('top')" type="primary">bottom</x-button>
			</group>
	    </div>
	    <toast v-model="showPositionValue" type="text" :time="800" is-show-mask text="Hello World" :position="positionData" @on-show="log('show')">Basic Usage</toast>

	    <divider>我是有底线的</divider>
 
	    <grid :cols='6' >
			<grid-item label='grid' v-for='(i,index) in 7' :key='index'>
				<img slot='icon' src='../assets/logo.png'>
			</grid-item>
	    </grid>
		<div style="">
		    <blur :blur-amount=40 :url='url'>
		    	<p class="center"><img :src='url' /></p>
		    </blur>
		    <flexbox :guter='0'>
		    	<flexbox-item v-for='(imgSrc,index) in  imagesData' :key='index'><img :src='imgSrc' style='width: 100%' @click='url=imgSrc' /></flexbox-item>
		    </flexbox>
	    </div>

		<div class="vux-1px-t">
			<swipeout>
				<swipeoutItem @on-close="handleEvents('on-close')" @on-open="handleEvents('on-open')" transition-mode="follow">
					<div slot="right-menu">
						<swipeout-button @click.native="onButtonClick('fav')" type='primary'>favBtn</swipeout-button>
						<swipeout-button @click.native="onButtonClick('delete')" type='warn'>deleteBtn</swipeout-button>
					</div>
					<div slot="content" class="demo-content vux-1px-t">
			        JavaScript is the best language
			        </div>
					
				</swipeoutItem>
				
			</swipeout>
		</div>

	    </div>
	  </div>
    </div>
      <a class='weui_btn weui_btn_primary' @click="golist" >点击触发push跳转路由</a>
    </group>
    <router-view></router-view>
  </div>

</template>
<script>
	import { Group, Cell , Actionsheet ,Alert,Confirm,AlertModule ,XSwitch,XButton ,Loading ,Popup,Toast,Divider,Grid, GridItem ,Flexbox, FlexboxItem, Blur,GroupTitle, Swipeout, SwipeoutItem, SwipeoutButton } from 'vux'
	import { mapState } from 'vuex'
	export default {
	  name: 'app',
	  data (){
	  	return{
	  		name:'this is tim',
	  		sheetShow1: false,
	        isShow: false,
	        isClickMask: true,
	        showConfirm: false,
	        sheetMenus1: {
	          menu1: '拍摄',
	          menu2: '从手机相册选择',
	          menu3:'tesss'
	        },
	        confirmText: "",
	        centerAlign: false,
	        alertTtile:'alert标题',
	        alertContent:'alert内容,',
	        show:false,
	        show1: false,
     		text1: 'Processing',
     		showToast:false,
     		show11:false,
     		positionData:'default',
     		showPositionValue:false,
     		imagesData: [
		        'https://o3e85j0cv.qnssl.com/tulips-1083572__340.jpg',
		        'https://o3e85j0cv.qnssl.com/waterway-107810__340.jpg',
		        'https://o3e85j0cv.qnssl.com/hot-chocolate-1068703__340.jpg'
		    ],
		    url: 'https://o3e85j0cv.qnssl.com/tulips-1083572__340.jpg'
	  	}
	  },
	  components:{
	  	Group,Cell,Actionsheet,Alert,Confirm  ,XSwitch,XButton,Loading,Popup ,Toast,Divider,Grid, GridItem ,Flexbox, FlexboxItem, Blur,GroupTitle, Swipeout, SwipeoutItem, SwipeoutButton
	  },
	  computed:{
	  	...mapState([
		  	'isLoading'
		  ])
	  },
	  methods:{
		getStatus (urlStr) {
		      var urlStrArr = urlStr.split('/')
		      return urlStrArr[urlStrArr.length - 1]
		},
		golist () {//方法，定义路由跳转，注意这里必须使用this，不然报错
		  this.$router.push({path:"/HelloWorld/99"});
		},
		OpenSheet1() {
			console.log('点击了1')
		this.sheetShow1 = true;
		},
		OpenSheet2() {
			console.log('点击了2')
		this.isClickMask = false;
		this.sheetShow1 = true;
		},
		SheetClick (key) {
		switch (key) {
		  case 'menu1':
		  	console.log('点击了遮罩层中的拍摄')
		    this.centerAlign = true;
		    this.confirmText = "需要开启摄像头权限，确认开启么？"
		    this.showConfirm = true;
		    break;
		  case 'menu2':
		  	console.log('点击了遮罩层中的从相册中')
		    this.centerAlign = true;
		    this.confirmText = "需要开启读取手机相册权限，确认开启么？"
		    this.showConfirm = true;
		    break;
		}
		},
		onAlertShow(){
				console.log('lkslsjjkfhla')
			},
		showPlugin(){
			this.$vux.alert.show({
				title: 'Tim is Cool',
			content: 'Do you agree?',
				onAlertShow(){
					console.log('lkslsjjkfhla')
				}
			})
		},
		showPluginAuto(){

		},
		showLoading () {
		  this.$vux.loading.show({
		    text: 'Loading'
		  })
		  setTimeout(() => {
		    this.$vux.loading.hide()
		  }, 2000)
		},
		show1change (val) {
		  if (val) {
		    tick(0, (percent) => {
		      if (percent === 100+1) {
		        this.show1 = false
		        return
		      }
		      this.text1 = `${percent}%`
		    })
		  }
		},
		log (str) {
	      console.log(str)
	    },
	    showPosition(str){
	    	this.positionData = str
      		this.showPositionValue = true
	    },
	    onButtonClick(str){
	    	console.log(str)
	    },
	    handleEvents (type) {
	      console.log('event: ', type)
	    }   
	  },
	  created(){
	    console.log('您当前刷新了页面，所在页面是:'+this.getStatus(this.$route.path))
	    console.log(this.$route.params)
	    this.isShow = true;
	    this.show1=this.isLoading //页面一加载就进去loading
	  },
	  watch: {
	    '$route' (to, from) {
	    //刷新参数放到这里里面去触发就可以刷新相同界面了
	      this.getStatus(this.$route.path)
	     
	      console.log('您当前所在页面是:'+this.getStatus(this.$route.path))
	    }
	  }
// 	  ,
// 	beforeRouteEnter (to, from, next) {
// 	    console.log('component beforeRouteEnter');
// 	    next();
// 	},
// 	beforeRouteUpdate (to, from, next) {
// 	    console.log('component beforeRouteUpdate');
// 	    next();
// 	},
// 	beforeRouteLeave(to,from,next){
// 	    console.log('component beforeRouteLeave');
// 	    next();
// }
	}
	function tick (i, cb) {
	  setTimeout(function () {
	    i++
	    cb(i)
	    if (i < 100+1) {
	      tick(i, cb)
	    }
	  }, 10)
	}

</script>

<style  scoped=''>
@import '~vux/src/styles/1px.less';
@import '../assets/scss.less';

</style