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

function hasMeaningfulDuration(value: string): boolean {
  return value.split(',').some((part) => {
    const duration = Number.parseFloat(part);
    if (!Number.isFinite(duration)) return false;
    return part.trim().endsWith('ms') ? duration >= 10 : duration >= 0.01;
  });
}

export function scanDocument(doc: Document = document, root: ParentNode = doc.body): MotionReport {
  if (!doc.documentElement) return { ...EMPTY_REPORT };

  const report = { ...EMPTY_REPORT };
  const rootStyle = getComputedStyle(doc.documentElement);
  report.smoothScroll = rootStyle.scrollBehavior === 'smooth';

  const elements = Array.from(root.querySelectorAll<HTMLElement>('*'));
  for (const element of elements) {
    if (element.closest('[data-calm-scroll-ui]')) continue;
    const style = getComputedStyle(element);
    if (!isVisible(element, style)) continue;

    if (element instanceof HTMLMediaElement && (element.autoplay || (!element.paused && !element.ended))) {
      report.autoplayMedia += 1;
    }
    if ((style.animationName && style.animationName !== 'none') || hasMeaningfulDuration(style.animationDuration) || hasMeaningfulDuration(style.transitionDuration)) {
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
