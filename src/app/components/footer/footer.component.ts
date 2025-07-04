import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from '../../services/dialog.service';
import { CookiesPolicyDialogComponent } from '../../shared/components/cookies-policy-dialog/cookies-policy-dialog.component';
import { PrivacyDialogComponent } from '../../shared/components/privacy-dialog/privacy-dialog.component';
import { TermDialogComponent } from '../../shared/components/term-dialog/term-dialog.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  nameFooter = 'Bernardo Mondragon Brozon';
  phoneNumberFooter = '+1 571 626 1227';
  emailAddressFooter = 'bmondragonbrozon@gmail.com';
  physicalAddressFooter = 'Hershey, Pennsylvania 17033, USA';

  constructor(
    public dialog: MatDialog,
    public dialogService: DialogService
  ) { }

  ngOnInit(): void {
  }

  onShowInfo(info: string): void {
    this.dialogService.openDialog(info, ['Ok']);
  }

  navigateLink(link : string) {
    window.open(link, '_blank');
  }

  openDialog(dialog: string) {
    switch (dialog) {
      case 'privacy':
        this.dialog.open(PrivacyDialogComponent, {
          height: '80vh',
          autoFocus: false
        });
        break;
      case 'terms':
        this.dialog.open(TermDialogComponent, {
          height: '80vh',
          autoFocus: false
        });
        break;
      case 'cookies':
        this.dialog.open(CookiesPolicyDialogComponent, {
          height: '80vh',
          autoFocus: false
        });
        break;
    }
  }

}
