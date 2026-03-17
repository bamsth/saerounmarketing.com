// GA4 이벤트 헬퍼 유틸리티

declare global {
  interface Window {
    gtag?: (
      command: "event" | "config" | "js",
      targetOrName: string | Date,
      params?: Record<string, unknown>
    ) => void;
  }
}

function safeGtag(
  command: "event" | "config" | "js",
  targetOrName: string | Date,
  params?: Record<string, unknown>
) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag(command, targetOrName, params);
  }
}

export function trackEvent(name: string, params?: Record<string, unknown>) {
  safeGtag("event", name, params);
}

export function trackGenerateLead(hospitalName?: string) {
  safeGtag("event", "generate_lead", {
    currency: "KRW",
    value: 1,
    ...(hospitalName && { hospital_name: hospitalName }),
  });
}

export function trackCtaClick(location: string) {
  safeGtag("event", "cta_click", {
    cta_location: location,
  });
}

export function trackFormStart() {
  safeGtag("event", "form_start", {
    form_name: "consultation",
  });
}

export function trackScrollDepth(section: string) {
  safeGtag("event", "scroll_depth", {
    section_name: section,
  });
}
