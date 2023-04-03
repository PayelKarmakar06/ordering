import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class OrderService {
    private _orderDetails!: Order
    baseUrl = 'assets/json/'
    constructor(private httpClient: HttpClient) {}
    
    getProducts() {
        return this.httpClient.get(this.baseUrl + 'products.json')
    }

    getCustomers() {
        return this.httpClient.get(this.baseUrl + 'customers.json')
    }

    getOrders() {
        return this.httpClient.get(this.baseUrl + 'orders.json')
    }
    set orderDetails(orderDetails: Order) {
        this._orderDetails = orderDetails
    }
    get orderDetails() {
        return this._orderDetails
    }
}

export interface Order {
    id: string
    customerId: string,
    items: OrderItem[],
    total: string
}

export interface OrderItem {
    productId: string,
    quantity: number
    unitPrice: string,
    total: string
}