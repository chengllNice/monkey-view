<template>
    <modal :class="[
                `${classPrefix}`,
                icon && `${classPrefix}--${icon}`,
                type && `${classPrefix}--${type}`
           ]"
           v-model="visible"
           :width="width"
           footer-hide
           :cover-closable="false"
           close-remove-dom
           :closable="false"
           @cancel="handleButtonCancel">
        <div :class="[`${classPrefix}__header`]" v-if="title">
            <div :class="[`${classPrefix}__icon`]"><Icon :type="iconClass"></Icon></div>
            <div :class="[`${classPrefix}__title`]">{{title}}</div>
        </div>
        <div :class="[`${classPrefix}__content`]" v-html="content"></div>
        <div :class="[`${classPrefix}__footer`]">
            <Button @click="handleButtonCancel" v-if="icon === 'confirm' && localCancelText">
                {{localCancelText}}
            </Button>
            <Button type="primary" :loading='okButtonLoading' @click="handleButtonOk" v-if="localOkText">
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
    import Locale from 'main/mixins/locale'

    export default {
        name: 'ModalConfirm',
        mixins: [Locale],
        data() {
            return {
                classPrefix: Config.classPrefix + '-modal-confirm',
                visible: false,
                width: 350,
                title: '',
                content: '',
                okText: '',
                cancelText: '',
                okButtonLoading: false,
                loading: false,
                icon: '',
                type: ''// 布局类型  两种(default, left)
            }
        },
        computed: {
            localOkText() {
                return this.okText === null ? null : (this.okText ? this.okText : this.t('m.modal.okText'));
            },
            localCancelText() {
                return this.cancelText === null ? null : (this.cancelText ? this.cancelText : this.t('m.modal.cancelText'));
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
                        result = 'error-fill';
                        break;
                    case 'confirm':
                        result = 'question-fill';
                        break;
                    default:
                        result = 'question-fill';
                        break;
                }
                return result;
            }
        },
        components: {
            Modal,
            Button,
            Icon
        },
        methods: {
            show(value) {
                this.visible = value;
            },
            handleButtonCancel() {
                this.visible = false;
                this.okButtonLoading = false;
                this.onCancel();
            },
            handleButtonOk() {
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
