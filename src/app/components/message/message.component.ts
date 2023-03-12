import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';

export interface DialogData {
  push_message: string;
  user_id: string;
  date_start: string;
}

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
})
export class MessageComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: MatDialogRef<MessageComponent>,
    private userService: UserService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  sendMessage() {
    this.userService.messageToUsers(window.sessionStorage['auth-user'].slice(1, -1), this.data).subscribe((userData) => {
      console.log(userData)
    });
  }
}
