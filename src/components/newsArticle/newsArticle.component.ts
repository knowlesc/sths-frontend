import * as angular from 'angular';

export class NewsArticle {
  static moduleName = 'NewsArticle';
  static componentName = 'newsArticle';
  static componentOptions: ng.IComponentOptions = {
    bindings: {
      article: '<'
    },
    template: `
      <div class="news-article">
        <div class="news-article-title">
          <span ng-bind="$ctrl.article.title"></span>
        </div>
        <div class="news-article-author">
          <span ng-bind="$ctrl.article.creator"></span>
        </div>
        <div class="news-article-content">
          <span ng-bind-html="$ctrl.article.content"></span>
        </div>
        <div class="news-article-date">
          <a ng-href="{{ $ctrl.article.link }}">
            <span ng-bind="$ctrl.article.pubDate | toDate | date: 'MMM d, y'">
            <span class="glyphicon glyphicon-new-window">
          </span></a>
        </div>
      </div>
    `
  };
}

angular.module(NewsArticle.moduleName, [])
  .component(NewsArticle.componentName, NewsArticle.componentOptions);
