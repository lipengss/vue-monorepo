<template>
	<el-config-provider :locale="zhCn">
		<div class="container">
			<card :list="state.dataList" />
			<div class="search">
				<el-form inline :model="state.search" ref="searchFromRef">
					<el-form-item label="经过人" prop="staff">
						<el-select placeholder="选择经过人" v-model="state.search.staff">
							<el-option label="全部" value="全部" />
							<el-option v-for="person in STAFF" :label="person" :value="person" />
						</el-select>
					</el-form-item>
					<el-form-item label="收支" prop="expenses">
						<el-select placeholder="选择收支" v-model="state.search.expenses">
							<el-option label="全部" value="全部" />
							<el-option v-for="[key, obj] in EXPENSES" :label="obj.label" :value="key" />
						</el-select>
					</el-form-item>
					<el-form-item>
						<el-button @click="onReset">重置</el-button>
					</el-form-item>
				</el-form>
				<el-button type="success" @click="dialogRef.open()">记账</el-button>
			</div>
			<el-table border :data="state.dataList">
				<el-table-column label="日期" prop="date" />
				<el-table-column label="收支">
					<template #default="{ row }">
						<el-tag :type="EXPENSES.get(row.expenses)?.color" effect="dark">{{ EXPENSES.get(row.expenses)?.label }}</el-tag>
					</template>
				</el-table-column>
				<el-table-column label="金额">
					<template #default="{ row }"> ¥{{ row.price }} </template>
				</el-table-column>
				<el-table-column label="付款方式">
					<template #default="{ row }">
						<el-space>
							<el-icon :size="18">
								<svg-icon :name="PAY_METHOD.get(row.payMethod)?.icon || ''" />
							</el-icon>
							{{ PAY_METHOD.get(row.payMethod)?.label }}
						</el-space>
					</template>
				</el-table-column>
				<el-table-column label="用途" prop="purpose" />
				<el-table-column label="经过人" prop="staff" />
				<el-table-column label="备注" prop="remarks" />
				<el-table-column label="操作" align="center">
					<template #default="{ row, $index }">
						<el-button size="small" type="primary" @click="dialogRef.edit(row)">编辑</el-button>
						<el-button size="small" type="danger" @click="onDelete($index)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<orderDialog ref="dialogRef" @onSave="onSave" />
	</el-config-provider>
</template>
<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue';
import { EXPENSES, PAY_METHOD, STAFF } from '@/assets/data';
import SvgIcon from '@/components/SvgIcon/index.vue';
import { ElConfigProvider } from 'element-plus';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import card from '@/views/home/card.vue';
import orderDialog from '@/views/home/dialog.vue';
import { Local } from '@/utils/storage';

const searchFromRef = ref();
const dialogRef = ref();
const state: IState = reactive({
	search: {
		staff: '全部',
		expenses: '全部',
		dateType: 'month',
		date: '2023-05-17',
	},
	dataList: [],
});

function onReset() {
	searchFromRef.value.resetFields();
}

function onSave(data: IOrder) {
	state.dataList.push(data);
	Local.set('myOrderList', state.dataList);
}
function onDelete(index: number) {
	state.dataList.splice(index, 1);
	Local.set('myOrderList', state.dataList);
}

const filterDataList = computed(() => {
	const { staff, expenses } = state.search;
	let result: IOrder[] = Local.get('myOrderList') || [];
	if (staff !== '全部') {
		result = result.filter((item) => item.staff === staff);
	}
	if (expenses !== '全部') {
		result = result.filter((item) => item.expenses === expenses);
	}
	state.dataList = result;
});

onMounted(() => {
	if (Local.get('myOrderList')) {
		state.dataList = Local.get('myOrderList');
	}
});
</script>
<style lang="scss" scoped>
.container {
	padding: 16px;
}
.search {
	display: flex;
	justify-content: space-between;
}
</style>
