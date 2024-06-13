interface IBillState {
	showPopup: boolean;
	showKeyboard: boolean;
	showPicker: boolean;
	data: IOrder;
}

interface StoreState {
	billList: IOrder[];
	defaultBillItemData: IOrder;
	filter: {
		expenses: string;
		purpose: string;
	}
}
