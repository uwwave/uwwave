import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { withAdminAccess } from "src/components/higherOrder/AdminGuard";
import { parseJobKeywords } from "src/lib/JobKeywordParse/jobKeywordParse";
import { IJobKeyword, Requests } from "src/lib/requests/Requests";
import styled from "styled-components";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";

const KeywordsPage = () => {
  const [jobKeywords, setJobKeywords] = useState<IJobKeyword[]>(
    [] as IJobKeyword[]
  );
  const [data, setData] = useState<string>("");
  const [jsonData, setJsonData] = useState<IJobKeyword[]>([] as IJobKeyword[]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [jobIDs, setJobIDs] = useState<string>("");
  const router = useRouter();
  // Retrieve the token from the query parameter
  const { token } = router.query;

  useEffect(() => {
    const fire = async () => {
      const out = await Requests.getJobKeywords();
      const jobs = Object.entries(out.jobs).map(x => {
        return { jobID: x[0], keywords: x[1] };
      });
      jobs.forEach((x: any) => {
        delete x.id;
        delete x.__v;
      });
      setJobKeywords(jobs);
      setData(JSON.stringify(jobs));
      setLoading(false);
    };
    fire();
  }, []);

  useEffect(() => {
    try {
      const parsedData = parseJobKeywords(data);
      setJsonData(parsedData);
      setError("");
    } catch (error) {
      setError(String(error));
    }
  }, [data]);

  const handleSubmit = async () => {
    setLoading(true);
    const out = await Requests.updateJobKeywords(jsonData, token as string);
    const newJobs = Object.entries(out.jobs).map(x => {
      return { jobID: x[0], keywords: x[1] };
    });
    setJobKeywords(newJobs);
    setLoading(false);
  };

  const handleFetch = async () => {
    setLoading(true);
    const jobs = jobIDs.split(",").map(x => x.trim());
    if (jobs[jobs.length - 1] === "") {
      jobs.pop();
    }
    const out = await Requests.getJobKeywords(jobs);
    const newJobs = Object.entries(out.jobs).map(x => {
      return { jobID: x[0], keywords: x[1] };
    });
    setJobKeywords(newJobs);
    setLoading(false);
  };
  return (
    <MainWrapper>
      <h1>Job Keywords</h1>
      <ErrorText>
        <b>WARNING: All values are overwritten and replaced with new input</b>
      </ErrorText>
      <label>Update Keywords (JSON Input)</label> <br />
      <textarea
        value={data}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
          setData(e.target.value);
        }}
        disabled={loading}
        cols={40}
        rows={20}
      />
      <br />
      {error ? <ErrorText>Bad Input: {error}</ErrorText> : null}
      <Button
        disabled={loading || error !== ""}
        onClick={handleSubmit}
        variant="contained"
      >
        Update
      </Button>
      <Title>Live Database Values:</Title>
      <FetchButtonsWrapper>
        <TextField
          placeholder="jobID1, jobID2, jobID3"
          variant="outlined"
          size="small"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setJobIDs(e.target.value);
          }}
          value={jobIDs}
        />
        <Button variant="contained" onClick={handleFetch}>
          Fetch
        </Button>
      </FetchButtonsWrapper>
      <ol>
        {jobKeywords.map((job, i) => (
          <PaperWrapper key={job.jobID} variant="outlined">
            <h4>
              {`${i + 1}. `}JobID: {job.jobID}
            </h4>
            <p>Keywords:</p>
            <ul>
              {job.keywords.map(keyword => (
                <li key={keyword}>{keyword}</li>
              ))}
            </ul>
          </PaperWrapper>
        ))}
      </ol>
    </MainWrapper>
  );
};

export default withAdminAccess(KeywordsPage);

const ErrorText = styled.p`
  color: red;
`;

const MainWrapper = styled.div`
  && {
    font-family: Roboto;
    color: #131313;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const PaperWrapper = styled(Paper)`
  padding: 16px;
  padding-top: 0;
  margin-bottom: 8px;
  min-width: 300px;
`;

const Title = styled.h2`
  text-align: center;
`;

const FetchButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
