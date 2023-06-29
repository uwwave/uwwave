export enum JobFilters {
  appDocFilter = "Required Documents",
  durationFilter = "Duration",
  specialReqFilter = "Special Requirements",
}

export enum DurationFilterTags {
  fourMonth = "4 month",
  eightMonthReq = "8 month required",
  eightMonthPref = "8 month preferred",
}

export enum AppDocFilterTags {
  // coopWorkHistory = "Co-op Work History",
  // resume = "Resume",
  // gradeReport = "Grade Report",
  coverLetter = "Cover Letter",
  other = "Other",
}

export enum SpecialReqFilterTags {
  swpp = "Canada SWPP",
  fullyVaccinated = "Fully Vaccinated",
  usaWorkEligibility = "USA Work Eligibility",
  remoteFromCanada = "Remote From Canada",
  securityClearance = "Security Clearance",
  driversLicense = "Driver's License",
  externalApplication = "External Application",
}

export type JobFilterTags = {
  [key in JobFilters]: string[];
};

export const durationToFilterTags = (duration: string): string[] => {
  duration = duration.toLowerCase();
  let durationTag: string;
  if (duration.includes("8 month") || duration.includes("2 work term")) {
    if (duration.includes("preferred")) {
      durationTag = DurationFilterTags.eightMonthPref;
    } else {
      durationTag = DurationFilterTags.eightMonthReq;
    }
  } else {
    durationTag = DurationFilterTags.fourMonth;
  }

  return [durationTag];
};

export const appDocsTextToFilterTag: Record<string, string> = {
  // "University of Waterloo Co-op Work History": "Co-op Work History",
  // "Resume": "Resume",
  // "Grade Report": "Grade Report",
  "cover letter": AppDocFilterTags.coverLetter,
  "other": AppDocFilterTags.other,
};

export const specialReqsTextToFilterTag: Record<string, string> = {
  "swpp": SpecialReqFilterTags.swpp,
  "fully vaccinated": SpecialReqFilterTags.fullyVaccinated,
  "eligible to work in the usa": SpecialReqFilterTags.usaWorkEligibility,
  "usa visa": SpecialReqFilterTags.usaWorkEligibility,
  "this job requires you to work remotely from canada":
    SpecialReqFilterTags.remoteFromCanada,
  "security clearance": SpecialReqFilterTags.securityClearance,
  "driver's license": SpecialReqFilterTags.driversLicense,
  "drivers license": SpecialReqFilterTags.driversLicense,
  // external app calculated in `buildCoopJobsFilterTagsFromExtensionData`
};

export function lookupFilterTags(
  text: string,
  mapping: Record<string, string>
) {
  const tags: string[] = [];
  // normalize to deal with resume accents
  text = text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
  Object.keys(mapping).forEach(lookup => {
    if (text.includes(lookup.toLowerCase())) {
      tags.push(mapping[lookup]);
    }
  });
  return Array.from(new Set(tags));
}
