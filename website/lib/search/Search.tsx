import BusinessIcon from "@mui/icons-material/Business";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotesIcon from "@mui/icons-material/Notes";
import HandshakeIcon from "@mui/icons-material/Handshake";
import StarBorderPurple500Icon from "@mui/icons-material/StarBorderPurple500";
// import FactoryIcon from '@mui/icons-material/Factory'
import SearchIcon from "@mui/icons-material/Search";

// TODO: Replace Industry with Keywords(?)
export enum SearchTypes {
  "All" = 0,
  "JobTitle",
  "CompanyName",
  "JobSummary",
  "JobResponsibilities",
  "RequiredSkills",
  // 'Industry',
}

export const getSearchTypeName = (type: SearchTypes) => {
  switch (type) {
    case SearchTypes.JobTitle:
      return "Job Title";
    case SearchTypes.CompanyName:
      return "Company Name";
    case SearchTypes.JobSummary:
      return "Job Summary";
    case SearchTypes.JobResponsibilities:
      return "Responsibilities";
    case SearchTypes.RequiredSkills:
      return "Skills";
    // case SearchTypes.Industry:
    //  return 'Industry'
    default:
      return "All";
  }
};

export const getSearchTypeField = (type: SearchTypes) => {
  switch (type) {
    case SearchTypes.JobTitle:
      return "jobName";
    case SearchTypes.CompanyName:
      return "companyName";
    case SearchTypes.JobSummary:
      return "jobSummary";
    case SearchTypes.JobResponsibilities:
      return "jobResponsibilities";
    case SearchTypes.RequiredSkills:
      return "requiredSkills";
    // case SearchTypes.Industry:
    //  return 'industryTag'
    default:
      return "";
  }
};

export const getSearchTypeIcon = (type: SearchTypes, isActive: boolean) => {
  switch (type) {
    case SearchTypes.JobTitle:
      return (
        <AccountCircleIcon
          style={{ color: "black", ...(isActive && { color: "white" }) }}
        />
      );
    case SearchTypes.CompanyName:
      return (
        <BusinessIcon
          style={{ color: "black", ...(isActive && { color: "white" }) }}
        />
      );
    case SearchTypes.JobSummary:
      return (
        <NotesIcon
          style={{ color: "black", ...(isActive && { color: "white" }) }}
        />
      );
    case SearchTypes.JobResponsibilities:
      return (
        <HandshakeIcon
          style={{ color: "black", ...(isActive && { color: "white" }) }}
        />
      );
    case SearchTypes.RequiredSkills:
      return (
        <StarBorderPurple500Icon
          style={{ color: "black", ...(isActive && { color: "white" }) }}
        />
      );
    // case SearchTypes.Industry:
    //  return <FactoryIcon />
    default:
      return (
        <SearchIcon
          style={{ color: "black", ...(isActive && { color: "white" }) }}
        />
      );
  }
};
