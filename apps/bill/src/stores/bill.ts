import { defineStore } from 'pinia';
import { dayjs, sortBy, Local } from '@common/utils';
import { showConfirmDialog, showSuccessToast } from 'vant';
import router from '@/router';

export const useBillStore = defineStore('bill', {
	state(): StoreState {
		return {
			billList: Local.get('billList') || [],
			defaultBillItemData: {
				expenses: 'income',
				price: '',
				payMethod: 'cash',
				purpose: 'other',
				staff: '娇娇',
				remarks: '',
				date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
				id: '',
			},
			filter: {
				expenses: 'all',
				purpose: 'all'
			}
		};
	},
	getters: {
		formatBillList(state) {
			const data: { [key: string]: { list: IOrder[]; totalIncome: number; totalPay: number; date: string } } = {};
			const filterList = state.billList.filter((n) => {
				return (n.expenses === state.filter.expenses || state.filter.expenses === 'all') && (n.purpose === state.filter.purpose || state.filter.purpose === 'all');
			});
			filterList.forEach((n) => {
				const day = dayjs(n.date).format('YYYY-MM-DD');
				if (data[day]) {
					data[day].list.push(n);
					data[day].totalIncome = sum(data[day].list.filter((n) => n.expenses === 'income'));
					data[day].totalPay = sum(data[day].list.filter((n) => n.expenses === 'pay'));
				} else {
					data[day] = {
						date: day,
						totalIncome: n.expenses === 'income' ? parseFloat(n.price) : 0,
						totalPay: n.expenses === 'pay' ? parseFloat(n.price) : 0,
						list: [n],
					};
				}
			});
			function sum(list: IOrder[]): number {
				return list.map((n) => parseFloat(n.price)).reduce((pre, cur) => pre + cur, 0);
			}
			return sortBy(Object.values(data), (n) => dayjs(n.date).valueOf()).reverse();
		},
	},
	actions: {
		init() {
			if (Local.get('billList')) {
				this.billList = Local.get('billList');
			}
		},
		deleteBillOrder(id: string, bool?: boolean) {
			showConfirmDialog({
				message: '删除后无法啊恢复！是否删除？',
				beforeClose: (action) => {
					if (action === 'confirm') {
						const index: number = this.billList.findIndex((n) => n.id === id);
						if (index !== -1) {
							this.billList.splice(index, 1);
						}
						Local.set('billList', this.billList);
						bool && router.back();
					}
					return true;
				},
			}).catch(() => {});
		},
		addBill(data: IOrder) {
			if (!this.billList.some((item) => item.id === data.id)) {
				this.billList.push(data);
				Local.set('billList', this.billList);
			}
		},
		editBill(data: IOrder) {
			const { id } = data;
			const index = this.billList.findIndex((i) => i.id === id);
			if (index !== -1) {
				this.billList.splice(index, 1, data);
			}
			Local.set('billList', this.billList);
			showSuccessToast('修改成功');
		},
	},
});
