<template>
    <div class="CollapseView">
        <h4>基础--hide-arrow(隐藏箭头)--disabled</h4>
        <ClCollapse v-model="openedBase" @change="handlerChange">
            <ClCollapseItem c-key="1-1" name="1-1">
                <p>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</p>
                <p>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</p>
            </ClCollapseItem>
            <ClCollapseItem c-key="1-2" name="1-2" hide-arrow>
                <p>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</p>
                <p>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</p>
            </ClCollapseItem>
            <ClCollapseItem c-key="1-3" name="1-3" disabled>
                <p>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</p>
                <p>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</p>
            </ClCollapseItem>
        </ClCollapse>

        <h4>基础--accordion(手风琴)</h4>
        <ClCollapse v-model="openedAccordion" @change="handlerChange" accordion>
            <ClCollapseItem c-key="1-1" name="1-1">
                <p>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</p>
                <p>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</p>
            </ClCollapseItem>
            <ClCollapseItem c-key="1-2" name="1-2">
                <p>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</p>
                <p>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</p>
            </ClCollapseItem>
        </ClCollapse>

        <h4>基础--icon-position=right</h4>
        <ClCollapse v-model="openedIconPosition" @change="handlerChange" icon-position="right">
            <ClCollapseItem c-key="1-1" name="1-1">
                <p>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</p>
                <p>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</p>
            </ClCollapseItem>
            <ClCollapseItem c-key="1-2" name="1-2">
                <p>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</p>
                <p>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</p>
            </ClCollapseItem>
        </ClCollapse>

        <h4>基础--icon-position=right,extra</h4>
        <ClCollapse v-model="openedExtra" @change="handlerChange" icon-position="right">
            <ClCollapseItem c-key="1-1" name="1-1页面反馈页面反馈页面反馈页面反馈页面反馈页面反馈页面反馈页面反馈页面反馈">
                <ClButton type="text" slot="extra">extra</ClButton>
                <p>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</p>
                <p>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</p>
            </ClCollapseItem>
            <ClCollapseItem c-key="1-2" name="1-2控制反馈控制反馈控制反馈控制反馈控制反馈控制反馈控制反馈控制反馈控制反馈">
                <p>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</p>
                <p>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</p>
            </ClCollapseItem>
        </ClCollapse>

        <h4>基础--type=simple</h4>
        <ClCollapse v-model="openedSimple" @change="handlerChange" type="simple">
            <ClCollapseItem c-key="1-1" name="1-1">
                <p>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</p>
                <p>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</p>
            </ClCollapseItem>
            <ClCollapseItem c-key="1-2" name="1-2">
                <p>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</p>
                <p>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</p>
            </ClCollapseItem>
        </ClCollapse>


        <h4>基础--嵌套</h4>
        <ClCollapse v-model="opened" @change="handlerChange">
            <ClCollapseItem c-key="1-1" name="1-1">
                <p>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</p>
                <ClCollapse v-model="openedInner" @change="handlerChange">
                    <ClCollapseItem c-key="1-2" name="1-2">
                        <p>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</p>
                        <p>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</p>
                    </ClCollapseItem>
                    <ClCollapseItem c-key="1-3" name="1-3">
                        <p>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</p>
                        <p>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</p>
                    </ClCollapseItem>
                </ClCollapse>
            </ClCollapseItem>
            <ClCollapseItem c-key="1-2" name="1-2" hide-arrow>
                <p>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</p>
                <p>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</p>
            </ClCollapseItem>
            <ClCollapseItem c-key="1-3" name="1-3" disabled>
                <p>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</p>
                <p>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</p>
            </ClCollapseItem>
        </ClCollapse>


        <div class="viewDes">
            <h3>API</h3>
            <h4>collapse props</h4>

            <div class="propItem">
                <p><b>属性：value</b></p>
                <p><b>类型：String, Array</b></p>
                <p><b>说明：</b>accordion手风琴模式时值为String类型，否则值为Array类型，可以v-model双向绑定</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="propItem">
                <p><b>属性：accordion</b></p>
                <p><b>类型：Boolean</b></p>
                <p><b>说明：</b>开启手风琴模式</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="propItem">
                <p><b>属性：type</b></p>
                <p><b>类型：String</b></p>
                <p><b>说明：</b>可选值simple/default或者不设置，simple时为极简模式</p>
                <p><b>默认值：</b>default</p>
            </div>
            <div class="propItem">
                <p><b>属性：iconPosition</b></p>
                <p><b>类型：String</b></p>
                <p><b>说明：</b>设置下拉icon图标显示的位置，可选值left/right或者不设置</p>
                <p><b>默认值：</b>left</p>
            </div>
        </div>

        <div class="viewDes">
            <h3>API</h3>
            <h4>collapse event</h4>

            <div class="propItem">
                <p><b>事件名：change</b></p>
                <p><b>说明：</b>value变化时触发，返回值第一个为当前变化项的key,第二个为当前所有展开项的key数组</p>
                <p><b>返回值：</b>key, openedKeys</p>
            </div>
        </div>

        <div class="viewDes">
            <h3>API</h3>
            <h4>collapseItem props</h4>


            <div class="propItem">
                <p><b>属性：cKey</b></p>
                <p><b>类型：String</b></p>
                <p><b>说明：</b>必选，唯一标识</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="propItem">
                <p><b>属性：name</b></p>
                <p><b>类型：String</b></p>
                <p><b>说明：</b>title的名字</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="propItem">
                <p><b>属性：disabled</b></p>
                <p><b>类型：Boolean</b></p>
                <p><b>说明：</b>禁用</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="propItem">
                <p><b>属性：hideArrow</b></p>
                <p><b>类型：Boolean</b></p>
                <p><b>说明：</b>隐藏下拉icon图标</p>
                <p><b>默认值：</b>-</p>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: "CollapseView",
    data() {
      return {
        openedBase: [],
        openedAccordion: '',
        openedIconPosition: [],
        openedExtra: [],
        openedSimple: [],
        opened: [],
        openedInner: []
      }
    },
    computed: {},
    components: {},
    created() {
    },
    mounted() {
    },
    methods: {
      handlerChange(key, keys){
        console.log(key,keys,'handlerChange')
      }
    }
  }
</script>

<style scoped>

</style>
