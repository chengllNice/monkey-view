<template>
    <div class="ModalView">

        <ClButton type="primary" @click="openModal('Base')">基础modal</ClButton>

        <ClButton type="primary" @click="openModal('Width')">自定义width</ClButton>

        <ClButton type="primary" @click="openModal('Top')">自定义Top</ClButton>

        <ClButton type="primary" @click="openModal('RenderHtml')">自定义挂载的dom节点</ClButton>

        <ClButton type="primary" @click="openModal('Loading')">异步关闭</ClButton>

        <ClButton type="primary" @click="openModal('Transition')">自定义transition</ClButton>

        <ClButton type="primary" @click="openModal('BodyScroll')">内容区域滚动bodyScroll</ClButton>

        <ClButton type="primary" @click="openModal('Fullscreen')">fullscreen</ClButton>

        <ClButton type="primary" @click="openModal('SlotsHeaderOrFooter')">自定义页头和页脚</ClButton>

        <ClButton type="primary" @click="openModal('FooterHide')">隐藏页脚footerHide</ClButton>

        <ClButton type="primary" @click="openModal('Header')">隐藏头部header</ClButton>

        <ClButton type="primary" @click="openModal('Close')">隐藏关闭按钮</ClButton>

        <ClButton type="primary" @click="openModal('ButtonText')">自定义确定和取消按钮文字</ClButton>

        <ClButton type="primary" @click="openModal('Cover')">禁止点击浮层关闭</ClButton>

        <ClButton type="primary" @click="openModal('NoCover')">不展示浮层</ClButton>

        <ClButton type="primary" @click="installModal('info')">实例方法info</ClButton>

        <ClButton type="primary" @click="installModal('success')">实例方法success</ClButton>

        <ClButton type="primary" @click="installModal('warning')">实例方法warning</ClButton>

        <ClButton type="primary" @click="installModal('error')">实例方法error</ClButton>

        <ClButton type="primary" @click="installModal('confirm')">实例方法confirm</ClButton>


        <ClModal v-model="modalValueBase" title="modalValueBase">
            <p>Content of dialogContent of dialogContent of dialogContent of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
        </ClModal>

        <ClModal v-model="modalValueWidth" width="600px" title="modalValueWidth">
            <p>Content of dialogContent of dialogContent of dialogContent of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
        </ClModal>

        <ClModal v-model="modalValueTop" modalTop="30px" title="modalValueTop">
            <p>Content of dialogContent of dialogContent of dialogContent of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
        </ClModal>

        <ClModal v-model="modalValueRenderHtml" modalTop="30px" title="自定义挂载的dom节点" :renderHtml="false">
            <p>Content of dialogContent of dialogContent of dialogContent of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
        </ClModal>

        <ClModal v-model="modalValueLoading" :loading="loading" title="异步关闭" @ok="handlerOk('Loading')">
            <p>点击确定之后，modal将在2s之后自动关闭...</p>
        </ClModal>

        <ClModal v-model="modalValueTransition" :transition="['fade', 'scale']" title="modalValueTransition">
            <p>Content of dialogContent of dialogContent of dialogContent of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
        </ClModal>

        <ClModal v-model="modalValueBodyScroll" title="modalValueBodyScroll" bodyScroll>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
        </ClModal>

        <ClModal v-model="modalValueFullscreen" title="modalValueFullscreen" fullscreen>
            <p>Content of dialogContent of dialogContent of dialogContent of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
        </ClModal>

        <ClModal v-model="modalValueSlotsHeaderOrFooter" title="自定义页头和页脚">
            <div slot="header" :style="{textAlign: 'center'}">
                自定义页头和页脚
            </div>
            <div slot="footer" :style="{textAlign: 'center'}">
                <ClButton>自定义取消</ClButton>
                <ClButton type="danger">自定义确定</ClButton>
            </div>
            <p>Content of dialogContent of dialogContent of dialogContent of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
        </ClModal>

        <ClModal v-model="modalValueFooterHide" title="modalValueFooterHide" footerHide>
            <p>Content of dialogContent of dialogContent of dialogContent of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
        </ClModal>

        <ClModal v-model="modalValueHeader">
            <p>Content of dialogContent of dialogContent of dialogContent of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
        </ClModal>

        <ClModal v-model="modalValueClose" :closable="false">
            <p>Content of dialogContent of dialogContent of dialogContent of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
        </ClModal>

        <ClModal v-model="modalValueButtonText" title='modalValueButtonText' cancelText="cancel" okText="ok">
            <p>Content of dialogContent of dialogContent of dialogContent of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
        </ClModal>

        <ClModal v-model="modalValueCover" :coverClosable="false" title='modalValueCover'>
            <p>Content of dialogContent of dialogContent of dialogContent of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
        </ClModal>

        <ClModal v-model="modalValueNoCover" :coverShow="false" title='modalValueNoCover'>
            <p>Content of dialogContent of dialogContent of dialogContent of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
        </ClModal>


        <div class="viewDes">
            <h3>API</h3>
            <h4>modal props</h4>

            <div class="propItem">
                <p><b>属性：transition</b></p>
                <p><b>类型：Array</b></p>
                <p><b>说明：</b>自定义modal进入和离开的动画，第一个值为遮罩层的动画，第二个为modal的动画</p>
                <p><b>默认值：</b>['fade', 'fade']</p>
            </div>
            <div class="propItem">
                <p><b>属性：width</b></p>
                <p><b>类型：String, Number</b></p>
                <p><b>说明：</b>对话框宽度，可设置百分比</p>
                <p><b>默认值：</b>520</p>
            </div>
            <div class="propItem">
                <p><b>属性：value</b></p>
                <p><b>类型：Boolean</b></p>
                <p><b>说明：</b>对话框是否显示，可以使用v-model双向绑定</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="propItem">
                <p><b>属性：fullscreen</b></p>
                <p><b>类型：Boolean</b></p>
                <p><b>说明：</b>是否全屏显示</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="propItem">
                <p><b>属性：footerHide</b></p>
                <p><b>类型：Boolean</b></p>
                <p><b>说明：</b>隐藏footer</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="propItem">
                <p><b>属性：closable</b></p>
                <p><b>类型：Boolean</b></p>
                <p><b>说明：</b>是否显示右上角关闭按钮</p>
                <p><b>默认值：</b>true</p>
            </div>
            <div class="propItem">
                <p><b>属性：cancelText</b></p>
                <p><b>类型：String</b></p>
                <p><b>说明：</b>取消按钮的文字</p>
                <p><b>默认值：</b>取消</p>
            </div>
            <div class="propItem">
                <p><b>属性：okText</b></p>
                <p><b>类型：String</b></p>
                <p><b>说明：</b>确认按钮的文字</p>
                <p><b>默认值：</b>确定</p>
            </div>
            <div class="propItem">
                <p><b>属性：styles</b></p>
                <p><b>类型：Object</b></p>
                <p><b>说明：</b>设置modal的样式</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="propItem">
                <p><b>属性：title</b></p>
                <p><b>类型：String</b></p>
                <p><b>说明：</b>标题</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="propItem">
                <p><b>属性：loading</b></p>
                <p><b>类型：Boolean</b></p>
                <p><b>说明：</b>点击确定按钮时，确定按钮是否显示loading状态，开启则需要手动关闭对话框</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="propItem">
                <p><b>属性：coverClosable</b></p>
                <p><b>类型：Boolean</b></p>
                <p><b>说明：</b>是否禁用点击遮罩层关闭对话框</p>
                <p><b>默认值：</b>true</p>
            </div>
            <div class="propItem">
                <p><b>属性：coverShow</b></p>
                <p><b>类型：Boolean</b></p>
                <p><b>说明：</b>是否显示遮罩层</p>
                <p><b>默认值：</b>true</p>
            </div>
            <div class="propItem">
                <p><b>属性：bodyScroll</b></p>
                <p><b>类型：Boolean</b></p>
                <p><b>说明：</b>开启时在modal-body内容高度超出时滚动，modal的高度不会超出视口的高度。如果不开启此项，内容高度自动，超出时会出现浏览器的滚动条</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="propItem">
                <p><b>属性：modalTop</b></p>
                <p><b>类型：String, Number</b></p>
                <p><b>说明：</b>对话框距离视口顶部的距离</p>
                <p><b>默认值：</b>100</p>
            </div>
            <div class="propItem">
                <p><b>属性：renderHtml</b></p>
                <p><b>类型：HTMLElement, Boolean</b></p>
                <p><b>说明：</b>指定对话框渲染到的HTML元素，默认渲染到body中。</p>
                <p><b>默认值：</b>document.body</p>
            </div>
        </div>

        <div class="viewDes">
            <h3>API</h3>
            <h4>modal event</h4>

            <div class="propItem">
                <p><b>事件名：cancel</b></p>
                <p><b>说明：</b>关闭对话框时触发</p>
                <p><b>返回值：</b>状态</p>
            </div>
            <div class="propItem">
                <p><b>事件名：ok</b></p>
                <p><b>说明：</b>点击确定按钮时触发</p>
                <p><b>返回值：</b>状态</p>
            </div>
        </div>

        <div class="viewDes">
            <h3>API</h3>
            <h4>modal slot</h4>

            <div class="propItem">
                <p><b>名称：close</b></p>
                <p><b>说明：</b>自定义右上角关闭按钮</p>
            </div>
            <div class="propItem">
                <p><b>名称：header</b></p>
                <p><b>说明：</b>自定义页头内容</p>
            </div>
            <div class="propItem">
                <p><b>名称：footer</b></p>
                <p><b>说明：</b>自定义页脚内容</p>
            </div>
        </div>

        <div class="viewDes">
            <h3>API</h3>
            <h4>modal instance</h4>
            <p>通过一下方式调用：</p>
            <ul>
                <li>this.$Modal.info(config)</li>
                <li>this.$Modal.success(config)</li>
                <li>this.$Modal.warning(config)</li>
                <li>this.$Modal.error(config)</li>
                <li>this.$Modal.confirm(config)</li>
            </ul>

            <p>参数config为对象，具体如下：</p>
            <div class="propItem">
                <p><b>属性：width</b></p>
                <p><b>类型：</b>String, Number</p>
                <p><b>说明：</b>宽度</p>
                <p><b>默认值：</b>350</p>
            </div>
            <div class="propItem">
                <p><b>属性：title</b></p>
                <p><b>类型：</b>String</p>
                <p><b>说明：</b>标题</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="propItem">
                <p><b>属性：content</b></p>
                <p><b>类型：</b>String, Array</p>
                <p><b>说明：</b>内容。当类型为Array时，分行显示</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="propItem">
                <p><b>属性：okText</b></p>
                <p><b>类型：</b>String</p>
                <p><b>说明：</b>取消按钮的文本。confirm类型时有效</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="propItem">
                <p><b>属性：cancelText</b></p>
                <p><b>类型：</b>String</p>
                <p><b>说明：</b>确认按钮的文本</p>
                <p><b>默认值：</b>-</p>
            </div>
            <div class="propItem">
                <p><b>属性：okButtonLoading</b></p>
                <p><b>类型：</b>Boolean</p>
                <p><b>说明：</b>确定按钮的loading状态</p>
                <p><b>默认值：</b>false</p>
            </div>
            <div class="propItem">
                <p><b>属性：type</b></p>
                <p><b>类型：</b>String</p>
                <p><b>说明：</b>布局类型，可选值left/default</p>
                <p><b>默认值：</b>-</p>
            </div>
        </div>

    </div>
</template>

<script>

  export default {
    name: "ModalView",
    data() {
      return {
        modalValueBase: false,
        modalValueWidth: false,
        modalValueTop: false,
        modalValueRenderHtml: false,
        modalValueLoading: false,
        modalValueTransition: false,
        modalValueBodyScroll: false,
        modalValueFullscreen: false,
        modalValueSlotsHeaderOrFooter: false,
        modalValueFooterHide: false,
        modalValueHeader: false,
        modalValueClose: false,
        modalValueButtonText: false,
        modalValueCover: false,
        modalValueNoCover: false,

        loading: true
      }
    },
    computed: {},
    components: {
    },
    created() {
    },
    mounted() {

    },
    methods: {
      openModal(type){
        this[`modalValue${type}`] = true;
      },
      handlerOk(type){
        if(type === 'Loading'){
          setTimeout(()=>{
            this[`modalValue${type}`] = false;
          },2000);
        }else{
          this[`modalValue${type}`] = false;
        }
      },
      installModal(type){
        this.$Modal[type]({
          title: `对话框的标题${type}`,
          content: ['一些对话框内容','一些对话框内容','一些对话框内容'],
          loading: type === 'confirm',
          onOk(){
            if(type === 'confirm'){
              setTimeout(()=>{
                this.$Modal.remove();
              },2000);
            }
            console.log('====ok')
          },
          onCancel(){

          }
        })
      }
    }
  }
</script>
