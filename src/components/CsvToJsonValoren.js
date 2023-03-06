import React from "react";
import Papa from "papaparse";

//IMPORT STYLES
import styles from "../styles/Home.module.css";

class CsvToJsonValoren extends React.Component {
  //PROPS

  constructor(props) {
    super(props);
    this.state = {
      file: null,
      data: null,
      saving: false,
    };
  }

  // STATES
  handleFileUpload = (event) => {
    this.setState({ file: event.target.files[0] });
  };

  //DATA

  //FUNCTIONS

  handleConvert = () => {
    Papa.parse(this.state.file, {
      // header: true,

      complete: (results) => {
        this.setState({ data: results.data }, () => {
          this.saveToGraphCMS();
        });
      },
    });
  };

  saveToGraphCMS = async () => {
    this.setState({ saving: true });

    const url =
      "https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/cleefj64m5rrt01tb4uepee22/master";
    const headers = {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2NzY5OTY5ODMsImF1ZCI6WyJodHRwczovL2FwaS1ldS1jZW50cmFsLTEtc2hhcmVkLWV1YzEtMDIuaHlncmFwaC5jb20vdjIvY2xlZWZqNjRtNXJydDAxdGI0dWVwZWUyMi9tYXN0ZXIiLCJtYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC5ncmFwaGNtcy5jb20vIiwic3ViIjoiYzVmN2NiNzUtMjFiZS00MjUzLWE0NmUtMWYwNjlhNWQ0YTBiIiwianRpIjoiY2xlZWdwZTc1NXRtMzAxdWY1cWFtYzZnaCJ9.tHPNOmIBk31ElwQ0SUW_OMBjmwa_cfh2SHqKsUWfQlmzAdY_o_2vZkvZe9MPyRr5AO1_ynrR_TK-mQ1u0vbV3oSkyti-GFM1WcQ4LjHobqEZmsQnTPJmIGS-xVugVVIuglP45rP2x-WkRLi5kAX31DD8bNmfAV0rVtDe9Dh8ZowbuFup2RuczpoCYGGtPLYnScgwvtkAnVXOYqTwl-zabKgAnyvBPTLoXKvjFzqxyHoebWJfsX2QzLTtDuscyhNnB3rbanjXjphEyXtIEx6CaRU_ca67OZngisNovN7t6uH9YaC83CVL4NQNNZZGhJ9HfK0Uea7NCNJ3o4ZJwZZ1B1kIN0PJSNfBxKnxNs2eK-TxstzgZXYk4hTU-mzJtlf6XNwmU7gQIXqZMt9LKx_4yvQ807iZXvn2_ctrZarVm5RQsGRB-9HtTFO5BJy2J1DB4jUwn-1SCLuZTq0-3erlhxmdvKipQaC19lbwoeBjDSdBz0T7SeNUcG5LUJnEGpmul8bgPBtMpBg5BVX7o-dcuZhI6V64mnSGmgvF3jbBfVRjLQI75o2gc6RKjIWzmUR1l_B2Bsp30Uo5qqpuIUDRaX37yfTHmxuycCXhSEgrpQ6oQEw1VpcJsUFa2UlTv5CDQScK1j6_3vdJ3PjMvf6hhaDfKuGqRmsH1AGiJCiFAF4",
    };
    const query = `
    mutation MyMutation($data:Json) {
        createImportJSON(data: {importValor: $data, target:false}) {
          id
          updatedAt
          importValor
          target
        }
      }
    `;
    const variables = {
      data: this.state.data,
    };
    const body = JSON.stringify({
      query: query,
      variables: variables,
    });

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: body,
      });
      const data = await response.json();
      console.log(data);
      this.state.importDate = data.data.createImportJSON.updatedAt;
    } catch (error) {
      console.error(error);
    }

    this.setState({ saving: false });
  };

  render() {
    return (
      <div>
        <input type="file" onChange={this.handleFileUpload} />
        <button className={styles.convert_button} onClick={this.handleConvert}>
          Convert
        </button>
        {this.state.saving && (
          <>
            {/* {this.state.data.data.createImportJSON.createdAt} */}
            <p>Saving to GraphCMS...</p>
          </>
        )}
        {this.state.data && this.state.saving == false && (
          <>
            <div>Import Complete {this.state.importDate}</div>
            {console.log("IMPORTDATE", this.state.importDate)}
            {/* // <pre>{JSON.stringify(this.state.data, null, 2)}</pre> */}
          </>
        )}
      </div>
    );
  }
}

export default CsvToJsonValoren;
