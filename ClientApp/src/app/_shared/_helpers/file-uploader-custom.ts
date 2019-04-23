import { FileItem, FileUploader, FileUploaderOptions } from 'ng2-file-upload';

export class FileUploaderCustom extends FileUploader {
  constructor(options: FileUploaderOptions) {
    super(options);
  }

  //   * This custom method upload all files with only 1 api call
  uploadAllFiles(): void {
    const xhr = new XMLHttpRequest();
    const sendable = new FormData();
    const fakeItem: FileItem = null;
    this.onBuildItemForm(fakeItem, sendable);

    for (const item of this.queue) {
      item.isReady = true;
      item.isUploading = true;
      item.isUploaded = false;
      item.isSuccess = false;
      item.isCancel = false;
      item.isError = false;
      // item.progress = 0;

      if (typeof item._file.size !== 'number') {
        throw new TypeError('The file specified is no longer valid');
      }
      sendable.append('files', item._file, item.file.name);
    }

    if (this.options.additionalParameter !== undefined) {
      Object.keys(this.options.additionalParameter).forEach(key => {
        sendable.append(key, this.options.additionalParameter[key]);
      });
    }

    xhr.onload = () => {
      const gist = (xhr.status >= 200 && xhr.status < 300) || xhr.status === 304 ? 'Success' : 'Error';
      const method = 'on' + gist + 'Item';
      this[method](fakeItem, null, xhr.status, null);
    };

    xhr.onerror = () => {
      this.onErrorItem(fakeItem, null, xhr.status, null);
    };

    xhr.onabort = () => {
      this.onErrorItem(fakeItem, null, xhr.status, null);
    };

    xhr.open('POST', this.options.url, true);
    xhr.withCredentials = true;

    if (this.options.headers) {
      for (let i = 0, a = this.options.headers; i < a.length; i++) {
        const header = a[i];
        xhr.setRequestHeader(header.name, header.value);
      }
    }

    if (this.authToken) {
      xhr.setRequestHeader(this.authTokenHeader, this.authToken);
    }

    xhr.send(sendable);
  }
}
