import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { withAdminAccess } from "src/components/higherOrder/AdminGuard";
import { IJobKeyword, Requests } from "src/lib/requests/Requests";

const KeywordsPage = () => {
  const [jobKeywords, setJobKeywords] = useState<IJobKeyword[]>(
    [] as IJobKeyword[]
  );
  const [jobID, setJobID] = useState<string>("");
  const [keywords, setKeywords] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  // Retrieve the token from the query parameter
  const { token } = router.query;

  useEffect(() => {
    const fire = async () => {
      const jobs = await Requests.getJobKeywords();
      setJobKeywords(jobs);
    };
    fire();
  }, []);

  const handleSubmit = async () => {
    const keys = keywords.split(",");
    if (!jobID || keys.length < 1) {
      return;
    }
    setLoading(true);
    const out = await Requests.updateJobKeywords(
      [{ jobID, keywords: keys }],
      token as string
    );
    setLoading(false);
    setJobKeywords(out);
  };
  return (
    <div>
      <h1>Job Keywords</h1>
      <div>
        <label>JobID</label>
        <br />
        <input
          value={jobID}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setJobID(e.target.value);
          }}
          disabled={loading}
        ></input>
      </div>
      <div>
        <label>Keywords (comma seperated)</label>
        <br />
        <input
          placeholder="Keyword1,keyword2,keyword3"
          value={keywords}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setKeywords(e.target.value);
          }}
          disabled={loading}
        />
      </div>
      <br />
      <button disabled={loading} onClick={handleSubmit}>
        submit
      </button>
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
