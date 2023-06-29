export enum JobFilters {
  appDocFilter = "Required Documents",
  durationFilter = "Duration",
  specialReqFilter = "Special Requirements",
}

export enum DurationFilterTags {
  fourMonth = "4 Month",
  eightMonthReq = "8 Month Required",
  eightMonthPref = "8 Month Preferred",
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
  const durationTags: string[] = [];
  if (duration.includes("4 month")) {
    durationTags.push(DurationFilterTags.fourMonth);
  }
  if (duration.includes("8 Month") || duration.includes("2 work term")) {
    if (duration.includes("preferred")) {
      durationTags.push(DurationFilterTags.eightMonthPref);
    } else {
      durationTags.push(DurationFilterTags.eightMonthReq);
    }
  }

  return durationTags;
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
