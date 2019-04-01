import { eventBus, Events } from '.';
import {
  Captcha,
  CorrectTime,
  DeleteForm,
  Post,
  PostingForm,
  PostReferenceMap,
  Settings,
  StyleSwitch,
  ThreadUpdater,
  Tools,
} from './components';
import { SettingsManager } from './settings';
import { DOM } from './utils';

declare global {
  interface Window {
    baseUrl: string;
  }
}

new Captcha();
new CorrectTime();
new DeleteForm();
new Post();
new PostingForm();
new PostReferenceMap();
new Settings();
new StyleSwitch();
new Tools();

const settings = SettingsManager.load();
if (settings.common.enableThreadAutoupdate) {
  new ThreadUpdater();
}

document.addEventListener('DOMContentLoaded', e => {
  eventBus.$emit(Events.Ready);

  const posts = DOM.qsa('.post');
  eventBus.$emit(Events.PostsInserted, posts, true);

  if (settings.common.smoothScroll) {
    document.body.classList.add('smooth-scroll');
  }

  const layout = DOM.qs('.layout');
  if (layout) {
    layout.classList.add('layout--' + settings.common.layout);

    if (!settings.common.showPostHeaderReflinkIcon) {
      layout.classList.add('layout--hide-post-header-reflink-icon');
    }

    if (!settings.common.showPostReflinkIcon) {
      layout.classList.add('layout--hide-post-reflink-icon');
    }

    if (settings.common.showVideoOverlay) {
      layout.classList.add('layout--show-thumb-overlay');
    }

    if (settings.common.nsfw) {
      layout.classList.add('layout--nsfw');
    }

    if (settings.common.removeHiddenPosts) {
      layout.classList.add('layout--remove-hidden');
    }
  }

  const formWrapper = DOM.qs('.content__posting-form-wrapper');
  if (formWrapper) {
    formWrapper.classList.add('content__posting-form-wrapper--' + settings.form.align);
  }
});
