//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
// A FUNCTION THAT QUERIES THE DATA FROM GRAPHQL FOR DOWNLOAD
//************************************************************** */

export const queryExportData = async (
  setExportDataJSON,
  setActiveDataExportDate
) => {
  // props

  // Initialize
  let jsonExportData;
  let exportDate;

  const url =
    "https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/cleefj64m5rrt01tb4uepee22/master";
  const headers = {
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2NzY5OTY5ODMsImF1ZCI6WyJodHRwczovL2FwaS1ldS1jZW50cmFsLTEtc2hhcmVkLWV1YzEtMDIuaHlncmFwaC5jb20vdjIvY2xlZWZqNjRtNXJydDAxdGI0dWVwZWUyMi9tYXN0ZXIiLCJtYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC5ncmFwaGNtcy5jb20vIiwic3ViIjoiYzVmN2NiNzUtMjFiZS00MjUzLWE0NmUtMWYwNjlhNWQ0YTBiIiwianRpIjoiY2xlZWdwZTc1NXRtMzAxdWY1cWFtYzZnaCJ9.tHPNOmIBk31ElwQ0SUW_OMBjmwa_cfh2SHqKsUWfQlmzAdY_o_2vZkvZe9MPyRr5AO1_ynrR_TK-mQ1u0vbV3oSkyti-GFM1WcQ4LjHobqEZmsQnTPJmIGS-xVugVVIuglP45rP2x-WkRLi5kAX31DD8bNmfAV0rVtDe9Dh8ZowbuFup2RuczpoCYGGtPLYnScgwvtkAnVXOYqTwl-zabKgAnyvBPTLoXKvjFzqxyHoebWJfsX2QzLTtDuscyhNnB3rbanjXjphEyXtIEx6CaRU_ca67OZngisNovN7t6uH9YaC83CVL4NQNNZZGhJ9HfK0Uea7NCNJ3o4ZJwZZ1B1kIN0PJSNfBxKnxNs2eK-TxstzgZXYk4hTU-mzJtlf6XNwmU7gQIXqZMt9LKx_4yvQ807iZXvn2_ctrZarVm5RQsGRB-9HtTFO5BJy2J1DB4jUwn-1SCLuZTq0-3erlhxmdvKipQaC19lbwoeBjDSdBz0T7SeNUcG5LUJnEGpmul8bgPBtMpBg5BVX7o-dcuZhI6V64mnSGmgvF3jbBfVRjLQI75o2gc6RKjIWzmUR1l_B2Bsp30Uo5qqpuIUDRaX37yfTHmxuycCXhSEgrpQ6oQEw1VpcJsUFa2UlTv5CDQScK1j6_3vdJ3PjMvf6hhaDfKuGqRmsH1AGiJCiFAF4",
  };

  const query = `
    query MyQuery {
      importJSONfromCSV(where: {target: true}, last: 1) {
        id
        createdAt
        importJSON
      }
    }
  `;

  const body = JSON.stringify({
    query: query,
    variables: { id: "cleq0cyt607xy0bw92dwomj2i" },
  });

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: body,
    });
    const data = await response.json();

    jsonExportData = data.data.importJSONfromCSV[0].importJSON;
    exportDate = data.data.importJSONfromCSV[0].createdAt;
    console.log("EXPORT", jsonExportData);
  } catch (error) {
    console.error(error);
  }
  setExportDataJSON(jsonExportData);
  setActiveDataExportDate(exportDate);
  return jsonExportData;
};
