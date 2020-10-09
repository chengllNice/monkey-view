<template>
    <div class="dev-collapse">
        <h4>基础--hide-arrow(隐藏箭头)--disabled</h4>
        <Collapse v-model="openedBase" @change="handleChange">
            <CollapseItem c-key="1-1" name="1-1">
                <p>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</p>
                <p>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</p>
            </CollapseItem>
            <CollapseItem c-key="1-2" name="1-2" hide-arrow>
                <p>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</p>
                <p>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</p>
            </CollapseItem>
            <CollapseItem c-key="1-3" name="1-3" disabled>
                <p>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</p>
                <p>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</p>
            </CollapseItem>
        </Collapse>

        <h4>基础--accordion(手风琴)</h4>
        <Collapse v-model="openedAccordion" @change="handleChange" accordion>
            <CollapseItem c-key="1-1" name="1-1">
                <p>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</p>
                <p>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</p>
            </CollapseItem>
            <CollapseItem c-key="1-2" name="1-2">
                <p>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</p>
                <p>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</p>
            </CollapseItem>
        </Collapse>

        <h4>基础--icon-position=right</h4>
        <Collapse v-model="openedIconPosition" @change="handleChange" icon-position="right">
            <CollapseItem c-key="1-1" name="1-1">
                <p>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</p>
                <p>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</p>
            </CollapseItem>
            <CollapseItem c-key="1-2" name="1-2">
                <p>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</p>
                <p>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</p>
            </CollapseItem>
        </Collapse>

        <h4>基础--icon-position=right,extra</h4>
        <Collapse v-model="openedExtra" @change="handleChange" icon-position="right">
            <CollapseItem c-key="1-1" name="1-1页面反馈页面反馈页面反馈页面反馈页面反馈页面反馈页面反馈页面反馈页面反馈">
                <Button type="text" slot="extra">extra</Button>
                <p>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</p>
                <p>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</p>
            </CollapseItem>
            <CollapseItem c-key="1-2" name="1-2控制反馈控制反馈控制反馈控制反馈控制反馈控制反馈控制反馈控制反馈控制反馈">
                <p>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</p>
                <p>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</p>
            </CollapseItem>
        </Collapse>

        <h4>基础--type=simple</h4>
        <Collapse v-model="openedSimple" @change="handleChange" type="simple">
            <CollapseItem c-key="1-1" name="1-1" disabled>
                <p>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</p>
                <p>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</p>
            </CollapseItem>
            <CollapseItem c-key="1-2" name="1-2">
                <p>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</p>
                <p>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</p>
            </CollapseItem>
        </Collapse>

        <h4>基础--嵌套</h4>
        <Collapse v-model="opened" @change="handleChange">
            <CollapseItem c-key="1-1" name="1-1">
                <p>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</p>
                <Collapse v-model="openedInner" @change="handleChange">
                    <CollapseItem c-key="1-2" name="1-2">
                        <p>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</p>
                        <p>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</p>
                    </CollapseItem>
                    <CollapseItem c-key="1-3" name="1-3">
                        <p>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</p>
                        <p>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</p>
                    </CollapseItem>
                </Collapse>
            </CollapseItem>
            <CollapseItem c-key="1-2" name="1-2" hide-arrow>
                <p>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</p>
                <p>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</p>
            </CollapseItem>
            <CollapseItem c-key="1-3" name="1-3" disabled>
                <p>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</p>
                <p>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</p>
            </CollapseItem>
        </Collapse>
    </div>
</template>

<script>
    export default {
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
        methods: {
            handleChange(key, keys) {
                console.log(key, keys, 'handleChange')
            }
        }
    }
</script>
