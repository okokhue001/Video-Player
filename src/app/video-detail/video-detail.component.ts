import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Video } from '../video';

@Component({
  selector: 'video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.css'],
})
export class VideoDetailComponent implements OnInit {
  @Input() video: Video;
  @Output() updateVideoEvent = new EventEmitter<Video>();
  @Output() deleteVideoEvent = new EventEmitter<Video>();

  public editTitle: boolean = false;
  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(){
    this.editTitle = false;
  }

  onTitleClick(){
    this.editTitle = true;
  }

  //updates video in the browser
  updateVideo(){
    this.updateVideoEvent.emit(this.video);
  }

 // delete video in the browser
  deleteVideo(){
    this.deleteVideoEvent.emit(this.video);
  }
}
