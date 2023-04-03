import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Order, OrderItem, OrderService } from "../order.service";
import { MatDialog } from '@angular/material/dialog';
import { NewOrderModalComponent } from "../new-order-modal/new-order-modal.component";

@Component({
    selector: 'order-details',
    templateUrl: './order-details.component.html',
    styleUrls: []
  })

export class OrderDetailsComponent implements OnInit {
    private originalOrder!: Order
    order!: Order
    private products: Product[] = [];
    private customers: Customer[] = []
    private newProductObj: OrderItem[] = []

    constructor(
        private router: Router,
        private orderService: OrderService,
        public dialog: MatDialog) {}

    ngOnInit() {
        this.originalOrder = this.orderService.orderDetails
        this.order = JSON.parse(JSON.stringify(this.originalOrder))
        this.orderService.getProducts().subscribe((data: any) => {
            this.products = data
        })
        this.orderService.getCustomers().subscribe((data: any) => {
            this.customers = data
        })
    }

    getProductDescription(productId: string) {
        const foundProduct = this.products ? this.products.find((pro: Product) => pro.id === productId) : null
        return foundProduct ? foundProduct.description : null
    }

    getCustomerName(custId: string) {
        const customer = this.customers.length ? this.customers.find((cust: Customer) => cust.id === custId) : null
        return customer ? customer.name : null
    }

    openDialog(): void {
        let dialogRef = this.dialog.open(NewOrderModalComponent, {
          width: '450px',
          data: { products: this.restProduct() }
        });
      
        dialogRef.afterClosed().subscribe((result: any) => {
            this.newProductObj = JSON.parse(result)
            this.order.items = [...this.order.items, ...this.newProductObj]
        });
    }

    restProduct() {
        const localProductList: Product[] = JSON.parse(JSON.stringify(this.products))
        this.order.items.forEach((product: OrderItem) => {
            const index = localProductList.findIndex((pro: Product) => product.productId === pro.id)
            localProductList.splice(index, 1)
        })
        return localProductList
    }

    addProduct(productId: string) {
        let product!: OrderItem
        if(this.order.items && this.order.items.length) {
            product = this.order.items.find((product: OrderItem) => product.productId === productId)!
        }
        product.quantity++
    }
    
    deleteProduct(productId: string) {
        let product!: OrderItem
        if(this.order.items && this.order.items.length) {
            product = this.order.items.find((product: OrderItem) => product.productId === productId)!
        }
        if(product.quantity > 1) {
            product.quantity --
        } else {
            this.order.items.splice(this.order.items.findIndex((pro: OrderItem) => pro.productId === productId), 1);
        }
    }

    showPlaceOrderButton() {
        return this.order.items.length && JSON.stringify(this.originalOrder.items) !== JSON.stringify(this.order.items)
    }

    showAddProductButton() {
        return this.order.items.length < this.products.length
    }

    placeOrder() {
        this.router.navigate(['/orders'])
    }

    cancelCart() {
        this.router.navigate(['/orders'])
    }
}

export interface Product {
    id: string,
    description: string,
    category: string,
    price: string,
}

export interface Customer {
    id: string,
    name: string,
    since: string,
    revenue: number,
}
