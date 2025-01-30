export interface IUser {
    firstName: string;
    lastName: string;
}

export interface IOrderType {
    type: string;
}

export interface IOrder {
    User: IUser;
    OrderType: IOrderType;
}

export interface IWidgetDashboardWeb {
    data: {
        orders: IOrder[];
    };
    title: string
    dataOrderNotif:any
}