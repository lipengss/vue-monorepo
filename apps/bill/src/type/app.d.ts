interface IOrder {
	date: string;
	expenses: string;
	price: string;
	payMethod: string;
	purpose: string;
	staff: string;
	remarks: string;
	id: string;
}

interface IState {
	search: {
		staff: string;
		expenses: string;
		dateType: string;
		date: string;
	};
	dataList: IOrder[];
}

interface IDialogState {
	visible: boolean;
	data: IOrder;
}
