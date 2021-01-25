import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-cookies-policy-dialog',
  templateUrl: './cookies-policy-dialog.component.html',
  styleUrls: ['./cookies-policy-dialog.component.scss']
})
export class CookiesPolicyDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CookiesPolicyDialogComponent>) { }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
