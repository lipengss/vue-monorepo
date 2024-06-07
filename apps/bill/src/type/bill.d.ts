interface IBillState {
	showPopup: boolean;
	showKeyboard: boolean;
	showPicker: boolean;
	data: IOrder;
}

interface IBillItem {
	id: string;
	date: string;
	totalIncome: number;
	totalPay: number;
	billList: IOrder[];
}

interface StoreState {
	billList: IOrder[];
	defaultBillItemData: IOrder;
}
