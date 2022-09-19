import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../order.service';

@Component({
  selector: 'order',
  templateUrl: './order.component.html',
  styleUrls: []
})
export class OrderComponent implements OnInit {
  title = 'ordering-project';
  orders: any = []
  customers: any = []

  constructor(private httpClient: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService) {}

  ngOnInit() {
    this.orderService.getCustomers().subscribe(cusData => {
      this.customers = cusData
        this.orderService.getOrders().subscribe(data => {
          this.orders = JSON.parse(JSON.stringify(data).replace(/-./g, x=>x[1].toUpperCase()))
        })
    })
  }

  goToOrderDetail(order: any) {
    // this.orderService.orderDetails(order)
    this.router.navigate(['/orders', order.id ]);
  }

  getCustomerName(custId: string) {
    return this.customers.find((cust: any) => cust.id === custId).name
  }
}