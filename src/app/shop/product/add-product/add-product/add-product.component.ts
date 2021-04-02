import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductEcommerce } from 'src/app/Entity/product';
import { ProductImage } from 'src/app/Entity/ProductImage';
import { ImagesService } from 'src/app/shared/services/image.service';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  ProductForm: FormGroup;
  uploadForm: FormGroup;
  image: ProductImage = new ProductImage();
  Name: string = '';
  Creation_Date: Date;
  Promotion_Price: number;
  Sexe: string;
  marque: string;
  Price: number;
  submitted: boolean;
  files = [];
  insertedProduct: number;

  addSuccess: boolean = false;

  constructor(private formBuilder: FormBuilder, private imageData: ImagesService,
    private prodData: ProductService) {

    this.ProductForm = this.formBuilder.group({
      name: new FormControl(this.Name, [
        Validators.required,
      ]),
      sexe: [this.Sexe, Validators.required],
      marque: [this.marque, Validators.required],
      Promotion_Price: [this.Promotion_Price, Validators.required],
      date: [this.Creation_Date, Validators.required],
      price: new FormControl(this.Price, [
        Validators.required,
        Validators.pattern('^[0-9]*.+[0-9]*$'),
      ]),
    });
    this.uploadForm = this.formBuilder.group({
      file: ['']
    });




  }
  ngOnInit(): void {
  }
  onSubmit() {

    this.submitted = true;
    if (this.ProductForm.invalid) {
      return;
    }

    //set product values
    var product = new ProductEcommerce();
    product.Name = this.ProductForm.get('name').value;
    product.Creation_Date = this.ProductForm.get('date').value;
    product.marque = this.marque;
    product.Sexe = this.ProductForm.get('sexe').value;
    product.Price = +this.ProductForm.get('price').value;
    product.Promotion_Price = 0;
    //add product
    this.prodData.addProduct(product).subscribe(res => {
      console.log(res);
      this.insertedProduct = res['id'];
      var prod = new ProductEcommerce();
      prod.id = this.insertedProduct;
      //multiple uploads
      this.files.forEach(file => {
        const formData = new FormData();
        //prepares a form-data for the http post request
        formData.append('file', file);
        this.imageData.addImage(formData).subscribe(img => {
          //set the onetomany association by the full api url
          prod.Image.push(img['@id']);
        }).add(() => {
          //Called when operation is complete (both success and error)
          // updates product
          this.prodData.updateProduct(prod).subscribe(res => {
            console.log(res);
          });
        });

      });


    });

  }
  public onUploadInit(args: any): void {
  }
  missingImageError() {
    alert("verifier votre extension");
  }
}
