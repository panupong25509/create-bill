import React from "react";
import styled from "styled-components";
import Cookies from "universal-cookie";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const cookie = new Cookies();
const Paper = styled.div`
  border: 1px solid black;
`;
const BoxBill = styled.div`
  background-color: black;
  color: white;
`;

function CC(name) {
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
    pdf.save(`${name}.pdf`);
  });
}

class Bill extends React.Component {
  state = {
    total: 0
  };
  render() {
    const data = cookie.get("bill");
    console.log(data);
    return (
      <div>
        <Paper id="bill" className="col-12 mx-auto p-3">
          <div className="text-center mt-5">
            <h3>ผลไม้แช่อิ่มภัทรพล</h3>
            <div className="col-6 mx-auto">
              201/857 ซ.ร่มเกล้า 24 ถ.เคหะร่มเกล้า แขวง คลองสองต้นนุ่น เขต
              ลาดกระบัง กรุงเทพมหานคร 10140
            </div>
          </div>
          <BoxBill className="p-3 text-center mt-3">
            <h2>บิลเงินสด</h2>
          </BoxBill>
          <div className="row mt-4">
            <div className="col">ร้าน : {data.store}</div>
            <div className="col">วันที่ : {data.date}</div>
          </div>
          <table className="col-12 mt-3" border="1">
            <tr className="text-center">
              <th scope="col" className="p-3">
                จำนวน (Quanlity)
              </th>
              <th scope="col" className="p-3">
                รายการ (Drescription)
              </th>
              <th scope="col" className="p-3">
                หน่วยละ (Unit Price)
              </th>
              <th scope="col" className="p-3">
                จำนวนเงิน (Amount)
              </th>
            </tr>
            {data.products.map((prod, i) => {
              return (
                <tr>
                  <td className="p-2">{prod.product.quanlity}</td>
                  <td className="p-2">{prod.product.description}</td>
                  <td className="p-2">{prod.product.unitprice}</td>
                  <td className="p-2">{prod.product.amount}</td>
                </tr>
              );
            })}
            <tr>
              <td className="p-2">บาท</td>
              <td className="p-2" />
              <td className="p-2">รวมเงิน</td>
              <td className="p-2">{data.total}</td>
            </tr>
          </table>
          <div className="text-left mt-5 mb-5">
            <div className="row">
              <div className="col">ผู้รับของ</div>
              <div className="col">ผู้ส่งของ</div>
            </div>
          </div>
        </Paper>
        <button onClick={() => CC(`${data.store}(${data.date})`)}>Save</button>
      </div>
    );
  }
}

export default Bill;
