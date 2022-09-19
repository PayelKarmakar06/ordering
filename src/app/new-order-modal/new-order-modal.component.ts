import { Component, Inject } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
    selector: 'new-order-modal',
    templateUrl: './new-order-modal.component.html',
    styleUrls: []
  })
  export class NewOrderModalComponent {
    public productData: any
    public productQuantity: any

    constructor(
        public dialogRef: MatDialogRef<NewOrderModalComponent>, 
        @Inject(MAT_DIALOG_DATA) private data: any
        ) {
            this.productData = data
    }

    setValue(form: NgForm) {
        let productList = this.productData.products.map((elem: any, index: number) => {
            return {
                productId: elem.id,
                quantity: form.value['productQuantity'+index],
                unitPrice: elem.price,
                total: (Number(elem.price) * Number(form.value['productQuantity'+index])).toFixed(2)
            }
        })
        productList = productList.length ? productList.filter((product: any) => product.quantity) : []
        this.dialogRef.close(JSON.stringify(productList))
    }

  }