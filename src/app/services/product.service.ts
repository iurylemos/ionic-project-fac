import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Product } from '../interfaces/product';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  //Variável responsável por referênciar no FireStore
  //Acessando uma coleção
  //E dentro boto o nome da coleção que eu quero.
  private productsCollection : AngularFirestoreCollection<Product>;

  constructor(private angularFireStore: AngularFirestore) {
    this.productsCollection = this.angularFireStore.collection<Product>('Products')
  }

  public getProducts() {
    return this.productsCollection.snapshotChanges().pipe(
      //Pipe para pecorrer as informações do snapshot
      map(actions => {
        return actions.map( a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return { id, ...data };
        });
      })
    );
  }

  public addProduct(product: Product) {

  }

  public getProduct(id: string) {

  }

  public updateProduct(id:string, product: Product) {

  }

  public deleteProduct(id: string) {

  }
}
