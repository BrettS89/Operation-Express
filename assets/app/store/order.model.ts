export class Order{
	constructor(
				public user: string,
				public store: string,
				public products: [{}],
				public subTotal: number,
				public tax: number,
				public total: number,
				public cart?: string,
				public id?: string,
				public createdDate?: string,
				public completedPurchase?: boolean,
				public hasArrived?: boolean,
				public accepted?: boolean,
				public employee?: string

			){}
}