import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class OrderService {
    baseUrl = 'assets/json/'
    constructor(private httpClient: HttpClient) {}
    
    getProducts() {
        return this.httpClient.get(this.baseUrl + 'products.json')
    }

    getCustomers() {
        return this.httpClient.get(this.baseUrl + 'customers.json')
    }
}