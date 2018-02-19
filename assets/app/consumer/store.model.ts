export class Store{
	constructor(
				public id: string,
				public name: string,
				public type: string,
				public address: string,
				public city: string,
				public state: string,
				public image: string,
				public products,
				public orders,
				public createdDate
			){}
}