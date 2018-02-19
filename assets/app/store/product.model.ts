export class Product{
	constructor(
				public store: string,
				public name: string,
				public brand: string,
				public price: string,
				public quantity: string,
				public image: string,
				public id?: string,
				public createdDate?: string
			){}
}