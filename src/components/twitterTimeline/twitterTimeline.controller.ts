export class TwitterTimelineController implements ng.IComponentController {
  $onInit() {
    // Twitter widget must be reloaded if the view changes and the component is re-created
    // tslint:disable-next-line:no-any
    const w = (window as any);
    if (w && w.twttr && w.twttr.widgets) {
      w.twttr.widgets.load();
    }
  }
}
