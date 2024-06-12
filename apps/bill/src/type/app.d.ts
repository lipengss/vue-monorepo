
type EXPENSE_TYPE = 'income' | 'pay';

interface IOrder {
	date: string;
	expenses: EXPENSE_TYPE;
	price: string;
	payMethod: string;
	purpose: string;
	staff: string;
	remarks: string;
	id: string;
}

interface ISeriesData {
	value: string | number
	name: string
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
