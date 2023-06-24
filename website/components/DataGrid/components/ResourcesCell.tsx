import { TertiaryButton } from "src/components/Buttons/TertiaryButton";
import {
  getInterviewResourceDisplayName,
  getInterviewResourceIcon,
} from "src/components/InterviewResources/InterviewResources";
import { IInterviewResource } from "src/lib/hooks/useAddReviewModal";

interface IResourcesCell {
  resources: IInterviewResource[];
}

export const ResourcesCell = ({ resources }: IResourcesCell) => {
  return (
    <div>
      {resources.map(x => {
        return (
          <TertiaryButton
            startIcon={getInterviewResourceIcon(x.resourceType, true)}
            text={getInterviewResourceDisplayName(x.resourceType)(x.value)}
            onClick={() => window.open(x.value, "_ blank")}
          />
        );
      })}
    </div>
  );
};
