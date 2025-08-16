import { Dispatch, SetStateAction } from 'react';

interface IOrderStatus {
    status: string;
}

interface IUser {
    firstName: string;
    lastName: string;
}

interface IOrderType {
    id: number;
    type: string;
    price: number | null;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    order: IOrder[];
}

interface IOrder {
    id: string;
    createdAt: string;
    isConfirm: boolean;
    orderStatus: IOrderStatus[];
    User: IUser;
    isSolved: boolean;
    isProcessed: boolean;
    OrderType: IOrderType;
    laundryPrice: number;
}

export interface IOrderContentMobile extends IOrder {
    setOrderData: Dispatch<SetStateAction<IOrder[] | null>>
    handleOrderDetail: (id: string) => void;
    setOpenDialog: Dispatch<SetStateAction<boolean>>
}

export interface IOrderData {
    order: {
        id: string;
        createdAt: string;
        isPaid: boolean;
        isConfirm: boolean;
        isDone: boolean;
        isReqDelivery: boolean;
        isComplain: boolean;
        deliveryFee: number;
        laundryPrice: number;
        paymentProof?: string;
        paymentMethod?: string;
        OrderType?: {
            type: string;
        };
    };
    orderStatus: Array<{
        status: string;
        Worker?: {
            firstName?: string;
            lastName?: string;
            phoneNumber?: string;
        };
    }>;
}

export interface IOrderPopUpDialog {
    openDialog: boolean;
    orderData?: IOrderData;
    setOpenDialog: (isOpen: boolean) => void;
    router: {
        push: (path: string) => void;
    };
    handleOrderConfirmation: (orderId: string) => void;
    handleOrderConfirmationPending: boolean;
    handleSolveComplaint: (orderId: string) => void;
    handleSolveComplaintPending: boolean;
}