import { Component } from '@angular/core';

@Component({
  selector: 'app-transfer-page',
  templateUrl: './transfer-page.component.html',
  styleUrls: ['./transfer-page.component.css']
})
export class TransferPageComponent {
   accountDetails:any[]=[
    {conversion:"US",accountno:8756756236969,balance:"1200$"},
    {conversion:"IND/AUS",accountno:6747764766565585,balance:"4500$"},
    {conversion:"IND/AUS",accountno:6747764766565585,balance:"4500$"}

  ]
  

}
