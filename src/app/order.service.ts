import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class OrderService {
    private _orderDetails = null
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
    set orderDetails(orderDetails: any) {
        this._orderDetails = orderDetails
    }
    get orderDetails() {
        return this._orderDetails
    }
}