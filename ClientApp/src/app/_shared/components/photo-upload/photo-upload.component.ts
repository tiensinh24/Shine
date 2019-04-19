import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { environment } from 'src/environments/environment';
import { PhotoService } from 'src/app/photo/_services/photo.service';
import { Photo } from 'src/app/photo/_interfaces/photo';

@Component({
  selector: 'app-photo-upload',
  templateUrl: './photo-upload.component.html',
  styleUrls: ['./photo-upload.component.css']
})
export class PhotoUploadComponent implements OnInit {
  baseUrl = environment.URL;

  formGroup: FormGroup;
  error: string;
  photoRes: Photo;
  progressRes = { status: '', message: 0 };

  @Input() personId: number;

  constructor(private fb: FormBuilder, private photoService: PhotoService) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.formGroup = this.fb.group({
      file: [''],
      description: [''],
      isMain: [false]
    });
  }

  getFormData(formData: FormData) {
    formData.append('file', this.formGroup.get('file').value);
    formData.append('description', this.formGroup.get('description').value);
    formData.append('isMain', this.formGroup.get('isMain').value);
    formData.append('personId', this.personId.toString());
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.formGroup.get('file').setValue(file);
    }
  }

  onSubmit() {
    const formData = new FormData();

    this.getFormData(formData);

    this.photoService.upload(formData).subscribe(
      res => {
        this.photoRes = res;
        this.progressRes = res;
      },
      err => {
        this.error = err;
      }
    );
  }
}
