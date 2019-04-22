import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/_services/auth.service';
import { environment } from 'src/environments/environment';
import { FileUploaderCustom } from '../../_helpers/file-uploader-custom';

@Component({
  selector: 'app-photo-upload',
  templateUrl: './photo-upload.component.html',
  styleUrls: ['./photo-upload.component.css']
})
export class PhotoUploadComponent implements OnInit {
  baseUrl = environment.URL;

  @Input() personId = 0;

  uploader: FileUploaderCustom;
  hasBaseDropZoneOver = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.initializeUploader();
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader() {
    const uploadUrl = `${this.baseUrl}api/photo/${this.personId}`;

    this.uploader = new FileUploaderCustom({
      url: uploadUrl,
      authToken: 'Bearer ' + this.authService.getLocalAuth().token,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });
  }

  // * Custom method upload all files with only 1 api call
  //    Instead of uploader.uploadAll() method (call api multiple times)
  uploadAllFiles() {
    this.uploader.uploadAllFiles();
  }
}
