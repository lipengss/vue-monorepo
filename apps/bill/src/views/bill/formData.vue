<template>
	<van-popup v-model:show="state.showPopup" round closeable position="bottom" :style="{ height: '80%' }">
		<van-form @submit="onSubmit" @failed="onFailed" :show-error-message="false" :validate-first="true" :style="{ '--color': themeColor }">
			<van-cell>
				<template #title>
					<div class="expenses-wrap">
						<CheckBoxTag :options="formatMap(EXPENSES)" v-model:value="state.data.expenses" :active-color="themeColor" />
						<DateTag v-model:value="state.data.date" />
					</div>
				</template>
			</van-cell>
			<van-field
				v-model="state.data.price"
				readonly
				name="price"
				clickable
				@touchstart.stop="state.showKeyboard = true"
				size="large"
				:border="false"
				:rules="[{ required: true, message: '填写金额' }]"
			>
				<template #left-icon><svg-icon name="symbol" /></template>
			</van-field>
			<van-number-keyboard
				v-model="state.data.price"
				:show="state.showKeyboard"
				:extra-key="['00', '.']"
				:maxlength="6"
				theme="custom"
				close-button-text="完成"
				@blur="state.showKeyboard = false"
			/>
			<van-cell>
				<template #title>
					<GridItem :options="formatMap(_PURPOSE)" v-model:value="state.data.purpose" :active-color="themeColor" />
				</template>
			</van-cell>
			<van-field v-if="['meituan', 'douyin', 'zhifubao'].includes(state.data.purpose)" label="手续费" readonly>
				<template #right-icon>费率 0.10%</template>
			</van-field>
			<van-cell>
				<template #title>
					<div class="expenses-wrap">
						<van-space :size="10" wrap>
							<CheckBoxTag :options="STAFF.map((i) => ({ text: i, value: i }))" v-model:value="state.data.staff" :active-color="themeColor" />
						</van-space>
					</div>
				</template>
			</van-cell>
			<van-field v-model="state.data.remarks" border rows="2" autosize type="textarea" maxlength="50" placeholder="备注信息" show-word-limit />
			<van-cell>
				<van-button round block native-type="submit" :type="EXPENSES.get(state.data.expenses)?.type" sizi="large">保存</van-button>
			</van-cell>
		</van-form>
	</van-popup>
</template>
<script setup lang="ts">
import { reactive, computed, defineExpose, defineEmits } from 'vue';
import { EXPENSES, _PURPOSE, STAFF, formatMap } from '@/assets/data';
import { useBillStore } from '@/stores/bill';
import { showToast } from 'vant';
import { cloneDeep, nanoid, dayjs } from '@common/utils/src';
import CheckBoxTag from '@/components/CheckBoxTag/index.vue';
import GridItem from '@/components/GridItem/index.vue';
import DateTag from '@/components/DateTag/index.vue';

const billStore = useBillStore();

const state: IBillState = reactive({
	showPopup: false,
	showKeyboard: true,
	showPicker: false,
	data: cloneDeep(billStore.defaultBillItemData),
});
const themeColor = computed(() => {
	return EXPENSES.get(state.data.expenses)?.color;
});

const emits = defineEmits(['pull']);

function onAddOrder() {
	state.data.price = '';
	state.data.remarks = '';
	state.showPopup = true;
}

function onEditOrder(data: IOrder) {
	state.data = cloneDeep(data);
	state.showPopup = true;
}

function onFailed(errorInfo: any) {
	const msg = errorInfo.errors[0].message;
	showToast(msg);
}

function onSubmit() {
	const data = cloneDeep(state.data);
	data.date = dayjs(state.data.date).format('YYYY-MM-DD HH:mm:ss');
	if (data.id === '') {
		data.id = nanoid();
		billStore.addBill(data);
	} else {
		billStore.editBill(data);
	}
	emits('pull', data);
	state.showPopup = false;
}

defineExpose({ onAddOrder, onEditOrder });
</script>

<style scoped lang="scss">
.van-form {
	padding: 50px 0 10px;
	.expenses-wrap {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
	}
}
</style>
