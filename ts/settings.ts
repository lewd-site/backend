export interface CommonSettings {
  layout: 'center' | 'left';
}

export interface FormSettings {
  previewAlign: 'left' | 'right';

  showMarkup: boolean;
  showMarkupMobile: boolean;

  float: boolean;
  floatPosition: { x: number, y: number };
}

export interface TimeSettings {
  locale: 'default' | 'custom';
  localeCustom: string;

  zone: 'default' | 'fixed';
  zoneFixed: number;

  format: 'default' | 'custom';
  formatCustom: string;
}

export interface Settings {
  common: CommonSettings;
  form: FormSettings;
  time: TimeSettings;
}

const settingsKey = 'settings';
const defaultSettings: Settings = {
  common: {
    layout: 'center',
  },
  form: {
    previewAlign: 'left',

    showMarkup: true,
    showMarkupMobile: false,

    float: false,
    floatPosition: { x: 100, y: 100 },
  },
  time: {
    locale: 'default',
    localeCustom: '',

    zone: 'default',
    zoneFixed: 0,

    format: 'default',
    formatCustom: '',
  },
};

function isObject(item: any) {
  return (item && typeof item === 'object' && !Array.isArray(item));
}

function merge(target: any, source: any) {
  const output = Object.assign({}, target);
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          Object.assign(output, { [key]: source[key] });
        }
        else {
          output[key] = merge(target[key], source[key]);
        }
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  return output;
}

export class SettingsManager {
  static load(): Settings {
    const settings = JSON.parse(localStorage.getItem(settingsKey));
    return merge(defaultSettings, settings);
  }

  static save(settings: Settings) {
    const data = JSON.stringify(settings);
    localStorage.setItem(settingsKey, data);
  }
}
