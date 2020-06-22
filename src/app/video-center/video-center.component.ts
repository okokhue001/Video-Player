import { Component, OnInit } from '@angular/core';
import { Video } from '../video';
import { VideoService } from '../video.service';

@Component({
  selector: 'app-video-center',
  templateUrl: './video-center.component.html',
  styleUrls: ['./video-center.component.css'],
})
export class VideoCenterComponent implements OnInit {
  videos: Video[];

  selectedVideo: Video;
  public hidenewVideo: boolean = true;

  constructor(private _videoService: VideoService) {}

  // display details video on the browser when click 
  ngOnInit(): void {
    this._videoService
      .getVideos()
      .subscribe((videos) => (this.videos = videos));
  }

  // selected video to be displayed in the browser
  onSelectVideo(video: any) {
    this.selectedVideo = video;
    this.hidenewVideo = true;
    console.log(this.selectedVideo);
  }

  // add video in the database
  onSubmitAddVideo(video: Video) {
    this._videoService.addVideo(video).subscribe((video) => {
      this.videos.push(video);
      this.hidenewVideo = true;
    });
  }

  // update video in the database
  onUpdateVideoEvent(video: any) {
    this._videoService
      .updateVideo(video)
      .subscribe((resUpdatedVideo) => (video = resUpdatedVideo));
    this.selectedVideo = null;
  }

  // delete video in the data base
  onDeleteVideoEvent(video: Video){
    this.videos = this.videos.filter(V => V._id !== video._id)
    this._videoService.deleteVideo(video).subscribe();
    this.selectedVideo = null;
  }

  newVideo() {
    this.hidenewVideo = false;
  }
}
