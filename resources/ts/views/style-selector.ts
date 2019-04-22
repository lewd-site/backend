import { View } from '.';
import { StyleSelector } from '../model';
import { DOM } from '../utils';

declare global {
  interface Window {
    dataLayer?: any;
  }
}

export class StyleSelectorView implements View {
  readonly styles: { [key: string]: string } = {};
  readonly model: StyleSelector;

  constructor(readonly $selector: HTMLSelectElement) {
    // Parse selectable styles.
    const $styles = DOM.qsa('link[title]') as HTMLElement[];
    this.styles = $styles
      .map($style => {
        return {
          title: $style.title,
          url: $style.getAttribute('href'),
        };
      })
      .reduce((styles, current) => {
        styles[current.title] = current.url;
        return styles;
      }, this.styles);

    // Remove styles which is not selected.
    $styles.forEach($style => {
      if (!$style.hasAttribute('data-selected')) {
        $style.remove();
      }
    });

    // Populate style selector.
    const styles = Object.keys(this.styles);
    for (let i = 0; i < styles.length; ++i) {
      const title = styles[i];
      const $option = document.createElement('option');
      $option.value = title;
      $option.textContent = title;
      $selector.appendChild($option);
    }

    this.model = new StyleSelector();
    this.bindModel();
  }

  protected onStyleChanged(style: string) {
    const $selected = DOM.qs('link[data-selected]') as HTMLElement;
    if ($selected) {
      // If style already selected, do nothing.
      if ($selected.title === style) {
        return;
      }

      // Remove previously selected style.
      $selected.remove();
    }

    // Set currently selected style.
    const url = this.styles[style];
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = url;
    link.setAttribute('data-selected', 'true');
    document.head.appendChild(link);

    window.dataLayer.push({ 'theme': style });
  }

  protected bindModel() {
    this.$selector.addEventListener('change', () => {
      this.model.style = this.$selector.value;
    });

    this.model.on('style-changed', this.onStyleChanged.bind(this));
  }
}