<template>
    <modal :class="[
                `${classPrefix}`,
                icon && `${classPrefix}--${icon}`,
                type && `${classPrefix}--${type}`
           ]"
           v-model="visible"
           :width="width"
           footer-hide
           :closable="false"
           @cancel="handlerButtonCancel">
        <div :class="[`${classPrefix}__header`]" v-if="title">
            <div :class="[`${classPrefix}__icon`]"><Icon :type="iconClass"></Icon></div>
            <div :class="[`${classPrefix}__title`]">{{title}}</div>
        </div>
        <div :class="[`${classPrefix}__content`]">
            <div :class="[`${classPrefix}_item`]"
                 v-for="(content, index) in contentText"
                 :key="index"
                 v-html="content"></div>
        </div>
        <div :class="[`${classPrefix}__footer`]">
            <Button @click="handlerButtonCancel" v-if="icon === 'confirm' && localCancelText">
                {{localCancelText}}
            </Button>
            <Button type="primary" :loading='okButtonLoading' @click="handlerButtonOk" v-if="localOkText">
                {{localOkText}}
            </Button>
        </div>
    </modal>
</template>

<script>
    import Config from 'main/config/config'
    import Modal from './modal.vue'
    import Button from 'packages/button'
    import Icon from 'packages/icon'

    export default {
        name: "ModalConfirm",
        data() {
            return {
                classPrefix: Config.classPrefix + '-modal-confirm',
                visible: false,
                width: 350,
                title: '',
                content: [],
                okText: '',
                cancelText: '',
                okButtonLoading: false,
                loading: false,
                icon: '',
                type: '',//布局类型  两种(default, left)
            }
        },
        computed: {
            localOkText() {
                return this.okText === null ? null : (this.okText ? this.okText : '确定');
            },
            localCancelText() {
                return this.cancelText === null ? null : (this.cancelText ? this.cancelText : '取消');
            },
            iconClass() {
                let result;
                switch (this.icon) {
                    case 'info':
                        result = 'info-fill';
                        break;
                    case 'success':
                        result = 'success-fill';
                        break;
                    case 'warning':
                        result = 'warning-fill';
                        break;
                    case 'error':
                        result = 'remove-fill';
                        break;
                    case 'confirm':
                        result = 'question-fill';
                        break;
                    default:
                        result = 'question-fill';
                        break;
                }
                return result;
            },
            contentText() {
                let content = [];
                if (typeof this.content === 'string') {
                    content = [this.content];
                } else if (Array.isArray(this.content)) {
                    content = this.content;
                }
                return content;
            }
        },
        components: {
            Modal,
            Button,
            Icon
        },
        created() {
        },
        mounted() {
        },
        methods: {
            show(value) {
                this.visible = value;
            },
            handlerButtonCancel() {
                this.visible = false;
                this.okButtonLoading = false;
                this.onCancel();
            },
            handlerButtonOk() {
                if (this.loading) {
                    this.okButtonLoading = true;
                } else {
                    this.visible = false;
                }
                this.onOk();
            },
            remove() {
                this.visible = false;
                this.okButtonLoading = false;
                this.onRemove();
            },
            onOk() {
            },
            onCancel() {
            },
            onRemove() {
            }
        }
    }
</script>
