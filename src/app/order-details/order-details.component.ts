import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { OrderService } from "../order.service";
import { MatDialog } from '@angular/material/dialog';
import { NewOrderModalComponent } from "../new-order-modal/new-order-modal.component";

@Component({
    selector: 'order-details',
    templateUrl: './order-details.component.html',
    styleUrls: []
  })

export class OrderDetailsComponent implements OnInit {
    baseUrl = 'assets/json/'
    originalOrder: any
    order: any
    products: any = [];
    customers: any
    newProductObj: any

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
        this.orderService.getCustomers().subscribe(data => {
            this.customers = data
        })
    }

    getProductDescription(productId: string) {
        const foundProduct = this.products ? this.products.find((pro: any) => pro.id === productId) : null
        return foundProduct ? foundProduct.description : null
    }

    getCustomerName(custId: string) {
        return this.customers ? this.customers.find((cust: any) => cust.id === custId).name : null
    }

    openDialog(): void {
        let dialogRef = this.dialog.open(NewOrderModalComponent, {
          width: '450px',
          data: { products: this.restProduct() }
        });
      
        dialogRef.afterClosed().subscribe((result: any) => {
            this.newProductObj = JSON.parse(result);
            this.order.items = [...this.order.items, ...this.newProductObj]
        });
    }

    restProduct() {
        const localProductList = JSON.parse(JSON.stringify(this.products))
        this.order.items.forEach((product: any) => {
            const index = localProductList.findIndex((pro: any) => product.productId === pro.id)
            localProductList.splice(index, 1)
        })
        return localProductList
    }

    addProduct(productId: string) {
        ~~this.order.items.find((product: any) => product.productId === productId).quantity ++
    }
    
    deleteProduct(productId: string) {
        const product = this.order.items.find((product: any) => product.productId === productId)
        if(product.quantity > 1) {
            ~~this.order.items.find((product: any) => product.productId === productId).quantity --
        } else {
            this.order.items.splice(this.order.items.findIndex((pro: any) => pro.id === productId), 1);
        }
    }

    showPlaceOrderButton() {
        return this.order.items.length && JSON.stringify(this.originalOrder.items) !== JSON.stringify(this.order.items)
    }

    placeOrder() {
        console.log('order:', this.order)
        this.router.navigate(['/orders'])
    }

    cancelCart() {
        this.router.navigate(['/orders'])
    }
  }