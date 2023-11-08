<template>
    <div v-if="showModal" class="modal-custom">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header" style="background-color: #d4d4d4;">
                    <h5 class="modal-title" id="exampleModalLabel">Xác nhận hủy</h5>
                    <button type="button" class="close" aria-label="Close" @click="closeModal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p>{{ message }}</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
                    <button type="button" class="btn btn-danger" @click="removeFunction">{{ confirmText }}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TheModal',
    props: {
        showModal: Boolean,
        message: String,
        confirmText: String,
        removeFunction: Function,
    },
    methods: {
        closeModal() {
            this.$emit('close');
        },
        confirmAction() {
            this.$emit('confirm');
        },
    },

}
</script>

<style>
.modal-content {
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}
</style>