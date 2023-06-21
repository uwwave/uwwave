import styled from "styled-components";
import { useState } from "react";
import { Select } from "src/components/Select/Select";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Center } from "src/components/Center/Center";
import { TertiaryButton } from "src/components/Buttons/TertiaryButton";
import { Spacer } from "src/components/Spacer/Spacer";
import { LeetcodeIcon } from "src/components/icons/LeetcodeIcon";
import {
  leetcodeNameFromURL,
  validateLeetCodeUrl,
} from "src/lib/interviewResource/interviewResource";

enum InterviewResourceType {
  LEETCODE = "Leetcode",
}

interface IInterviewResource {
  type: InterviewResourceType;
  value: string;
}

interface IInterviewResourceDisplay extends IInterviewResource {
  isEditMode: boolean;
}

const getInterviewResourceIcon = (
  resource: InterviewResourceType,
  dark?: boolean
): React.ReactNode => {
  switch (resource) {
    default:
      return <LeetcodeIcon dark={dark} />;
  }
};

const getInterviewResourceValidator = (
  resource: InterviewResourceType
): ((value: string) => boolean) => {
  switch (resource) {
    default:
      return validateLeetCodeUrl;
  }
};

const getInterviewResourceDisplayName = (
  resource: InterviewResourceType
): ((value: string) => string) => {
  switch (resource) {
    default:
      return leetcodeNameFromURL;
  }
};

export const InterviewResources = () => {
  const [interviewResources, setInterviewResources] = useState<
    IInterviewResourceDisplay[]
  >([
    {
      type: InterviewResourceType.LEETCODE,
      value: "",
      isEditMode: true,
    },
  ]);

  const editResource = (
    i: number,
    resource: IInterviewResourceDisplay,
    type?: InterviewResourceType,
    value?: string,
    editMode?: boolean
  ) => {
    setInterviewResources(
      interviewResources.map((x, j) => {
        if (i !== j) {
          return x;
        }
        return {
          type: type ?? resource.type,
          value: value ?? resource.value,
          isEditMode: editMode ?? resource.isEditMode,
        };
      })
    );
  };

  const deleteResource = (i: number) => {
    setInterviewResources(interviewResources.filter((_, j) => i !== j));
  };

  const renderDisplayMode = (
    i: number,
    resource: IInterviewResourceDisplay
  ) => (
    <ResourceWrapper key={i}>
      {getInterviewResourceIcon(resource.type)}
      <ResourceValue>
        {getInterviewResourceDisplayName(resource.type)(resource.value)}
      </ResourceValue>
      <IconButton
        onClick={() => {
          editResource(i, resource, undefined, undefined, true);
        }}
      >
        <StyledEditIcon />
      </IconButton>
      <IconButton
        onClick={() => {
          deleteResource(i);
        }}
      >
        <StyledDeleteIcon />
      </IconButton>
    </ResourceWrapper>
  );
  const renderEditMode = (i: number, resource: IInterviewResourceDisplay) => {
    return (
      <ResourceWrapper key={i}>
        <Select
          size="small"
          value={resource.type}
          onChange={(e: any) => {
            editResource(i, resource, e.target.value, undefined, undefined);
          }}
        >
          {Object.values(InterviewResourceType).map(item => (
            <MenuItem value={item} key={item}>
              <Center gap={8}>
                {getInterviewResourceIcon(resource.type, true)}
                {item.split("_").join(" ")}
              </Center>
            </MenuItem>
          ))}
        </Select>
        <StyledTextField
          placeholder="URL"
          variant="outlined"
          size="small"
          value={resource.value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            editResource(i, resource, undefined, e.target.value, undefined);
          }}
          error={!getInterviewResourceValidator(resource.type)(resource.value)}
        />
        <IconButton
          onClick={() => {
            if (!resource.value) {
              deleteResource(i);
            }
            if (!getInterviewResourceValidator(resource.type)(resource.value)) {
              return;
            }
            setInterviewResources(
              interviewResources.map((resource, j) => {
                if (i !== j) {
                  return resource;
                }
                return {
                  type: resource.type,
                  value: resource.value,
                  isEditMode: false,
                };
              })
            );
          }}
        >
          <StyledCheckIcon />
        </IconButton>
      </ResourceWrapper>
    );
  };

  const renderAddButton = () => (
    <TertiaryButton
      text="+ Add More"
      underline
      white
      onClick={() => {
        setInterviewResources([
          ...interviewResources,
          {
            type: InterviewResourceType.LEETCODE,
            value: "",
            isEditMode: true,
          },
        ]);
      }}
    />
  );
  return (
    <div>
      {interviewResources.map((x, i) => (
        <>
          {x.isEditMode ? renderEditMode(i, x) : renderDisplayMode(i, x)}
          <Spacer height={4} />
        </>
      ))}
      <Spacer height={8} />
      <Center>
        {interviewResources.length < 5 ? renderAddButton() : null}
      </Center>
    </div>
  );
};

const ResourceWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const StyledCheckIcon = styled(CheckIcon)`
  && {
    color: white;
  }
`;

const StyledTextField = styled(TextField)`
  && {
    background-color: white;
    border-radius: 4px;
  }
`;

const StyledEditIcon = styled(EditIcon)`
  && {
    color: white;
  }
`;

const StyledDeleteIcon = styled(DeleteIcon)`
  && {
    color: white;
  }
`;

const ResourceValue = styled(Typography).attrs({
  color: "white",
})`
  && {
    flex: 1;
    line-height: 1rem;
  }
`;
