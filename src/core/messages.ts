import type { MotionReport } from './scanner';
import type { SiteRule } from './rules';

export type PopupStatus = {
  hostname: string;
  rule: SiteRule;
  report: MotionReport;
};

export type CalmMessage =
  | { type: 'CALM_SCROLL_STATUS' }
  | { type: 'CALM_SCROLL_APPLY'; rule: SiteRule };
