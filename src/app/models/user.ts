export interface User {
    firstName:string,
	lastName:string,
	email:string,
	password:string,
	addresses:[
				{
                    city: string;
                    country: string;
                    street: string;
                    type: string;
		}
		]
}
