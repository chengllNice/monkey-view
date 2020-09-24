<template>
    <div class="TabsView">
<!--        <Tabs>-->
<!--            <TabPane label="one" c-key="1">111</TabPane>-->
<!--            <TabPane label="two" c-key="2">222</TabPane>-->
<!--        </Tabs>-->

        <h4>尺寸</h4>
        <Tabs size="mini">
            <TabPane label="one" c-key="1" disabled>
                <div slot="label">标签一</div>
                label111-content
            </TabPane>
            <TabPane label="two" c-key="2">
                <div slot="label"><span>标签二</span></div>
                label222-content
            </TabPane>
            <TabPane label="标签三" c-key="3">
                label333-content
            </TabPane>
            <TabPane label="标签四" c-key="4" disabled>
                label444-content
            </TabPane>
            <TabPane label="标签五" c-key="5">
                label555-content
            </TabPane>
        </Tabs>

        <Tabs size="small">
            <TabPane label="one" c-key="1" disabled>
                <div slot="label">标签一</div>
                label111-content
            </TabPane>
            <TabPane label="two" c-key="2">
                <div slot="label"><span>标签二</span></div>
                label222-content
            </TabPane>
            <TabPane label="标签三" c-key="3">
                label333-content
            </TabPane>
            <TabPane label="标签四" c-key="4" disabled>
                label444-content
            </TabPane>
            <TabPane label="标签五" c-key="5">
                label555-content
            </TabPane>
        </Tabs>

        <Tabs>
            <TabPane label="one" c-key="1" disabled>
                <div slot="label">标签一</div>
                label111-content
            </TabPane>
            <TabPane label="two" c-key="2">
                <div slot="label"><span>标签二</span></div>
                label222-content
            </TabPane>
            <TabPane label="标签三" c-key="3">
                label333-content
            </TabPane>
            <TabPane label="标签四" c-key="4" disabled>
                label444-content
            </TabPane>
            <TabPane label="标签五" c-key="5">
                label555-content
            </TabPane>
        </Tabs>

        <Tabs size="large">
            <TabPane label="one" c-key="1" disabled>
                <div slot="label">标签一</div>
                label111-content
            </TabPane>
            <TabPane label="two" c-key="2">
                <div slot="label"><span>标签二</span></div>
                label222-content
            </TabPane>
            <TabPane label="标签三" c-key="3">
                label333-content
            </TabPane>
            <TabPane label="标签四" c-key="4" disabled>
                label444-content
            </TabPane>
            <TabPane label="标签五" c-key="5">
                label555-content
            </TabPane>
        </Tabs>


        <h4>card</h4>
        <Tabs size="mini" type="card">
            <TabPane label="one" c-key="1" disabled>
                <div slot="label">标签一</div>
                label111-content
            </TabPane>
            <TabPane label="two" c-key="2">
                <div slot="label"><span>标签二</span></div>
                label222-content
            </TabPane>
            <TabPane label="标签三" c-key="3">
                label333-content
            </TabPane>
            <TabPane label="标签四" c-key="4" disabled>
                label444-content
            </TabPane>
            <TabPane label="标签五" c-key="5">
                label555-content
            </TabPane>
        </Tabs>

        <Tabs size="small" type="card">
            <TabPane label="one" c-key="1" disabled>
                <div slot="label">标签一</div>
                label111-content
            </TabPane>
            <TabPane label="two" c-key="2">
                <div slot="label"><span>标签二</span></div>
                label222-content
            </TabPane>
            <TabPane label="标签三" c-key="3">
                label333-content
            </TabPane>
            <TabPane label="标签四" c-key="4" disabled>
                label444-content
            </TabPane>
            <TabPane label="标签五" c-key="5">
                label555-content
            </TabPane>
        </Tabs>

        <Tabs type="card">
            <TabPane label="one" c-key="1" disabled>
                <div slot="label">标签一</div>
                label111-content
            </TabPane>
            <TabPane label="two" c-key="2">
                <div slot="label"><span>标签二</span></div>
                label222-content
            </TabPane>
            <TabPane label="标签三" c-key="3">
                label333-content
            </TabPane>
            <TabPane label="标签四" c-key="4" disabled>
                label444-content
            </TabPane>
            <TabPane label="标签五" c-key="5">
                label555-content
            </TabPane>
        </Tabs>

        <Tabs size="large" type="card">
            <TabPane label="one" c-key="1" disabled>
                <div slot="label">标签一</div>
                label111-content
            </TabPane>
            <TabPane label="two" c-key="2">
                <div slot="label"><span>标签二</span></div>
                label222-content
            </TabPane>
            <TabPane label="标签三" c-key="3">
                label333-content
            </TabPane>
            <TabPane label="标签四" c-key="4" disabled>
                label444-content
            </TabPane>
            <TabPane label="标签五" c-key="5">
                label555-content
            </TabPane>
        </Tabs>


        <h4>extra and align</h4>
        <Tabs size="large" type="card" align="left">
            <div slot="extra">extra</div>
            <TabPane label="one" c-key="1" disabled>
                <div slot="label">标签一</div>
                label111-content
            </TabPane>
            <TabPane label="two" c-key="2">
                <div slot="label"><span>标签二</span></div>
                label222-content
            </TabPane>
            <TabPane label="标签三" c-key="3">
                label333-content
            </TabPane>
            <TabPane label="标签四" c-key="4" disabled>
                label444-content
            </TabPane>
            <TabPane label="标签五" c-key="5">
                label555-content
            </TabPane>
        </Tabs>
        <Tabs size="large" type="card" align="center">
            <div slot="extra">extra</div>
            <TabPane label="one" c-key="1" disabled>
                <div slot="label">标签一</div>
                label111-content
            </TabPane>
            <TabPane label="two" c-key="2">
                <div slot="label"><span>标签二</span></div>
                label222-content
            </TabPane>
            <TabPane label="标签三" c-key="3">
                label333-content
            </TabPane>
            <TabPane label="标签四" c-key="4" disabled>
                label444-content
            </TabPane>
            <TabPane label="标签五" c-key="5">
                label555-content
            </TabPane>
        </Tabs>
        <Tabs size="large" type="card" align="right">
            <div slot="extra">extra</div>
            <TabPane label="one" c-key="1" disabled>
                <div slot="label">标签一</div>
                label111-content
            </TabPane>
            <TabPane label="two" c-key="2">
                <div slot="label"><span>标签二</span></div>
                label222-content
            </TabPane>
            <TabPane label="标签三" c-key="3">
                label333-content
            </TabPane>
            <TabPane label="标签四" c-key="4" disabled>
                label444-content
            </TabPane>
            <TabPane label="标签五" c-key="5">
                label555-content
            </TabPane>
        </Tabs>

        <h4>border</h4>
        <Tabs size="large" type="card" border>
            <div slot="extra">extra</div>
            <TabPane label="one" c-key="1" disabled>
                <div slot="label">标签一</div>
                label111-content
            </TabPane>
            <TabPane label="two" c-key="2">
                <div slot="label"><span>标签二</span></div>
                label222-content
            </TabPane>
            <TabPane label="标签三" c-key="3">
                label333-content
            </TabPane>
            <TabPane label="标签四" c-key="4" disabled>
                label444-content
            </TabPane>
            <TabPane label="标签五" c-key="5">
                label555-content
            </TabPane>
        </Tabs>

        <h4>border</h4>
        <Tabs size="large" type="card" border>
            <div slot="extra">extra</div>
            <TabPane label="one" c-key="1" disabled>
                <div slot="label">标签一</div>
                label111-content
            </TabPane>
            <TabPane label="two" c-key="2">
                <div slot="label"><span>标签二</span></div>
                label222-content
            </TabPane>
            <TabPane label="标签三" c-key="3">
                label333-content
            </TabPane>
            <TabPane label="标签四" c-key="4" disabled>
                label444-content
            </TabPane>
            <TabPane label="标签五" c-key="5">
                label555-content
            </TabPane>
        </Tabs>

        <h4>自定义颜色</h4>
        <Tabs size="large" :nav-style="customNavStyle">
            <div slot="extra">extra</div>
            <TabPane label="one" c-key="1" disabled>
                <div slot="label">标签一</div>
                label111-content
            </TabPane>
            <TabPane label="two" c-key="2">
                <div slot="label"><span>标签二</span></div>
                label222-content
            </TabPane>
            <TabPane label="标签三" c-key="3">
                label333-content
            </TabPane>
            <TabPane label="标签四" c-key="4" disabled>
                label444-content
            </TabPane>
            <TabPane label="标签五" c-key="5">
                label555-content
            </TabPane>
        </Tabs>

        <Button @click="toggle = !toggle">toggle</Button>
        <h4>自定义颜色</h4>
        <Tabs v-model="activeTab" closable size="large" type="card" border :nav-style="customNavStyle">
            <div slot="extra">extra</div>
            <TabPane label="one" c-key="1" disabled>
                <div slot="label">标签一</div>
                label111-content
            </TabPane>
            <TabPane label="two" c-key="2" v-if="toggle">
                <div slot="label"><span>标签二</span></div>
                label222-content
            </TabPane>
            <TabPane label="标签三" c-key="3">
                label333-content
            </TabPane>
            <TabPane label="标签四" c-key="4" disabled>
                label444-content
            </TabPane>
            <TabPane label="标签五" c-key="5">
                label555-content
            </TabPane>
        </Tabs>


        <h4>自定义颜色11</h4>
        <Tabs size="large" closable type="card" border :nav-style="customNavStyle">
            <div slot="extra">extra</div>
            <TabPane v-for="item in tabList" :key="item.id" :c-key="item.id">
                <div slot="label">{{item.name}}</div>
                label111-content
            </TabPane>
        </Tabs>
    </div>
</template>

<script>
  export default {
    name: "TabsView",
    data() {
      return {
          customNavStyle: {
              defaultBackground: '#f8f8f9',
              activeBackground: '#ffffff',
              defaultColor: '#333333',
              activeColor: '#ff0000',
              defaultBorderColor: '#eeeeee',
              activeBorderColor: '#ff0000',
          },
          tabList: [],
          toggle: false,
          activeTab: '2'
      }
    },
    computed: {},
    components: {},
    created() {
    },
    mounted() {
        this.asyncSetTabList();
    },
    methods: {
        asyncSetTabList(){
            setTimeout(()=>{
                this.tabList = [
                    {
                        id: '0',
                        name: '标签0'
                    },
                    {
                        id: '1',
                        name: '标签1'
                    },
                    {
                        id: '2',
                        name: '标签2'
                    },
                    {
                        id: '3',
                        name: '标签3'
                    }
                ]
            }, 3000)
        }
    }
  }
</script>

<style lang="scss" scoped>
.TabsView{
    /*background: #cccccc;*/
    &>*{
        margin-bottom: 10px;
    }
}
</style>
