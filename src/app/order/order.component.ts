import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { ActivatedRoute, Router } from '@angular/router';
import { Order, OrderService } from '../order.service';
import { Customer } from '../order-details/order-details.component';

@Component({
  selector: 'order',
  templateUrl: './order.component.html',
  styleUrls: []
})
export class OrderComponent implements OnInit {
  private title = 'ordering-project';
  orders: Order[] = []
  customers: Customer[] = []

  constructor(private httpClient: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService) {}

  ngOnInit() {
    this.orderService.getCustomers().subscribe((cusData: any) => {
      this.customers = cusData
        this.orderService.getOrders().subscribe((data: any) => {
          this.orders = JSON.parse(JSON.stringify(data).replace(/-./g, x=>x[1].toUpperCase()))
        })
    })
  }

  goToOrderDetail(order: any) {
    this.orderService.orderDetails = order
    this.router.navigate(['/orders', order.id ]);
  }

  getCustomerName(custId: string) {
    return this.customers.find((cust: Customer) => cust.id === custId)?.name
  }
}