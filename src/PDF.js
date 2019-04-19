import { PDFDownloadLink, Document, Page, pdf } from "@react-pdf/renderer";
import React from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Bill from "./pages/Bill";

function CC() {
  const text = document.getElementById("bill");
  console.log(text);
  html2canvas(text, { dpi: 144 }).then(canvas => {
    const imgData = canvas.toDataURL("image/png", 1.0);
    const pdf = new jsPDF("p", "mm", "a4");
    var width = pdf.internal.pageSize.getWidth();
    var height =
      (width * document.getElementById("bill").offsetHeight) /
      document.getElementById("bill").offsetWidth;
    pdf.addImage(imgData, "JPEG", 0, 0, width, height);
    pdf.save("download.pdf");
  });
}
var a = [4];
const MyDoc = () => (
  <div>
    <div id="divToPrint">
      {a.map((item, i) => {
        return <div>{item}</div>;
      })}
    </div>
    <Bill />
    <button onClick={CC}>sadasdad</button>
  </div>
);

export default MyDoc;
