export class DOM {
  static qid(id: string) {
    return document.getElementById(id);
  }

  static qs(selector: string, context: Element | Document = null) {
    if (!context) {
      context = document;
    }

    return context.querySelector(selector);
  }

  static qsa(selector: string, context: Element | Document = null) {
    if (!context) {
      context = document;
    }

    const elementList = context.querySelectorAll(selector);
    return Array.prototype.slice.call(elementList) as Element[];
  }

  static scrollToMiddle($element: Element) {
    const rect = $element.getBoundingClientRect();
    const top = rect.top + window.pageYOffset;
    const middle = top - (window.innerHeight / 2) + (rect.height / 2);
    window.scrollTo(0, middle);
  }
}
