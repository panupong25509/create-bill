import React from "react";
import styled from "styled-components";

const Box = styled.div`
  border: 1px solid green;
  border-radius: 8px;
`;
class Index extends React.Component {
  render() {
    return (
      <div>
        <div className="container">
          <Box className="col-12 col-sm-10 mx-auto mt-5 p-3 text-center">
            <a href="/createbill">
              <button type="button" class="btn btn-success">
                Create Bill +
              </button>
            </a>
          </Box>
        </div>
      </div>
    );
  }
}

export default Index;
