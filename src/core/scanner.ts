export type MotionReport = {
  autoplayMedia: number;
  animatedElements: number;
  transformedElements: number;
  stickyLayers: number;
  smoothScroll: boolean;
};

export const EMPTY_REPORT: MotionReport = {
  autoplayMedia: 0,
  animatedElements: 0,
  transformedElements: 0,
  stickyLayers: 0,
  smoothScroll: false
};

function isVisible(element: Element, style: CSSStyleDeclaration): boolean {
  return style.display !== 'none' && style.visibility !== 'hidden' && !element.hasAttribute('hidden');
}

export function scanDocument(doc: Document = document): MotionReport {
  if (!doc.documentElement) return { ...EMPTY_REPORT };

  const report = { ...EMPTY_REPORT };
  const rootStyle = getComputedStyle(doc.documentElement);
  report.smoothScroll = rootStyle.scrollBehavior === 'smooth';

  const elements = Array.from(doc.querySelectorAll<HTMLElement>('body *'));
  for (const element of elements) {
    if (element.closest('[data-calm-scroll-ui]')) continue;
    const style = getComputedStyle(element);
    if (!isVisible(element, style)) continue;

    if (element instanceof HTMLMediaElement && (element.autoplay || (!element.paused && !element.ended))) {
      report.autoplayMedia += 1;
    }
    if ((style.animationName && style.animationName !== 'none') || parseFloat(style.animationDuration) > 0 || parseFloat(style.transitionDuration) > 0) {
      report.animatedElements += 1;
    }
    if (style.transform && style.transform !== 'none') report.transformedElements += 1;
    if (style.position === 'fixed' || style.position === 'sticky') report.stickyLayers += 1;
  }
  return report;
}

export function totalMotion(report: MotionReport): number {
  return report.autoplayMedia + report.animatedElements + report.transformedElements + report.stickyLayers + Number(report.smoothScroll);
}
