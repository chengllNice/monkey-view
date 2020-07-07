<template>
    <modal class="cl-modal-confirm"
             :class="[
                icon && `cl-modal-confirm--${icon}`,
                type && `cl-modal-confirm--${type}`
             ]"
             v-model="visible"
             :width="width"
             footer-hide
             :closable="false" @cancel="handlerButtonCancel">
        <div class="cl-modal-confirm__header" v-if="title">
            <div class="cl-modal-confirm__icon"><i :class="iconClass"></i></div>
            <div class="cl-modal-confirm__title">{{title}}</div>
        </div>
        <div class="cl-modal-confirm__content">
            <div class="cl-modal-confirm_item" v-for="(content, index) in contentText" :key="index" v-html="content"></div>
        </div>
        <div class="cl-modal-confirm__footer">
            <cl-button @click="handlerButtonCancel" v-if="icon === 'confirm' && localCancelText">{{localCancelText}}</cl-button>
            <cl-button type="primary" :loading='okButtonLoading' @click="handlerButtonOk" v-if="localOkText">{{localOkText}}</cl-button>
        </div>
    </modal>
</template>

<script>
    import Modal from './modal.vue'
    import ClButton from '../../button/src/button.vue'
  export default {
    name: "ModalConfirm",
    data() {
      return {
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
      localOkText(){
        return this.okText === null ? null : (this.okText ? this.okText : '确定');
      },
      localCancelText(){
        return this.cancelText === null ? null : (this.cancelText ? this.cancelText : '取消');
      },
      iconClass(){
        let result;
        switch (this.icon) {
          case 'info':
            result = 'cl-icon-info-fill';
            break;
          case 'success':
            result = 'cl-icon-success-fill';
            break;
          case 'warning':
            result = 'cl-icon-warning-fill';
            break;
          case 'error':
            result = 'cl-icon-remove-fill';
            break;
          case 'confirm':
            result = 'cl-icon-question-fill';
            break;
          default:
            result = 'cl-icon-question-fill';
            break;
        }
        return result;
      },
      contentText(){
        let content = [];
        if(typeof this.content === 'string'){
          content = [this.content];
        }else if(Array.isArray(this.content)){
          content = this.content;
        }
        return content;
      }
    },
    components: {
      Modal,
      ClButton
    },
    created() {
    },
    mounted() {
    },
    methods: {
      show(value){
        this.visible = value;
      },
      handlerButtonCancel(){
        this.visible = false;
        this.okButtonLoading = false;
        this.onCancel();
      },
      handlerButtonOk(){
        if(this.loading){
          this.okButtonLoading = true;
        }else{
          this.visible = false;
        }
        this.onOk();
      },
      remove(){
        this.visible = false;
        this.okButtonLoading = false;
        this.onRemove();
      },
      onOk(){},
      onCancel(){},
      onRemove(){}
    }
  }
</script>
