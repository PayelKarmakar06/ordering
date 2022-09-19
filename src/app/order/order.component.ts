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
  baseUrl = 'assets/json/'
  orders: any = []
  customers: any = []

  constructor(private httpClient: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService) {}

  ngOnInit() {
    this.orderService.getCustomers().subscribe(cusData => {
      this.customers = cusData
        this.httpClient.get(this.baseUrl + 'orders.json').subscribe(data => {
          this.orders = JSON.parse(JSON.stringify(data).replace(/-./g, x=>x[1].toUpperCase()))
        })
    })
  }

  goToOrderDetail(order: any) {
    this.router.navigate(['/orders', order.id, { orderDetails: JSON.stringify(order) } ]);
  }

  getCustomerName(custId: string) {
    return this.customers.find((cust: any) => cust.id === custId).name
  }
}