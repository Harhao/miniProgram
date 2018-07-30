<template>
  <li class="listItem">
    <div class="listTitle" @click="shrink">{{itemData.title}}<span class="arrow" :class="{'rotate':itemData.active}"></span></div>
     <transition name="show" @enter="enter" @leave="leave">
        <div :class="{'listContent': normal}" v-show="itemData.active" ref="listContent">
          <div class="contentData">{{itemData.contentData.description}}</div>
          <img :src="itemData.contentData.src"/>
          <img :src="itemData.contentData.src" v-if="itemData.contentData.src1"/>
        </div>
      </transition>
  </li>
</template>

<script>
export default {
  name: "ListItem",
  props: ["itemData"],
  data() {
    return {
      normal: true
    };
  },
  methods:{
    enter(e){
      e.style.height = e.scrollHeight+"px";
    },
    leave(e){
      e.style.height = 0;

    },
    show(target){
      target.style.height = target.scrollHeight+"px";
    },
    hide(target){
      target.style.height = 0;

    },
    shrink(){
      // let target = this.$refs.listContent;
      // console.log("target is",target);
      // let height = target.style.height;
      // if(height >0){
      //   target.style.height = 0+'px';
      // }else{
      //   this.show()
      // }
    }
  }
};
</script>
<style scoped>
.rotate {
  -webkit-transform: rotate(-135deg) !important;
}
li.listItem {
  width: 100%;
  height: auto;
  list-style-type: none;
  /* margin-bottom: 5%; */
}
.listTitle {
  width: 86%;
  margin: 0 auto;
  padding: 0 7% 0 7%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  line-height: 50px;
  font-size: 0.75rem;
  border-bottom: 1px solid #f4f4f4;
}
.listTitle .arrow {
  display: inline-block;
  width: 0.5rem;
  height: 0.5rem;
  margin-right: 0.3rem;
  border-top: none;
  border-left: none;
  border-right: 1px solid #b1aeb1;
  border-bottom: 1px solid #b1aeb1;
  -webkit-transform: rotate(45deg);
  transition: ease 0.2s;
}
.listContent {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 87%;
  height:auto;
  overflow: hidden;
  margin: 18px auto 0 auto;
  background: #f8f8f8;
  transition: all .2s ease-in-out;
  margin-bottom: 5%;
}
.listContent .contentData {
  border-radius: 4px;
  padding: 5%;
  font-size: 0.6rem;
  color: #5a5a5c;
  letter-spacing: 2px;
  line-height: 20px;
  word-wrap: break-word;
  word-break: break-all;
}
.listContent img {
  display: inline-block;
  width: 90%;
  padding-bottom: 10%;
}
</style>
