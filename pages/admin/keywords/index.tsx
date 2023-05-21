import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { withAdminAccess } from "src/components/higherOrder/AdminGuard";
import { parseJobKeywords } from "src/lib/JobKeywordParse/jobKeywordParse";
import { IJobKeyword, Requests } from "src/lib/requests/Requests";
import styled from "styled-components";

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
    <div>
      <h1>Job Keywords</h1>
      <div>
        <label>JSON Input</label>
        <br />
        <label>
          <b>WARNING: All values are overwritten and replaced with new input</b>
        </label>
        <br />
        <textarea
          value={data}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setData(e.target.value);
          }}
          disabled={loading}
          cols={30}
          rows={10}
        />
      </div>
      <br />
      <button disabled={loading || error !== ""} onClick={handleSubmit}>
        submit
      </button>
      {error ? <ErrorText>Bad Input: {error}</ErrorText> : null}
      <ol>
        {jobKeywords.map(job => (
          <React.Fragment key={job.jobID}>
            <h2>JobID: {job.jobID}</h2>
            <h3>Keywords:</h3>
            <ul>
              {job.keywords.map(keyword => (
                <li key={keyword}>{keyword}</li>
              ))}
            </ul>
          </React.Fragment>
        ))}
      </ol>
    </div>
  );
};

export default withAdminAccess(KeywordsPage);

const ErrorText = styled.p`
  color: red;
`;
