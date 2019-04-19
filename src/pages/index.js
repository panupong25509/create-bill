import React from "react";
import styled from "styled-components";

const Box = styled.div`
  border: 1px solid green;
  border-radius: 8px;
`;
class Index extends React.Component {
  state = {
    a: [
      {
        title: "a"
      }
    ]
  };
  handledata = async (name, va) => {
    const data = this.state.a;
    await this.setState({
      a: [
        ...data,
        {
          title: "b"
        }
      ]
    });
    console.log(this.state.a);
  };
  render() {
    // console.log(this.state.a);
    return (
      <div>
        <div className="container">
          <Box className="col-12 col-sm-10 mx-auto mt-5 p-3 text-center">
            <a href="/pdf">
              <button type="button" class="btn btn-success">
                Create Bill +
              </button>
            </a>
          </Box>
          <button
            onClick={() => this.handledata("name", "C")}
            type="button"
            class="btn btn-success"
          >
            Change name
          </button>
          <button
            onClick={() => this.handledata("age", 19)}
            type="button"
            class="btn btn-success"
          >
            Change age
          </button>
        </div>
      </div>
    );
  }
}

export default Index;
