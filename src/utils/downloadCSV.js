import Papa from "papaparse";

//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
// A FUNCTION THAT CONVERTS JSON FILE TO CSV FORMAT AND DOWNLOADS IT
//********************************************************************/

export function downloadCSV(data) {
  // Convert JSON to CSV using Papa Parse
  const csv = Papa.unparse(data);

  // Create a Blob object from the CSV data
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });

  // Create a temporary URL for the Blob object
  const url = URL.createObjectURL(blob);

  // Create a link element for the URL
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", "data.csv");
  link.style.display = "none";
  document.body.appendChild(link);

  // Click the link to trigger the download
  link.click();

  // Clean up the URL and link elements
  URL.revokeObjectURL(url);
  document.body.removeChild(link);
}
