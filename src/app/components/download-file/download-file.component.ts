import { Component, OnInit, Input } from '@angular/core'
import { FileService } from '../../services/file.service'
import { saveAs } from 'file-saver'

@Component({
  selector: 'app-download-file',
  templateUrl: './download-file.component.html',
  styleUrls: ['./download-file.component.css'],
})
export class DownloadFileComponent implements OnInit {

  constructor(private fileService: FileService) {}

  @Input() public fileUrl!: string;
  @Input() public fileName!: string;
  ngOnInit(): void {}

  returnBlob(res: any): Blob {
    console.log('file downloaded')
    return new Blob([res], { type: 'application/octet-stream' })
  }

  download() {
    this.fileService.downloadFile(this.fileUrl).subscribe((res) => {
      if (res) {
        console.log(res);
        saveAs(this.returnBlob(res), this.fileName);
      }
    })
  }
}
