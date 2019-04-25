import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { AuthService } from 'src/app/auth/_services/auth.service';
import { PhotoForPerson } from 'src/app/photo/_interfaces/photo-for-person';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-photo-upload',
  templateUrl: './photo-upload.component.html',
  styleUrls: ['./photo-upload.component.css']
})
export class PhotoUploadComponent implements OnInit {
  baseUrl = environment.URL;

  @Input() personId = 0;
  @Input() productId = 0;
  @Input() uploadUrl = '';

  @Output() newPhoto = new EventEmitter<PhotoForPerson>();

  uploader: FileUploader;
  hasBaseDropZoneOver = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.initializeUploader();
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.uploadUrl,
      authToken: 'Bearer ' + this.authService.getLocalAuth().token,
      isHTML5: true,
      allowedFileType: ['image'],
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const photo = JSON.parse(response);
        this.newPhoto.emit(photo);
      }
    };
  }
}
