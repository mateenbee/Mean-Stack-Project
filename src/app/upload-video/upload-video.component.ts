import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-video',
  standalone: true,
  imports: [],
  templateUrl: './upload-video.component.html',
  styleUrl: './upload-video.component.css',
})
export class UploadVideoComponent implements OnInit {
  selectedFile: File | null = null;
  constructor(private http: HttpClient) {}
  ngOnInit(): void {}
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  async uploadVideo() {
    if (!this.selectedFile) {
      alert('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('video', this.selectedFile);

    try {
      await this.http.post('http://localhost:8000/uploadVideo', formData).toPromise();
      alert('Video uploaded successfully!');
    } catch (error) {
      console.error('Error uploading video:', error);
      alert('An error occurred while uploading the video.');
    }
  }
}
