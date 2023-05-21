import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { withAdminAccess } from "src/components/higherOrder/AdminGuard";
import { parseJobKeywords } from "src/lib/JobKeywordParse/jobKeywordParse";
import { IJobKeyword, Requests } from "src/lib/requests/Requests";
import styled from "styled-components";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";

const KeywordsPage = () => {
  const [jobKeywords, setJobKeywords] = useState<IJobKeyword[]>(
    [] as IJobKeyword[]
  );
  const [data, setData] = useState<string>("");
  const [jsonData, setJsonData] = useState<IJobKeyword[]>([] as IJobKeyword[]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const router = useRouter();
  // Retrieve the token from the query parameter
  const { token } = router.query;

  useEffect(() => {
    const fire = async () => {
      const jobs = await Requests.getJobKeywords();
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
    setLoading(false);
    setJobKeywords(out);
  };
  return (
    <MainWrapper>
      <h1>Job Keywords</h1>
      <div>
        <ErrorText>
          <b>WARNING: All values are overwritten and replaced with new input</b>
        </ErrorText>
        <label>JSON Input</label> <br />
        <textarea
          value={data}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setData(e.target.value);
          }}
          disabled={loading}
          cols={40}
          rows={20}
        />
      </div>
      <br />
      <Button
        disabled={loading || error !== ""}
        onClick={handleSubmit}
        variant="contained"
      >
        submit
      </Button>
      <Title>Live Database Values:</Title>
      {error ? <ErrorText>Bad Input: {error}</ErrorText> : null}
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
  }
`;

const PaperWrapper = styled(Paper)`
  padding: 16px;
  padding-top: 0;
  margin-bottom: 8px;
`;

const Title = styled.h2`
  text-align: center;
`;
