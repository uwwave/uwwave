export enum JobFilters {
  appDocFilter = "Documents Required",
  durationFilter = "Work Term Duration",
  specialReqFilter = "Special Requirements",
}

export enum durationFilterTags {
  fourMonth = "4 Month",
  eightMonthReq = "8 Month Required",
  eightMonthPref = "8 Month Preferred",
}

export enum appDocFilterTags {
  // coopWorkHistory = "Co-op Work History",
  // resume = "Resume",
  // gradeReport = "Grade Report",
  coverLetter = "Cover Letter",
  other = "Other - per job posting",
}

export enum specialReqFilterTags {
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
    durationTags.push(durationFilterTags.fourMonth);
  }
  if (duration.includes("8 Month") || duration.includes("2 work term")) {
    if (duration.includes("preferred")) {
      durationTags.push(durationFilterTags.eightMonthPref);
    } else {
      durationTags.push(durationFilterTags.eightMonthReq);
    }
  }

  return durationTags;
};

export const appDocsTextToFilterTag: Record<string, string> = {
  // "University of Waterloo Co-op Work History": "Co-op Work History",
  // "Resume": "Resume",
  // "Grade Report": "Grade Report",
  "Cover Letter": "Cover Letter",
  "Other": "Other - per job posting",
};

export const specialReqsTextToFilterTag: Record<string, string> = {
  "swpp": "Canada SWPP",
  "fully vaccinated": "Fully Vaccinated",
  "eligible to work in the usa": "USA Work Eligibility",
  "usa visa": "USA Work Eligibility",
  "this job requires you to work remotely from canada": "Remote From Canada",
  "security clearance": "Security Clearance",
  "driver's license": "Driver's License",
  "drivers license": "Driver's License",
  "external application": "External Application",
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
