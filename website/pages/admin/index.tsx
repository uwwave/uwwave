import React from "react";
import Typography from "@mui/material/Typography";
import { AdminPageWrapper } from "src/components/PageWrapper/AdminPageWrapper";
import styled from "styled-components";
import { useAdminStats } from "src/lib/hooks/useAdminStats";
import Skeleton from "@mui/material/Skeleton";
import { Spacer } from "src/components/Spacer/Spacer";
import { MetricsCard } from "src/components/admin/MetricsCard";

const AboutPage = () => {
  const { isLoading, accountsCreated, extensionInstalls, goals } =
    useAdminStats();

  const renderCards = () => (
    <>
      <MetricsCard
        title="User Accounts Created:"
        value={accountsCreated}
        goal={goals?.accountsCreated}
        startingValue={goals?.startingAccountsCreated}
      />
      <MetricsCard
        title="Total Extension Installations:"
        value={extensionInstalls}
        goal={goals?.extensionInstallations}
        startingValue={goals?.startingExtensionInstallations}
      />
    </>
  );

  const renderLoadingCards = () => (
    <>
      <Skeleton variant="rounded" height={144} width={280} />
      <Skeleton variant="rounded" height={144} width={280} />
    </>
  );
  return (
    <AdminPageWrapper>
      <Typography variant="h4" align="center">
        Admin Home
      </Typography>
      <Spacer height={32} />
      <StatsWrapper>
        {isLoading ? renderLoadingCards() : renderCards()}
      </StatsWrapper>
    </AdminPageWrapper>
  );
};

export default AboutPage;

const StatsWrapper = styled.div`
  display: flex;
  gap: 16px;
`;
