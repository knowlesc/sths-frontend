import * as angular from 'angular';
import { TwitterTimelineController } from './twitterTimeline.controller';

export class TwitterTimeline {
  static moduleName = 'TwitterTimeline';
  static componentName = 'twitterTimeline';
  static componentOptions: ng.IComponentOptions = {
    bindings: {},
    controller: TwitterTimelineController,
    template: `
      <div class="twitter-panel">
        <a class="twitter-timeline"
          data-dnt="true"
          data-theme="light"
          data-link-color="#2B7BB9"
          data-tweet-limit="5"
          href="https://twitter.com/BaryGettmanSHL">
            <div class="loader-overlay">
              <div class="loader-inner line-scale">
                <div></div><div></div><div></div><div></div><div></div>
              </div>
            </div>
          </a>
      </div>
    `
  };
}

angular.module(TwitterTimeline.moduleName, [])
  .component(TwitterTimeline.componentName, TwitterTimeline.componentOptions);
