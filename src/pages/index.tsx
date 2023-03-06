import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import Papa from "papaparse";
import { useExcelDownloder } from "react-xls";
import "react-data-grid/lib/styles.css";
import DataGrid from "react-data-grid";

//IMPOR COMPONENTS
import CsvToJsonMuPo from "../components/CsvToJsonMuPo";
import CsvToJsonValoren from "../components/CsvToJsonValoren";
import { Button } from "../components/Button";
import AddRowForm from "../components/AddRowForm.js";

import PaginationTable from "../components/PaginationTable.js";
import GroupTable from "../components/GroupTable.js";
//IMPORT UTILS
import { queryExportData } from "../utils/queryExportData.js";
import { downloadCSV } from "../utils/downloadCSV.js";
import { getLastSeenData } from "../utils/getLastSeenData";
import { generateBlockData } from "../utils/generateBlockData";

//IMPORT MUI
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

// IMPORT DATA
import {
  COLUMNS_BS_TACTICS,
  COLUMNS_BS_ALLOCATIONS_2,
  COLUMNS_BS_ASSIGNMENT_BY_REFERENCE_COMPLETE,
  COLUMNS_BS_BANK_STRATEGIES,
  COLUMNS_BS_DIRECT_ASSIGNMENT_COMPLETE,
  COLUMNS_BS_PROFILE_ASSIGNEMENTS_COMPLETE,
  COLUMNS_BS_TACTICS_ALLOCATIONS,
  COLUMNS_BS_TACTICS_TARGET_DURATIONS,
  COLUMNS_BS_TARGET_DURATIONS,
  COLUMNS_BS_USE_STRATEGY,
  COLUMNS_BS_USE_TACTICS,
  COLUMNS_MP_MODELPORTFOLIOS,
  COLUMNS_MP_MODELPORTFOLIO_MODULES,
  COLUMNS_MP_MODELPORTFOLIO_MODULE_ASSIGNMENTS,
  COLUMNS_MP_MODELPORTFOLIO_MODULE_CONTENTS,
  COLUMNS_MP_MODELPORTFOLIO_POOLING,
  COLUMNS_MP_MODELPORTFOLIO_STRATEGY_ASSIGNMENTS_COMPLETE,
  COLUMNS_MP_MODELPORTFOLIO_TACTICS_ASSIGNMENTS_COMPLETE,
  COLUMNS_RY_RISKYRANGE_ASSIGNMENT_COMPLET,
} from "../data/columns";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  //Props
  //Data
  const blockNames = [
    "BS_BANK_STRATEGIES",
    "BS_TACTICS",
    "BS_USE_STRATEGY",
    "BS_USE_TACTICS",
    "BS_DIRECT_ASSIGNMENT_COMPLETE",
    "BS_PROFIL_ASSIGNMENTS_COMPLETE",
    "BS_ASSIGNMENT_BY_REFERENCE_COMPLETE",
    "BS_TARGET_DURATIONS",
    "BS_TACTICS_TARGET_DURATIONS",
    "BS_ALLOCATIONS_2",
    "BS_TACTICS_ALLOCATIONS",
    "RY_RISKYRANGE_ASSIGNMENT_COMPLETE",
    "MP_MODELPORTFOLIO_MODULES",
    "MP_MODELPORTFOLIO_MODULE_CONTENTS",
    "MP_MODELPORTFOLIOS",
    "MP_MODELPORTFOLIO_MODULE_ASSIGNMENTS",
    "MP_MODELPORTFOLIO_STRATEGY_ASSIGNMENTS_COMPLETE",
    "MP_MODELPORTFOLIO_TACTICS_ASSIGNMENTS_COMPLETE",
  ];

  const tableNames = [
    "Verfügbare MuPos je Bank",
    "Zuweisung von Mupos zu Strategien je Bank",
    "Einschränkende Kriterien für die Zuweisung von Mupos zu",
    "Festlegung, ob es sich um den Default-Eintrag handelt",
  ];

  // ASSIGN COLUMNS DATA TO TABLE NAMES

  const columnsDataName = {
    BS_BANK_STRATEGIES: COLUMNS_BS_BANK_STRATEGIES,
    BS_TACTICS: COLUMNS_BS_TACTICS,
    BS_USE_STRATEGY: COLUMNS_BS_USE_STRATEGY,
    BS_USE_TACTICS: COLUMNS_BS_USE_TACTICS,
    BS_DIRECT_ASSIGNMENT_COMPLETE: COLUMNS_BS_DIRECT_ASSIGNMENT_COMPLETE,
    BS_PROFIL_ASSIGNMENTS_COMPLETE: COLUMNS_BS_PROFILE_ASSIGNEMENTS_COMPLETE,
    BS_ASSIGNMENT_BY_REFERENCE_COMPLETE:
      COLUMNS_BS_ASSIGNMENT_BY_REFERENCE_COMPLETE,
    BS_TARGET_DURATIONS: COLUMNS_BS_TARGET_DURATIONS,
    BS_TACTICS_TARGET_DURATIONS: COLUMNS_BS_TACTICS_TARGET_DURATIONS,
    BS_ALLOCATIONS_2: COLUMNS_BS_ALLOCATIONS_2,
    BS_TACTICS_ALLOCATIONS: COLUMNS_BS_TACTICS_ALLOCATIONS,
    RY_RISKYRANGE_ASSIGNMENT_COMPLETE: COLUMNS_RY_RISKYRANGE_ASSIGNMENT_COMPLET,
    MP_MODELPORTFOLIO_MODULES: COLUMNS_MP_MODELPORTFOLIO_MODULES,
    MP_MODELPORTFOLIO_MODULE_CONTENTS:
      COLUMNS_MP_MODELPORTFOLIO_MODULE_CONTENTS,
    MP_MODELPORTFOLIOS: COLUMNS_MP_MODELPORTFOLIOS,
    MP_MODELPORTFOLIO_MODULE_ASSIGNMENTS:
      COLUMNS_MP_MODELPORTFOLIO_MODULE_ASSIGNMENTS,
    MP_MODELPORTFOLIO_STRATEGY_ASSIGNMENTS_COMPLETE:
      COLUMNS_MP_MODELPORTFOLIO_STRATEGY_ASSIGNMENTS_COMPLETE,
    MP_MODELPORTFOLIO_TACTICS_ASSIGNMENTS_COMPLETE:
      COLUMNS_MP_MODELPORTFOLIO_TACTICS_ASSIGNMENTS_COMPLETE,
    COLUMNS_MP_MODELPORTFOLIO_POOLING: COLUMNS_MP_MODELPORTFOLIO_POOLING,
  };
  //STATES
  const [importView, setImportView] = useState(false);
  const [blocksView, setBlocksView] = useState(false);
  const [tableView, setTableView] = useState(false);
  const [exportView, setExportView] = useState(false);
  const [configurationView, setConfigurationView] = useState(false);
  //
  const [activeBlock, setactiveBlock] = useState("");
  const [activeBlockData, setActiveBlockData] = useState();
  //
  const [bankPoolActionsRows, setBankPoolActionsRows] = useState([]);
  const [isBankPoolButtonDisabled, setIsBankPoolButtonDisabled] = useState(true); //prettier-ignore
  const [bankPoolRows, setBankPoolRows] = useState([]);

  //
  const [activeTable, setactiveTable] = useState("");
  const [activeTableData, setActiveTableData] = useState([]);
  //
  const [activeColumnNames, setActiveColumnNames] = useState();
  const [blockName, setblockName] = useState("");
  const [activeDataImportDate, setActiveDataImportDate] = useState([]);
  const [activeDataExportDate, setActiveDataExportDate] = useState([]);
  const [exportDataJSON, setExportDataJSON] = useState();
  const [exportDataCSV, setExportDataCSV] = useState();
  //
  const [testState, setTestState] = useState();

  //FUNCTIONS

  //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
  // A FUNCTION THAT DISABLE OTHER VIEWS
  /************************************************************** */

  const setViewActive = (view: string) => {
    if (view == "import-view") {
      setImportView(!importView);
      setBlocksView(false);
      setConfigurationView(false);
      setTableView(false);
      setExportView(false);
    }
    if (view == "blocks-view") {
      setImportView(false);
      setBlocksView(!blocksView);
      setConfigurationView(false);
      setTableView(false);
      setExportView(false);
    }
    if (view == "configuration-view") {
      setImportView(false);
      setBlocksView(false);
      setConfigurationView(!configurationView);
      setTableView(false);
      setExportView(false);
    }
    if (view == "table-view") {
      setImportView(false);
      setBlocksView(false);
      setConfigurationView(false);
      setTableView(!tableView);
      setExportView(false);
    }
    if (view == "exports-view") {
      setImportView(false);
      setBlocksView(false);
      setTableView(false);
      setExportView(!exportView);
    }
  };

  //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
  // A FUNCTION TO CHANGE THE ACTIVE BLOCK IN THE DROPDOWN
  /************************************************************** */
  const handleChangeBlock = (event: SelectChangeEvent) => {
    setactiveBlock(event.target.value as string);
  };

  //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
  // A FUNCTION TO CHANGE THE ACTIVE TABLE IN THE DROPDOWN
  /************************************************************** */
  const handleChangeTable = (event: SelectChangeEvent) => {
    setactiveTable(event.target.value as string);
  };
  //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
  // A FUNCTION THAT MAPS THE COLUMN NAMES FOR PREVIEW                //
  //**************************************************************** */

  const previewColumnNames = () => {
    let columnNamesPreview = [];
    for (let i = 0; i < columnsDataName[activeBlock].length; i++) {
      columnNamesPreview.push(columnsDataName[activeBlock][i]["Header"]);
    }

    let mapColumnNames = columnNamesPreview.map(function (element: any) {
      return <div className={styles.preview_tables_element}>{element}</div>;
    });
    return mapColumnNames;
  };

  //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
  // A FUNCTION THAT RETURNS BLOCK NAMES //
  //**************************************************************** */

  const displayblockNames = (names: any) => {
    let mapedNames = names.map(function (element: any) {
      // return <div onClick={() => setactiveBlock(element)}>{element}</div>;
      if (
        element == "MP_MODELPORTFOLIO_MODULES" ||
        element == "MP_MODELPORTFOLIO_MODULE_CONTENTS" ||
        element == "MP_MODELPORTFOLIOS" ||
        element == "MP_MODELPORTFOLIO_MODULE_ASSIGNMENTS" ||
        element == "MP_MODELPORTFOLIO_MODULE_ASSIGNMENTS" ||
        element == "MP_MODELPORTFOLIO_STRATEGY_ASSIGNMENTS_COMPLETE"
      ) {
        return (
          <MenuItem
            sx={{
              bgcolor: "yellow",
            }}
            onClick={() => setactiveBlock(element)}
            value={element}
            key={element}
          >
            {element}
          </MenuItem>
        );
      } else {
        return (
          <MenuItem
            onClick={() => setactiveBlock(element)}
            value={element}
            key={element}
          >
            {element}
          </MenuItem>
        );
      }
    });
    return mapedNames;
  };
  //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
  // A FUNCTION THAT RETURNS TABLE NAMES //
  //**************************************************************** */

  const displayTableNames = (names: any) => {
    let mapedNames = names.map(function (element: any) {
      // return <div onClick={() => setactiveBlock(element)}>{element}</div>;

      return (
        <MenuItem
          onClick={() => setactiveBlock(element)}
          value={element}
          key={element}
        >
          {element}
        </MenuItem>
      );
    });
    return mapedNames;
  };
  //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
  // A FUNCTION THAT LOADS THE LAST JSON OBJECT WHEN THE APP IS LAUCHNED
  //********************************************************************* */

  useEffect(() => {
    getLastSeenData(
      setActiveDataImportDate,
      setBankPoolRows,
      setBankPoolActionsRows
    );
  }, []);

  //

  //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
  // A FUNCTION THAT QUERIES THE DATA FOR TABLE, RETURNS COLUMNS NAMES (SETS STATES)
  //************************************************************** */

  const generateTableDataColumnNames = async () => {
    // initialize variables

    let dataObject = [];
    let COLUMNS_BANK2MPM = [];
    let ROWS_INDEX_BANK2MPM = [];

    //import the master file

    const url =
      "https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/cleefj64m5rrt01tb4uepee22/master";
    const headers = {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2NzY5OTY5ODMsImF1ZCI6WyJodHRwczovL2FwaS1ldS1jZW50cmFsLTEtc2hhcmVkLWV1YzEtMDIuaHlncmFwaC5jb20vdjIvY2xlZWZqNjRtNXJydDAxdGI0dWVwZWUyMi9tYXN0ZXIiLCJtYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC5ncmFwaGNtcy5jb20vIiwic3ViIjoiYzVmN2NiNzUtMjFiZS00MjUzLWE0NmUtMWYwNjlhNWQ0YTBiIiwianRpIjoiY2xlZWdwZTc1NXRtMzAxdWY1cWFtYzZnaCJ9.tHPNOmIBk31ElwQ0SUW_OMBjmwa_cfh2SHqKsUWfQlmzAdY_o_2vZkvZe9MPyRr5AO1_ynrR_TK-mQ1u0vbV3oSkyti-GFM1WcQ4LjHobqEZmsQnTPJmIGS-xVugVVIuglP45rP2x-WkRLi5kAX31DD8bNmfAV0rVtDe9Dh8ZowbuFup2RuczpoCYGGtPLYnScgwvtkAnVXOYqTwl-zabKgAnyvBPTLoXKvjFzqxyHoebWJfsX2QzLTtDuscyhNnB3rbanjXjphEyXtIEx6CaRU_ca67OZngisNovN7t6uH9YaC83CVL4NQNNZZGhJ9HfK0Uea7NCNJ3o4ZJwZZ1B1kIN0PJSNfBxKnxNs2eK-TxstzgZXYk4hTU-mzJtlf6XNwmU7gQIXqZMt9LKx_4yvQ807iZXvn2_ctrZarVm5RQsGRB-9HtTFO5BJy2J1DB4jUwn-1SCLuZTq0-3erlhxmdvKipQaC19lbwoeBjDSdBz0T7SeNUcG5LUJnEGpmul8bgPBtMpBg5BVX7o-dcuZhI6V64mnSGmgvF3jbBfVRjLQI75o2gc6RKjIWzmUR1l_B2Bsp30Uo5qqpuIUDRaX37yfTHmxuycCXhSEgrpQ6oQEw1VpcJsUFa2UlTv5CDQScK1j6_3vdJ3PjMvf6hhaDfKuGqRmsH1AGiJCiFAF4",
    };

    const query = `
    query MyQuery {
      importJSONfromCSV( where: {target: true},last: 1) {
        id
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

      dataObject = data.data.importJSONfromCSV[0].importJSON;
      console.log("MY QUERY", dataObject);
    } catch (error) {
      console.error(error);
    }

    //queries the JSON Target File for the Table Name
    let activeBlockIndex: Int16Array;
    let activeBlockIndexColumns: Int16Array;
    let activeBlockIndexDataStart: Int16Array;
    let activeBlockIndexDataEnd: Int16Array;

    for (let i = 0; i < dataObject.length; i++) {
      if (dataObject[i][0] == "MP_MODELPORTFOLIOS") {
        // SHOULD BE MADE DYNAMIC TO ACCOUNT FOR DIFFERENT TABLES
        activeBlockIndex = i;
        activeBlockIndexColumns = i + 1;
        activeBlockIndexDataStart = i + 2;

        break;
      }
    }
    for (
      let i = activeBlockIndexDataStart;
      dataObject.length - activeBlockIndexDataStart; // test for empty blocks
      i++
    ) {
      if (
        dataObject[i][0] == "" &&
        dataObject[i][1] == "" &&
        dataObject[i][2] == "" &&
        dataObject[i][3] == "" &&
        dataObject[i][4] == "" &&
        dataObject[i][5] == "" &&
        dataObject[i][6] == "" &&
        dataObject[i][7] == ""
      ) {
        activeBlockIndexDataEnd = i;
        console.log("SUCCESS", activeBlockIndexDataEnd);
        break;
      }
    }

    for (
      let j = 0;
      j < activeBlockIndexDataEnd - activeBlockIndexDataStart;
      j++
    ) {
      let json_empty = {
        Header: "",
      };

      let test = [];
      for (let i = 0; i < COLUMNS_BANK2MPM.length; i++) {
        test.push(Object.values(COLUMNS_BANK2MPM[i])[0]);
      }

      if (
        test.includes(dataObject[activeBlockIndexDataStart + j][0].slice(4)) !=
        true
      ) {
        json_empty["Header"] =
          dataObject[activeBlockIndexDataStart + j][0].slice(4);

        COLUMNS_BANK2MPM.push(json_empty);
      }
    }

    for (
      let j = 0;
      j < activeBlockIndexDataEnd - activeBlockIndexDataStart;
      j++
    ) {
      let json_empty = {
        tenant_ID: "",
        Bank: "",
      };

      let test = [];
      for (let i = 0; i < ROWS_INDEX_BANK2MPM.length; i++) {
        test.push(ROWS_INDEX_BANK2MPM[i]["Bank"]);
      }

      if (
        test.includes(
          dataObject[activeBlockIndexDataStart + j][0].slice(0, 3)
        ) != true
      ) {
        json_empty["Bank"] = dataObject[activeBlockIndexDataStart + j][0].slice(
          0,
          3
        );

        ROWS_INDEX_BANK2MPM.push(json_empty);
      }
    }
    COLUMNS_BANK2MPM.unshift({ Header: "tenant" });
    COLUMNS_BANK2MPM.unshift({ Header: "tenant ID" });

    setActiveTableData([COLUMNS_BANK2MPM, ROWS_INDEX_BANK2MPM]);
    console.log("activeTableData", activeTableData);

    // for every row in the length of the table

    // let json_empty_rows

    //for i in the length of COLUMNS_BANK2MPM - the first two Columns: if (Portfolio exists with corresponding bank of row) fill with x, else: leave empty

    // push jsonempy in a rows Data Object: use ROWS_INDEX_BANK2MPM and extend each element in a new Array

    return COLUMNS_BANK2MPM;
  };

  //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
  // A FUNCTION THAT QUERIES THE DATA FOR TABLE, RETURNS THE ROWSDATA (SETS STATES) (FOR FIRST TABLE: VERFÜgbare MUPOS JE BANK)
  //************************************************************** */

  const generateTableDataRows = () => {};

  //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
  /// A FUNCTION THAT HANDLES THE DOWNLOAD OF TARGET DATA
  //********************************************************************/

  const handleSetExportDataCSV = () => {
    // const csv = parse(data);

    downloadCSV(exportDataJSON);
  };

  //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
  /// Testing React EXCEL SHEETS with react-table-grid
  //********************************************************************/

  const columns = [
    { key: "id", name: "ID" },
    { key: "title", name: "Title" },
  ];

  const rows = [
    { id: 0, title: "Example" },
    { id: 1, title: "Demo" },
  ];

  //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
  /// TA FUNCTION THAT GENERATES THE ROWS CONTENT DYNAMICALLY
  //********************************************************************/

  const generateGridColumns = (activeColumnNames: any) => {
    const columns = [];
    if (activeColumnNames.length !== 0) {
      for (let i = 0; i < activeColumnNames.length; i++) {
        columns.push({
          key: activeColumnNames[i]["Header"],
          name: activeColumnNames[i]["Header"],
        });
      }
    }

    return columns;
  };

  //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
  /// CONFIGURATION TABLE FOR ACTIVE BANKs AND TENANT-ID s
  //********************************************************************/

  const addRow = (tenant_id, bankKurz) => {
    const newRow = {
      tenant_id: tenant_id,
      bankKurz: bankKurz,
    };
    setBankPoolActionsRows([...bankPoolActionsRows, newRow]);
  };

  const removeRow = (index) => {
    const newRows = [...bankPoolActionsRows];
    newRows.splice(index, 1);
    setBankPoolActionsRows(newRows);
  };

  //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
  /// HANDLE APPLICATION OF BANK POOL ACTIONS TO ACTIVE BANK POOL
  //********************************************************************/

  const applyBankPoolRows = async () => {
    let bankPoolActionsData = [];

    const url =
      "https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/cleefj64m5rrt01tb4uepee22/master";
    const headers = {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2NzY5OTY5ODMsImF1ZCI6WyJodHRwczovL2FwaS1ldS1jZW50cmFsLTEtc2hhcmVkLWV1YzEtMDIuaHlncmFwaC5jb20vdjIvY2xlZWZqNjRtNXJydDAxdGI0dWVwZWUyMi9tYXN0ZXIiLCJtYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC5ncmFwaGNtcy5jb20vIiwic3ViIjoiYzVmN2NiNzUtMjFiZS00MjUzLWE0NmUtMWYwNjlhNWQ0YTBiIiwianRpIjoiY2xlZWdwZTc1NXRtMzAxdWY1cWFtYzZnaCJ9.tHPNOmIBk31ElwQ0SUW_OMBjmwa_cfh2SHqKsUWfQlmzAdY_o_2vZkvZe9MPyRr5AO1_ynrR_TK-mQ1u0vbV3oSkyti-GFM1WcQ4LjHobqEZmsQnTPJmIGS-xVugVVIuglP45rP2x-WkRLi5kAX31DD8bNmfAV0rVtDe9Dh8ZowbuFup2RuczpoCYGGtPLYnScgwvtkAnVXOYqTwl-zabKgAnyvBPTLoXKvjFzqxyHoebWJfsX2QzLTtDuscyhNnB3rbanjXjphEyXtIEx6CaRU_ca67OZngisNovN7t6uH9YaC83CVL4NQNNZZGhJ9HfK0Uea7NCNJ3o4ZJwZZ1B1kIN0PJSNfBxKnxNs2eK-TxstzgZXYk4hTU-mzJtlf6XNwmU7gQIXqZMt9LKx_4yvQ807iZXvn2_ctrZarVm5RQsGRB-9HtTFO5BJy2J1DB4jUwn-1SCLuZTq0-3erlhxmdvKipQaC19lbwoeBjDSdBz0T7SeNUcG5LUJnEGpmul8bgPBtMpBg5BVX7o-dcuZhI6V64mnSGmgvF3jbBfVRjLQI75o2gc6RKjIWzmUR1l_B2Bsp30Uo5qqpuIUDRaX37yfTHmxuycCXhSEgrpQ6oQEw1VpcJsUFa2UlTv5CDQScK1j6_3vdJ3PjMvf6hhaDfKuGqRmsH1AGiJCiFAF4",
    };

    const query = `
  mutation MyMutation($data:Json) {
    createImportJSON(data: {bankPool: $data}) {
      createdAt
      bankPool
    }
  }
  `;

    const variables = {
      data: { bank_pool: bankPoolActionsRows },
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

      //
      bankPoolActionsData = data.data.createImportJSON.bankPool.bank_pool;
      // console.log("MY QUERY BANK POOL", bankPoolActionsData);
    } catch (error) {
      console.error(error);
    }

    //setBankPoolRows(the actions bank pool rows)
    setBankPoolRows(bankPoolActionsRows);
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.head}>
          <div className={styles.description}>
            <div
              className={styles.logToConsole}
              onClick={() => (
                console.log("LOG TO CONSOLE", generateTableDataColumnNames()),
                console.log("ROWS BLOCKS", activeBlockData),
                console.log("BankROWS", bankPoolActionsRows),
                console.log("BANK POOL ROWS", bankPoolRows),
                applyBankPoolRows()
              )}
            >
              LOG TO CONSOLE
            </div>
          </div>
        </div>
        {/* <div className={styles.title}>TITLE</div> */}
        <div className={styles.process}>
          <div className={styles.process_button}>
            <Button
              variant="solid"
              color="gray"
              onClick={() => setViewActive("import-view")}
            >
              <div className={inter.className}>
                Imports -<span>&gt;</span>
              </div>
            </Button>
          </div>
          <div className={styles.process_button}>
            <Button
              variant="solid"
              color="gray"
              onClick={() => setViewActive("blocks-view")}
            >
              <div className={inter.className}>
                Blocks -<span>&gt;</span>
              </div>
            </Button>
          </div>
          <div className={styles.process_button}>
            <Button
              variant="solid"
              color="gray"
              onClick={() => setViewActive("configuration-view")}
            >
              <div className={inter.className}>
                Configurations -<span>&gt;</span>
              </div>
            </Button>
          </div>
          <div className={styles.process_button}>
            <Button
              variant="solid"
              color="gray"
              onClick={() => setViewActive("table-view")}
            >
              <div className={inter.className}>
                Table -<span>&gt;</span>
              </div>
            </Button>
          </div>
          <div className={styles.process_button}>
            <Button
              variant="solid"
              color="gray"
              onClick={() => setViewActive("exports-view")}
            >
              <div className={inter.className}>
                Exports -<span>&gt;</span>
              </div>
            </Button>
          </div>
        </div>
        {/* <div className={styles.grid}>
          </div> */}
        <div className={styles.placeholder}></div>

        <div className={styles.display}>
          {importView == true && (
            <>
              <div className={styles.import_csv_frame}>
                <div className={styles.import_titles}>import Mupo</div>
                <CsvToJsonMuPo
                // setTestState={setTestState}
                />
              </div>
              <div className={styles.import_csv_frame_date}>
                {activeDataImportDate[0]}
              </div>

              <div className={styles.import_csv_frame}>
                <div className={styles.import_titles}>import Valoren</div>
                <CsvToJsonValoren />
              </div>
              <div className={styles.import_csv_frame_date}>
                {activeDataImportDate[1]}
              </div>
            </>
          )}
          <div>
            {blocksView == true && (
              <>
                <div className={styles.view_container}>
                  <div className={styles.select_table_container}>
                    <div className={styles.select_container}>
                      {/* <InputLabel className={styles.input_label_blocks} id="Blocks"> */}
                      <h2 className={styles.input_label_blocks}>Blocks</h2>
                      {/* </InputLabel> */}
                      <Select
                        className={styles.blocks_dropdown}
                        labelId="Blocks"
                        id="Blocks"
                        value={activeBlock}
                        label="Blocks"
                        onChange={handleChangeBlock}
                      >
                        {displayblockNames(blockNames)}
                      </Select>
                    </div>

                    <button
                      className={styles.generate_table_button}
                      onClick={() =>
                        generateBlockData(
                          setblockName,
                          setActiveColumnNames,
                          setActiveBlockData,
                          activeBlock,

                          columnsDataName
                        )
                      }
                    >
                      Generate Block
                    </button>
                  </div>
                  {activeBlock && (
                    <>
                      <div className={styles.preview_tables_container}>
                        <h2>Columns </h2>
                        <div className={styles.preview_tables}>
                          {previewColumnNames()}
                        </div>
                        {/* <h2>Rows</h2> */}
                      </div>
                    </>
                  )}

                  {activeBlock !== "" && blockName !== "" && (
                    <div className={styles.data_grid_container}>
                      {/* <h5 className={styles.table_view_title}>{activeBlock}</h5> */}

                      <DataGrid
                        className={styles.data_grid}
                        headerRowHeight={45}
                        rowHeight={40}
                        columns={generateGridColumns(activeColumnNames)}
                        rows={activeBlockData}
                      />
                    </div>
                  )}
                </div>
              </>
            )}
            {configurationView == true && (
              <>
                <div className={styles.view_container}>
                  <div className={styles.select_table_container}>
                    <div className={styles.config_flex_bank}>
                      <div className={styles.actions_bank_pool_container}>
                        <div className={styles.actions_bank_titles}>
                          <h2 className={styles.import_titles_bank}>
                            Bank-Pool
                          </h2>
                          {isBankPoolButtonDisabled == false && (
                            <button
                              className={styles.lock_button}
                              onClick={() =>
                                setIsBankPoolButtonDisabled(
                                  !isBankPoolButtonDisabled
                                )
                              }
                            >
                              lock
                            </button>
                          )}
                          {isBankPoolButtonDisabled == true && (
                            <button
                              className={styles.lock_button}
                              onClick={() =>
                                setIsBankPoolButtonDisabled(
                                  !isBankPoolButtonDisabled
                                )
                              }
                            >
                              unlock
                            </button>
                          )}
                        </div>

                        <table className={styles.bank_table}>
                          <thead>
                            <tr>
                              <th>
                                <div className={styles.columnName}>
                                  Tenant-ID
                                </div>
                              </th>
                              <th>Bankkürzel</th>
                              <th className={styles.column_width}>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {bankPoolActionsRows.map((row, index) => (
                              <tr key={index}>
                                <td>{row.tenant_id}</td>
                                <td>{row.bankKurz}</td>
                                <td>
                                  <button
                                    disabled={isBankPoolButtonDisabled}
                                    className={
                                      isBankPoolButtonDisabled
                                        ? styles.button_disabled
                                        : styles.generate_row_button_remove
                                    }
                                    onClick={() => removeRow(index)}
                                  >
                                    Remove
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className={styles.enter_bank_pool_container}>
                        <h2 className={styles.import_titles_bank_enter}>
                          Enter a new Bank
                        </h2>{" "}
                        <div className={styles.add_bank_row}>
                          <AddRowForm
                            onAddRow={addRow}
                            isBankPoolButtonDisabled={isBankPoolButtonDisabled}
                          />
                          <button
                            className={styles.apply_bank_pool_button}
                            onClick={() => applyBankPoolRows()}
                          >
                            Apply
                          </button>
                        </div>
                      </div>
                      <div className={styles.active_bank_pool_container}>
                        <h2 className={styles.import_titles_bank}>
                          Active Bank Pool
                        </h2>
                        <table className={styles.bank_table_active}>
                          <thead>
                            <tr>
                              <th>
                                <div className={styles.columnName}>
                                  Tenant-ID
                                </div>
                              </th>
                              <th>Bankkürzel</th>
                            </tr>
                          </thead>
                          <tbody>
                            {bankPoolRows.map((row, index) => (
                              <tr key={index}>
                                <td>{row.tenant_id}</td>
                                <td>{row.bankKurz}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
            {tableView == true && (
              <>
                <div className={styles.view_container}>
                  <div className={styles.select_table_container}>
                    <div className={styles.select_container}>
                      {/* <InputLabel className={styles.input_label_blocks} id="Blocks"> */}
                      <h2 className={styles.input_label_blocks}>Tables</h2>
                      {/* </InputLabel> */}
                      <Select
                        className={styles.blocks_dropdown}
                        labelId="Blocks"
                        id="Blocks"
                        value={activeTable}
                        label="Blocks"
                        onChange={handleChangeTable}
                      >
                        {displayTableNames(tableNames)}
                      </Select>
                    </div>

                    <button
                      className={styles.generate_table_button}
                      onClick={() => generateTableDataColumnNames()}
                    >
                      Generate Table
                    </button>
                  </div>

                  {activeTable !== "" && (
                    <div className={styles.data_grid_container}>
                      {/* <h5 className={styles.table_view_title}>{activeBlock}</h5> */}

                      {/* <DataGrid
                        className={styles.data_grid}
                        headerRowHeight={45}
                        rowHeight={40}
                        columns={activeTableData[0]}
                        rows={activeTableData[1]}
                      /> */}
                    </div>
                  )}
                </div>
              </>
            )}
            {exportView == true && (
              <>
                <div className={styles.export_view_container}>
                  <div>
                    <div className={styles.import_csv_frame}>
                      <div className={styles.import_titles}>
                        Query target-data
                      </div>
                      <button
                        className={styles.export_buttons}
                        onClick={() =>
                          queryExportData(
                            setExportDataJSON,
                            setActiveDataExportDate
                          )
                        }
                      >
                        Query
                      </button>
                    </div>
                    {activeDataExportDate && (
                      <div className={styles.import_csv_frame_date}>
                        {activeDataExportDate}
                      </div>
                    )}
                    <div className={styles.import_csv_frame}>
                      <div className={styles.import_titles}>Download</div>
                      <button
                        className={styles.export_buttons}
                        onClick={() => handleSetExportDataCSV()}
                      >
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
