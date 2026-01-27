import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-root',
  template: `
    <h1>.NET says: {{ dotnetMessage }}</h1>
    <h1>Node says: {{ nodeMessage }}</h1>
  `,
  styleUrl: './app.css'
})
export class App implements OnInit {
  dotnetMessage = '';
  nodeMessage = '';

  constructor(private apollo: Apollo, private cdr: ChangeDetectorRef) {}

  ngOnInit() {

    this.apollo.watchQuery<any>({
      query: gql`query { hello }`
    })
    .valueChanges
    .subscribe(result => {
      console.log('Apollo result:', result);
      this.dotnetMessage = result.data?.hello || '';
      this.cdr.detectChanges();
    });

    this.apollo.use('nodeClient')
      .watchQuery<any>({
        query: gql`query { hello }`
      })
      .valueChanges
      .subscribe(result => {
        console.log('Apollo result:', result)
        this.nodeMessage = result.data?.hello || '';
        this.cdr.detectChanges();
      });
  }
}
