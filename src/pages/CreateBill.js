import React from "react";
import styled from "styled-components";
import Cookies from "universal-cookie";
import { Route, Switch } from "react-router-dom";

import Data from "../data";

const Paper = styled.div`
  border: 1px solid black;
`;
const BoxBill = styled.div`
  background-color: black;
  color: white;
`;

class CreateBill extends React.Component {
  state = {
    data: {
      store: "Choose...",
      date:
        new Date().getDate() +
        "/ " +
        (new Date().getMonth() + 1) +
        "/ " +
        new Date().getFullYear(),
      products: [],
      total: 0
    },
    product: {
      quanlity: 0,
      description: "Choose...",
      unitprice: 0,
      amount: 0
    }
  };
  handleStore = async value => {
    const data = this.state.data;
    await this.setState({
      data: {
        ...data,
        store: value
      }
    });
  };
  handleProduct = async (param, value) => {
    const product = this.state.product;
    await this.setState({
      product: {
        ...product,
        [param]: value
      }
    });
    const newproduct = this.state.product;
    await this.setState({
      product: {
        ...newproduct,
        amount: this.state.product.quanlity * this.state.product.unitprice
      }
    });
  };
  handleAdd = async () => {
    const data = this.state.data;
    const product = this.state.product;
    if (
      !(
        product.amount === 0 ||
        product.description === "Choose..." ||
        product.quanlity === 0 ||
        product.unitprice === 0
      )
    ) {
      await this.setState({
        data: {
          ...data,
          products: [
            ...data.products,
            {
              product
            }
          ],
          total: this.state.data.total + product.amount
        }
      });
      await this.setState({
        product: {
          quanlity: 0,
          description: "Choose...",
          unitprice: 0,
          amount: 0
        }
      });
    } else {
      window.alert("กรอกให้ครบ");
    }
  };
  handleDelete = async index => {
    const data = this.state.data;
    this.state.data.products.splice(index, 1);

    console.log(this.state.data.products);
    await this.setState({
      data: {
        ...data,
        products: this.state.data.products
      }
    });
    // console.log("new", this.state.data.products.splice(index, 2));
    console.log(this.state.data.products);
    // console.log("splice" + newproducts.splice(index, 1));
  };
  handleNext = async () => {
    const cookie = new Cookies();
    const data = this.state.data;
    if (!(data.store === "Choose..." || data.products.length === 0)) {
      await cookie.set("bill", this.state.data);
      window.location.href = "/bill";
    } else {
      window.alert("กรอกข้อมูลให้ครบ");
    }
  };
  render() {
    const SelectorStore = props => (
      <select onChange={e => this.handleStore(e.target.value)}>
        <option selected>{this.state.data.store}</option>
        {props.store.map((item, i) => {
          return <option value={item}>{item}</option>;
        })}
      </select>
    );
    const SelectorProduct = props => (
      <select onChange={e => this.handleProduct("description", e.target.value)}>
        <option selected>{this.state.product.description}</option>
        {props.product.map((item, i) => {
          return <option value={item}>{item}</option>;
        })}
      </select>
    );
    return (
      <div>
        <Paper id="bill" className="col-12 col-sm-10 mx-auto p-3 mt-5 mb-5">
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
            <div className="col">
              ร้าน :
              <SelectorStore store={Data.store} param="store" />
              <input
                type="text"
                onChange={e => this.handleStore(e.target.value)}
                value={this.state.data.store}
              />
            </div>
            <div className="col">วันที่ : {this.state.data.date}</div>
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
              <th scope="col" className="p-3">
                Delete
              </th>
            </tr>
            {this.state.data.products.map((item, i) => {
              return (
                <tr>
                  <td className="p-2 text-right">{item.product.quanlity}</td>
                  <td className="p-2">{item.product.description}</td>
                  <td className="p-2 text-right">{item.product.unitprice}</td>
                  <td className="p-2 text-right">{item.product.amount}</td>
                  <td className="p-2">
                    <button
                      onClick={() => this.handleDelete(i)}
                      type="button"
                      className="btn btn-danger"
                    >
                      -
                    </button>
                  </td>
                </tr>
              );
            })}
            <tr>
              <td className="p-2">
                <input
                  type="number"
                  onChange={e => this.handleProduct("quanlity", e.target.value)}
                  value={this.state.product.quanlity}
                />
              </td>
              <td className="p-2">
                <SelectorProduct product={Data.product} />
              </td>
              <td className="p-2">
                <input
                  type="number"
                  onChange={e =>
                    this.handleProduct("unitprice", e.target.value)
                  }
                  value={this.state.product.unitprice}
                />
              </td>
              <td className="p-2 text-right">{this.state.product.amount}</td>
            </tr>
            <tr>
              <td colSpan="4" class="text-center p-2">
                <button
                  type="button"
                  class="btn btn-success"
                  onClick={this.handleAdd}
                >
                  + เพิ่มรายการ
                </button>
              </td>
            </tr>
            <tr>
              <td className="p-2">บาท</td>
              <td className="p-2" />
              <td className="p-2">รวมเงิน</td>
              <td className="p-2 text-right">{this.state.data.total}</td>
            </tr>
          </table>
          <button
            type="button"
            className="btn btn-warning col-12 mt-5"
            onClick={this.handleNext}
          >
            Next
          </button>
        </Paper>
      </div>
    );
  }
}

export default CreateBill;
