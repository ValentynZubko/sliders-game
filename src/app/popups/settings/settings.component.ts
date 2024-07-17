import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {

  cookieServise = inject(CookieService);

  @ViewChild("stepsInput") stepsInput!: ElementRef;

  constructor(private dialogRef: MatDialogRef<SettingsComponent>) { }

  ngAfterViewInit() {
    this.stepsInput.nativeElement.value = 0;
    if (this.cookieServise.check("savedSlidersSteps")) {
      this.stepsInput.nativeElement.value = this.cookieServise.get("savedSlidersSteps");
    }
  }

  save(value: number) {
    this.cookieServise.set("savedSlidersSteps", value.toString());
    window.location.reload();
  }

  close() {
    this.dialogRef.close();
  }
}
