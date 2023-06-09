import { useTaggedJobsPage } from "src/lib/hooks/usedTaggedJobsPage";
import { PageWrapper } from "src/components/PageWrapper/PageWrapper";
import { ITab, Tabs } from "src/components/Tabs/Tabs";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import EditIcon from "@mui/icons-material/Edit";
import { EditTagModal } from "src/components/Modals/variants/EditTagModal";
import { JobsDataGrid } from "src/components/DataGrid/JobsDataGrid";
import { Spacer } from "src/components/Spacer/Spacer";
import styled from "styled-components";
import Typography from "@mui/material/Typography";
import {
  PrimaryButton,
  PrimaryButtonWithClientLink,
} from "src/components/Buttons/PrimaryButton";
import { TagChip } from "src/components/Tags/Chips/TagChip";
import DeleteIcon from "@mui/icons-material/Delete";
import { JobsListPageHeader } from "src/components/Headers/variants/JobsListPageHeader";
import Paper from "@mui/material/Paper";
import { BackgroundColor } from "src/styles/color";
import Skeleton from "@mui/material/Skeleton";

const TaggedJobsPage = () => {
  const {
    isLoading: isLoadingState,
    differentCountries,
    currentTabIndex,
    setCurrentTabIndex,
    tagsInUse,
    allTags,
    setEditTag,
    displayJobs,
    tagsNotInUse,
    onDeleteTag,
    deleteAllUnusedTags,
    jobKeywords,
    totalTaggedJobs,
    earliestDeadline,
    logos,
    tagToJobsCount,
  } = useTaggedJobsPage();
  const isLoading = isLoadingState || !logos;
  const renderHeader = () => {
    return (
      <JobsListPageHeader
        numJobs={totalTaggedJobs}
        earliestDeadline={earliestDeadline}
        differentCountries={differentCountries}
        isLoading={isLoading}
      />
    );
  };

  const tabs: ITab[] = tagsInUse.map(tag => {
    const count = tagToJobsCount[tag];
    return {
      label: `${tag}${count ? ` (${count})` : ""}`,
      color: allTags[tag].color,
      selectedIcon: <BookmarkIcon />,
      editIcon: <EditIcon />,
      onEditClick: () => {
        setEditTag(tag);
      },
    };
  });

  const renderNoTaggedJobs = () => (
    <>
      <Typography color="white" align="center">
        You have no tagged jobs! You can tag jobs on the "Jobs List" page and
        they will show up here
      </Typography>
      <Spacer height={32} />
      <Center>
        <PrimaryButtonWithClientLink href={"/jobs"}>
          Open Jobs List
        </PrimaryButtonWithClientLink>
      </Center>
      <Spacer height={64} />
    </>
  );

  const renderLoadingTabs = () => (
    <LoadingTabsWrapper>
      <Skeleton
        variant="rounded"
        width={150}
        height={56}
        sx={{ bgcolor: BackgroundColor.darker }}
      />
      <Skeleton
        variant="rounded"
        width={150}
        height={56}
        sx={{ bgcolor: BackgroundColor.darker }}
      />
      <Skeleton
        variant="rounded"
        width={150}
        height={56}
        sx={{ bgcolor: BackgroundColor.darker }}
      />
    </LoadingTabsWrapper>
  );

  const renderUnusedTags = () => {
    return (
      <>
        <Spacer height={16} />
        <PaperWrapper>
          <UnusedHeader>
            <Typography color="white" variant="h5">
              Unused Tags
            </Typography>
            <PrimaryButton onClick={deleteAllUnusedTags}>
              <DeleteIcon />
              Delete all
            </PrimaryButton>
          </UnusedHeader>
          <Spacer height={32} />
          <UnuseTagsWrapper>
            {tagsNotInUse.map(tagKey => {
              const tag = allTags[tagKey];
              if (!tag) {
                return null;
              }
              return (
                <TagChip
                  tag={{ label: tagKey, ...tag }}
                  onDelete={() => {
                    onDeleteTag(tagKey);
                  }}
                />
              );
            })}
          </UnuseTagsWrapper>
        </PaperWrapper>
      </>
    );
  };

  const renderBody = () => {
    return (
      <>
        <EditTagModal />
        {!isLoading ? (
          <Tabs
            tabs={tabs}
            currentTab={currentTabIndex}
            onSelectTab={(i: number) => {
              setCurrentTabIndex(i);
            }}
          />
        ) : (
          renderLoadingTabs()
        )}

        {!isLoading && tagsInUse.length ? (
          <>
            <Spacer height={16} />
            <JobsDataGrid
              jobs={displayJobs}
              loading={isLoading}
              jobKeywords={jobKeywords}
              companyLogos={logos}
            />
          </>
        ) : null}
        {isLoading ? (
          <>
            <Spacer height={16} />
            <Skeleton
              variant="rounded"
              width={"100%"}
              height={500}
              sx={{ bgcolor: BackgroundColor.darker }}
            />
            <Spacer height={16} />
            <Skeleton
              variant="rounded"
              width={"100%"}
              height={200}
              sx={{ bgcolor: BackgroundColor.darker }}
            />
          </>
        ) : null}
        {!isLoading && tagsInUse.length < 1 ? renderNoTaggedJobs() : null}
        {tagsNotInUse.length ? renderUnusedTags() : null}
      </>
    );
  };

  return (
    <PageWrapper
      HeaderComponents={[
        <Typography variant="h3" align="center">
          <b>Tagged Jobs</b>
        </Typography>,
        renderHeader(),
      ]}
      Body={renderBody()}
      lighterBackground
    />
  );
};

const Center = styled.div`
  display: flex;
  justify-content: center;
`;

const UnusedHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const UnuseTagsWrapper = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const PaperWrapper = styled(Paper)`
  && {
    padding: 32px;
    width: 100%;
    background-color: ${BackgroundColor.darker};
  }
`;

const LoadingTabsWrapper = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

export default TaggedJobsPage;
