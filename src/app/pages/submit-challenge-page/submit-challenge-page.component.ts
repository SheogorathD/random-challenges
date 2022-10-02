import { Component, OnInit } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import { FormControl, FormGroup } from '@angular/forms';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-submit-challenge-page',
  templateUrl: './submit-challenge-page.component.html',
  styleUrls: ['./submit-challenge-page.component.scss'],
})
export class SubmitChallengePageComponent implements OnInit {
  noUser = true;
  uid = '';
  valid = false;
  err: any;
  submited = false;

  challengeGroup = new FormGroup({
    challengeName: new FormControl(''),
    devStack: new FormControl(''),
    timeToComplete: new FormControl(''),
    gitHub: new FormControl(''),
    summary: new FormControl(''),
  });

  constructor(public firestoreService: FirestoreService) {}

  isGitHubUrl() {
    if (
      this.challengeGroup.valid &&
      this.challengeGroup.value.gitHub?.includes('github.com')
    ) {
      this.valid = true;
    } else {
      this.valid = false;
    }
    console.log('asdasd');
  }

  onSubmit() {
    const challenge = {
      challengeName: this.challengeGroup.value.challengeName || '',
      devStack: this.challengeGroup.value.devStack || '',
      timeToComplete: this.challengeGroup.value.timeToComplete || '',
      gitHubURL: this.challengeGroup.value.gitHub || '',
      summary: this.challengeGroup.value.summary || '',
      submitedBy: this.uid,
    };

    try {
      this.firestoreService.submitChallenge(challenge);
    } catch (err) {
      this.err = err;
    } finally {
      this.submited = true;
      setTimeout(() => {
        this.submited = false;
      }, 2000);
      this.challengeGroup.reset();
    }
  }

  ngOnInit(): void {
    if (getAuth().currentUser) {
      this.noUser = false;
      this.uid = getAuth().currentUser?.uid || '';
    } else {
      this.noUser = true;
    }
  }
}
