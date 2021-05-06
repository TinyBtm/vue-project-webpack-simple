<template>
  <div class="flex-box">
    <ul
        @dragstart="fOnDragStart"
        @dragover="fOnDragOver"
        @dragend="fOnDragEnd"
        ref="parentNode">
      <li
          v-for="(item,index) in data"
          :key="index"
          class="item"
          draggable="true"
      >{{ item }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "comp-drag-list",
  data(){
    return {
      data: [1, 2, 3, 4, 5, 6],
      dDragging: null,//被拖拽的对象
      dTarget: null,//目标对象
    }
  },
  mounted(){
    //为了防止火狐浏览器拖拽的时候以新标签打开，此代码真实有效
    document.body.ondrop = function(e){
      e.preventDefault();
      e.stopPropagation();
    }
  },
  methods: {
    fOnDragStart(e){
      this.dDragging = e.target;
    },
    fOnDragOver(e){
      let nTargetTop,
          nDraggingTop,
          dTarget = e.target,
          dDragging = this.dDragging;
      nTargetTop = dTarget.getBoundingClientRect().top;
      nDraggingTop = dDragging.getBoundingClientRect().top;
      if(dTarget.nodeName === "LI" && dTarget !== dDragging){
        if(dTarget){
          if(dTarget.animated){
            return;
          }
        }

        if(this.fFindIndex(dDragging) < this.fFindIndex(dTarget)){
          dTarget.parentNode.insertBefore(dDragging, dTarget.nextSibling);
        }
        else{
          dTarget.parentNode.insertBefore(dDragging, dTarget);
        }
        this.fDoAnim(nTargetTop, dTarget);
        this.fDoAnim(nDraggingTop, dDragging);
      }
    },
    fDoAnim(nStartPos, dEl){
      let nOffset = nStartPos - dEl.getBoundingClientRect().top;
      dEl.style.transition = 'none';
      dEl.style.transform = `translateY(${nOffset}px)`;

      //触发重绘
      dEl.offsetWidth;
      dEl.style.transition = 'transform .3s';
      dEl.style.transform = '';
      //触发重绘
      // setTimeout(()=>{
      //     dom.style.transition="transform .3s";
      //     dom.style.transform='';
      // },0)
      clearTimeout(dEl.animated);

      dEl.animated = setTimeout(() => {
        dEl.style.transition = '';
        dEl.style.transform = '';
        dEl.animated = false;
      }, 300);
    },
    fOnDragEnd(){
      this.dDragging = null;
    },
    fFindIndex(el){
      let domData = Array.from(this.$refs.parentNode.childNodes);
      return domData.findIndex(i => i.innerText === el.innerText);
    }
  }
}
</script>

<style lang="scss" scoped>
ul {
  flex: 1;
  list-style: none;
  padding: 20px;
}

.item {
  cursor: pointer;
  //height: 24px;
  line-height: 24px;
  background-color: #9c9c9c;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  color: #fff;
  padding: 10px;
}
</style>