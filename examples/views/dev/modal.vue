<template>
    <div class="dev-modal">

        <Button type="primary" @click="openModal('Base')">基础modal</Button>

        <Button type="primary" @click="openModal('Width')">自定义width</Button>

        <Button type="primary" @click="openModal('Top')">自定义Top</Button>

        <Button type="primary" @click="openModal('RenderHtml')">自定义挂载的dom节点</Button>

        <Button type="primary" @click="openModal('Loading')">异步关闭</Button>

        <Button type="primary" @click="openModal('Transition')">自定义transition</Button>

        <Button type="primary" @click="openModal('BodyScroll')">内容区域滚动bodyScroll</Button>

        <Button type="primary" @click="openModal('Fullscreen')">fullscreen</Button>

        <Button type="primary" @click="openModal('SlotsHeaderOrFooter')">自定义页头和页脚</Button>

        <Button type="primary" @click="openModal('FooterHide')">隐藏页脚footerHide</Button>

        <Button type="primary" @click="openModal('Header')">隐藏头部header</Button>

        <Button type="primary" @click="openModal('Close')">隐藏关闭按钮</Button>

        <Button type="primary" @click="openModal('ButtonText')">自定义确定和取消按钮文字</Button>

        <Button type="primary" @click="openModal('Cover')">禁止点击浮层关闭</Button>

        <Button type="primary" @click="openModal('NoCover')">不展示浮层</Button>

        <Button type="primary" @click="installModal('info')">实例方法info</Button>

        <Button type="primary" @click="installModal('success')">实例方法success</Button>

        <Button type="primary" @click="installModal('warning')">实例方法warning</Button>

        <Button type="primary" @click="installModal('error')">实例方法error</Button>

        <Button type="primary" @click="installModal('confirm')">实例方法confirm</Button>

        <Modal v-model="modalValueBase" title="modalValueBase">
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
        </Modal>

        <Modal v-model="modalValueWidth" width="600px" title="modalValueWidth">
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
        </Modal>

        <Modal v-model="modalValueTop" modalTop="30px" title="modalValueTop">
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
        </Modal>

        <Modal v-model="modalValueRenderHtml" modalTop="30px" title="自定义挂载的dom节点" :renderHtml="false">
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
        </Modal>

        <Modal v-model="modalValueLoading" :loading="loading" title="异步关闭" @ok="handleOk('Loading')">
            <p>点击确定之后，modal将在2s之后自动关闭...</p>
        </Modal>

        <Modal v-model="modalValueTransition" :transition="['fade', 'fade']" title="modalValueTransition">
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
        </Modal>

        <Modal v-model="modalValueBodyScroll" title="modalValueBodyScroll" bodyScroll>
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
        </Modal>

        <Modal v-model="modalValueFullscreen" title="modalValueFullscreen" fullscreen>
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
        </Modal>

        <Modal v-model="modalValueSlotsHeaderOrFooter" title="自定义页头和页脚">
            <div slot="header" :style="{textAlign: 'center'}">
                自定义页头和页脚
            </div>
            <div slot="footer" :style="{textAlign: 'center'}">
                <Button>自定义取消</Button>
                <Button type="danger">自定义确定</Button>
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
        </Modal>

        <Modal v-model="modalValueFooterHide" title="modalValueFooterHide" footerHide>
            <p>Content of dialogContent of dialogContent of dialogContent of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
        </Modal>

        <Modal v-model="modalValueHeader">
            <p>Content of dialogContent of dialogContent of dialogContent of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
        </Modal>

        <Modal v-model="modalValueClose" :closable="false">
            <p>Content of dialogContent of dialogContent of dialogContent of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
        </Modal>

        <Modal v-model="modalValueButtonText" title='modalValueButtonText' cancelText="cancel" okText="ok">
            <p>Content of dialogContent of dialogContent of dialogContent of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
        </Modal>

        <Modal v-model="modalValueCover" :coverClosable="false" title='modalValueCover'>
            <p>Content of dialogContent of dialogContent of dialogContent of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
        </Modal>

        <Modal v-model="modalValueNoCover" :coverShow="false" title='modalValueNoCover'>
            <p>Content of dialogContent of dialogContent of dialogContent of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
        </Modal>
    </div>
</template>

<script>
    export default {
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
        methods: {
            openModal(type) {
                this[`modalValue${type}`] = true;
            },
            handleOk(type) {
                if (type === 'Loading') {
                    setTimeout(() => {
                        this[`modalValue${type}`] = false;
                    }, 2000);
                } else {
                    this[`modalValue${type}`] = false;
                }
            },
            installModal(type) {
                const vue = this;
                this.$Modal[type]({
                    title: `对话框的标题${type}`,
                    content: '<p>一些对话框内容</p><b>一些对话框内容</b>',
                    loading: type === 'confirm',
                    onOk() {
                        if (type === 'confirm') {
                            setTimeout(() => {
                                vue.$Modal.remove();
                            }, 2000);
                        }
                        console.log('====ok')
                    },
                    onCancel() {

                    }
                })
            }
        }
    }
</script>
