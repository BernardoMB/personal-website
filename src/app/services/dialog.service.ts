import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from '../components/dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(public dialog: MatDialog) { }

  openDialog(message: string, options: Array<string>) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { message, options }
    });
    return dialogRef.afterClosed();
  }
}
