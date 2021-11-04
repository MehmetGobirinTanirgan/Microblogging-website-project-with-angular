import { Component, OnInit } from '@angular/core';
import { TweetDisplayDTO } from 'src/dtos/TweetDisplayDTO';
import { AuthenticationService } from 'src/services/authentication.service';
import { DataService } from 'src/services/data.service';
import { TweetService } from 'src/services/tweet.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [TweetService],
})
export class HomeComponent implements OnInit {
  constructor(private tweetService: TweetService, private authService: AuthenticationService, private dataService: DataService) {}

  tweets: Array<TweetDisplayDTO> | null = null;
  loadingFlag: boolean = false;
  followFlag: boolean | null;

  ngOnInit(): void {
    this.getAllRelationalTweets();

    this.dataService.getFollowUsername().subscribe((username) => {
      this.tweets?.forEach((tweet) => {
        if (tweet.username == username) {
          this.getAllRelationalTweets();
        }
      });
    });

    this.dataService.getNewReplyTweet().subscribe((newReplyTweet) => {
      if (newReplyTweet != null) {
        this.tweets?.unshift(newReplyTweet);
      }
    });
  }

  getAllRelationalTweets() {
    const username = this.authService.getAuthenticatedUserInfos()?.username;
    if (username) {
      this.tweetService.getAllRelationalTweets(username).subscribe(
        (data) => {
          this.tweets = data;
          this.loadingFlag = true;
        },
        (error) => alert('Error: Cant load tweets')
      );
    } else {
      alert('Local storage error');
    }
  }

  addNewTweet(tweet: TweetDisplayDTO) {
    if (this.tweets == null) {
      this.tweets = new Array<TweetDisplayDTO>();
    }
    this.tweets.unshift(tweet);
  }
}
