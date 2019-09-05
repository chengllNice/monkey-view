<template>
    <div :class="colClass" :style="colStyle">
        <slot></slot>
    </div>
</template>

<script>
  import {findBrothersComponents, findComponent} from "../../../utils/tool";

  const responseSize = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];
  export default {
    name: "ClCol",
    props: {
      span: [Number, String],
      order: [Number, String],
      offset: [Number, String],
      push: [Number, String],
      pull: [Number, String],
      xs: [Number, Object],
      sm: [Number, Object],
      md: [Number, Object],
      lg: [Number, Object],
      xl: [Number, Object],
      xxl: [Number, Object],
    },
    data() {
      const currentSpan = (!this.span && this.span !== 0 || parseFloat(this.span) < 0) ? -1 : Math.floor(this.span);

      return {
        componentName: 'ClCol',
        currentSpan: currentSpan,
        parentRow: findComponent(this, 'ClRow'),
        gutter: 0,
      }
    },
    computed: {
      colClass() {
        let classList = [
          'cl-col',
          {
            [`cl-col--span-${this.currentSpan}`]: this.currentSpan !== -1,
            [`cl-col--order-${this.order}`]: this.order,
            [`cl-col--offset-${this.offset}`]: this.offset,
            [`cl-col--push-${this.push}`]: this.push,
            [`cl-col--pull-${this.pull}`]: this.pull,
          }
        ];
        responseSize.forEach(size => {
          if (typeof this[size] === 'number') {
            classList.push(`cl-col--span-${size}-${this[size]}`);
          } else if (typeof this[size] === 'object') {
            let sizeObj = this[size];
            Object.keys(sizeObj).forEach(key => {
              classList.push(`cl-col--${key}-${size}-${sizeObj[key]}`)
            })
          }
        });
        return classList;
      },
      colStyle() {
        let style = {};
        if (this.gutter) {
          style = {
            paddingLeft: this.gutter / 2 + 'px',
            paddingRight: this.gutter / 2 + 'px',
          }
        }
        return style;
      }
    },
    components: {},
    created() {
    },
    mounted() {
      this.$nextTick(() => {
        // this.initCurrentSpan();
        this.updateGutter(this.parentRow && this.parentRow.gutter);
      })
    },
    methods: {
      initCurrentSpan() {
        let brothers = findBrothersComponents(this, 'ClCol');
        let allSpan = 0;//所有span之和
        let noSpanComponents = [];//没有设置span的元素（不包括设置为0的）
        let noSpanComponentsNum = 0;
        brothers.forEach(item => {
          if (item.currentSpan !== -1) allSpan += parseFloat(item.currentSpan);
          else noSpanComponents.push(item);
        });
        noSpanComponentsNum = noSpanComponents.length;

        // 还有剩余空间可分配
        let freeSpace = 24 - parseFloat(allSpan);//剩余空间量
        console.log(freeSpace, 'freeSpace')
        if (freeSpace >= 1) {
          let average = Math.floor(freeSpace / noSpanComponentsNum);
          let _average = Math.floor(freeSpace % noSpanComponentsNum);//求余数，把余数的剩余量全部给最后一个元素
          // 如果剩余空间按平均分配不足，则全局分配给第一个元素
          if (average < 1) {
            noSpanComponents[0].currentSpan = freeSpace;
          } else {
            noSpanComponents.forEach((item, index) => {
              if (index === noSpanComponentsNum - 1 && _average >= 1) {
                item.currentSpan = _average;
              } else {
                item.currentSpan = average;
              }
            })
          }
        }
      },
      updateGutter(value) {
        this.gutter = value;
      }
    },
    watch: {
      'parentRow.gutter': function (newVal) {
        this.updateGutter(newVal);
      }
    }
  }
</script>
