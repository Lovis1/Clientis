//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
// A FUNCTION THAT LOADS THE LAST JSON OBJECT WHEN THE APP IS LAUCHNED
//********************************************************************* */
// is used in useEffect with each first rendering : should be adjusted so that it is generated after each import of new CSV and VALOREN FILES

export const getLastSeenData = async (
  setActiveDataImportDate: any,
  setBankPoolRows: any,
  setBankPoolActionsRows: any
) => {
  // this generates the data and (unfortunately) also generates the tableData Object as an output
  // initialize variables
  let dataObject = [];
  let lastImportDateCsv: Int16Array;
  let lastImportDateValor: Int16Array;
  let lastImportBankPOOL: Int16Array;

  const url =
    "https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/cleefj64m5rrt01tb4uepee22/master";
  const headers = {
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2NzY5OTY5ODMsImF1ZCI6WyJodHRwczovL2FwaS1ldS1jZW50cmFsLTEtc2hhcmVkLWV1YzEtMDIuaHlncmFwaC5jb20vdjIvY2xlZWZqNjRtNXJydDAxdGI0dWVwZWUyMi9tYXN0ZXIiLCJtYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC5ncmFwaGNtcy5jb20vIiwic3ViIjoiYzVmN2NiNzUtMjFiZS00MjUzLWE0NmUtMWYwNjlhNWQ0YTBiIiwianRpIjoiY2xlZWdwZTc1NXRtMzAxdWY1cWFtYzZnaCJ9.tHPNOmIBk31ElwQ0SUW_OMBjmwa_cfh2SHqKsUWfQlmzAdY_o_2vZkvZe9MPyRr5AO1_ynrR_TK-mQ1u0vbV3oSkyti-GFM1WcQ4LjHobqEZmsQnTPJmIGS-xVugVVIuglP45rP2x-WkRLi5kAX31DD8bNmfAV0rVtDe9Dh8ZowbuFup2RuczpoCYGGtPLYnScgwvtkAnVXOYqTwl-zabKgAnyvBPTLoXKvjFzqxyHoebWJfsX2QzLTtDuscyhNnB3rbanjXjphEyXtIEx6CaRU_ca67OZngisNovN7t6uH9YaC83CVL4NQNNZZGhJ9HfK0Uea7NCNJ3o4ZJwZZ1B1kIN0PJSNfBxKnxNs2eK-TxstzgZXYk4hTU-mzJtlf6XNwmU7gQIXqZMt9LKx_4yvQ807iZXvn2_ctrZarVm5RQsGRB-9HtTFO5BJy2J1DB4jUwn-1SCLuZTq0-3erlhxmdvKipQaC19lbwoeBjDSdBz0T7SeNUcG5LUJnEGpmul8bgPBtMpBg5BVX7o-dcuZhI6V64mnSGmgvF3jbBfVRjLQI75o2gc6RKjIWzmUR1l_B2Bsp30Uo5qqpuIUDRaX37yfTHmxuycCXhSEgrpQ6oQEw1VpcJsUFa2UlTv5CDQScK1j6_3vdJ3PjMvf6hhaDfKuGqRmsH1AGiJCiFAF4",
  };

  const query = `
      query MyQuery() {
        importJSONfromCSV(where: {target: true}, last: 1) {
          createdAt
          id
          importJSON
        }
      }
  
        `;

  const queryValor = `
        query MyQuery {
          importJSONfromCSV(where: {target_not: true}, last: 1) {
            createdAt
            id
            importValor
          }
        }
  
        `;

  const queryBankPOOL = `
        query MyQuery {
          importJSONfromCSV(last: 1) {
            bankPool
            createdAt
          }
        }
  
        `;

  const body = JSON.stringify({
    query: query,
    variables: { id: "cleh49y5d18g40bw33lyc5nvg" },
  });

  const bodyValor = JSON.stringify({
    query: queryValor,
    variables: { id: "cleh49y5d18gsdw33lyc5nvg" },
  });

  const bodyBankPOOL = JSON.stringify({
    query: queryBankPOOL,
    variables: { id: "cleh49y5d18gsdw33lyc5nvg" },
  });

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: body,
    });
    const data = await response.json();

    // dataObject = data.data.importJSONfromCSV[0].importJSON;
    lastImportDateCsv = data.data.importJSONfromCSV[0].createdAt;
    console.log("MY QUERY DATA LAUNCH", lastImportDateCsv);
  } catch (error) {
    console.error(error);
  }

  try {
    const responseValor = await fetch(url, {
      method: "POST",
      headers: headers,
      body: bodyValor,
    });
    const dataValor = await responseValor.json();

    // dataObject = data.data.importJSONfromCSV[0].importJSON;

    lastImportDateValor = dataValor.data.importJSONfromCSV[0].createdAt;

    console.log("MY QUERY DATA LAUNCH VALOR", lastImportDateValor);
  } catch (error) {
    console.error(error);
  }

  try {
    const responseBankPOOL = await fetch(url, {
      method: "POST",
      headers: headers,
      body: bodyBankPOOL,
    });
    const dataBankPOOL = await responseBankPOOL.json();

    // dataObject = data.data.importJSONfromCSV[0].importJSON;

    lastImportBankPOOL =
      dataBankPOOL.data.importJSONfromCSV[0].bankPool.bank_pool;

    // console.log("MY QUERY DATA LAUNCH BANKPOOL", lastImportBankPOOL);
    console.log("MY QUERY DATA LAUNCH BANKPOOL", lastImportBankPOOL);
  } catch (error) {
    console.error(error);
  }
  console.log(" THIS IS WORKING");

  setBankPoolRows(lastImportBankPOOL);
  setBankPoolActionsRows(lastImportBankPOOL);
  setActiveDataImportDate([lastImportDateCsv, lastImportDateValor]);
};
