<template>
  <el-dialog v-model="state.visible" draggable title="记账">
    <el-form ref="formRef" :model="state.data" :rules="rules" label-width="80">
      <el-form-item label="日期" prop="date">
        <el-date-picker type="date" v-model="state.data.date" value-format="YYYY-MM-DD" />
      </el-form-item>
      <el-form-item label="收支" prop="expenses">
        <el-radio-group v-model="state.data.expenses">
          <el-radio-button v-for="[key, obj] in EXPENSES" :label="obj.label" :value="key" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="金额" prop="price">
        <el-input-number v-model="state.data.price" />
      </el-form-item>
      <el-form-item label="付款方式" prop="payMethod">
        <el-radio-group v-model="state.data.payMethod">
          <el-radio-button v-for="[key, pay] in PAY_METHOD" :label="pay.label" :value="key" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="用途" prop="purpose">
        <el-checkbox-group v-model="state.data.purpose">
          <el-checkbox v-for="purpose in PURPOSE" :label="purpose" :value="purpose"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="经过人" prop="staff">
        <el-radio-group v-model="state.data.staff">
          <el-radio-button v-for="person in STAFF" :label="person" :value="person" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注" prop="staff">
        <el-input v-model="state.data.remarks" type="textarea" placeholder="输入备注信息" :rows="4" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="onCancel">取消</el-button>
      <el-button type="primary" @click="onSave">保存</el-button>
      <el-button type="success" @click="onSaveContiue">保存并继续</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import {defineExpose, nextTick, reactive, ref} from 'vue';
import {EXPENSES, PAY_METHOD, PURPOSE, STAFF} from "@/assets/data";
import { dayjs, ElMessage } from 'element-plus'
import {cloneDeep} from "lodash-es";

const formRef = ref();
const state:IDialogState = reactive({
  visible: false,
  data: {
    date: dayjs().format('YYYY-MM-DD'),
    expenses: 'income',
    price: null,
    payMethod: 'WeChat',
    purpose: ['其它'],
    staff: '娇娇',
    remarks: ''
  }
})

const rules  = {
  price: { required: true, message: '金额是必填项' }
}

const emits = defineEmits(['onSave'])

function onCancel() {
  formRef.value.resetFields();
  state.visible = false;
}

function onSave() {
  formRef.value.validate((valid:boolean) => {
    if (!valid) return
    state.visible = false;
    emits('onSave', cloneDeep(state.data))
    setTimeout(() => {
      formRef.value.resetFields();
    }, 500)
  })
}


function onSaveContiue() {
  formRef.value.validate((valid:boolean) => {
    if (!valid) return
    emits('onSave', cloneDeep(state.data))
    ElMessage.success('保存成功！')
    setTimeout(() => {
      formRef.value.resetFields();
    }, 1000)
  })
}

function open() {
  formRef.value && formRef.value.resetFields();
  state.visible = true
}
function edit(data: IOrder) {
  state.visible = true
  nextTick(() => {
    state.data = cloneDeep(data)
  })
}

defineExpose({ open, edit })
</script>

<style scoped lang="scss">

</style>