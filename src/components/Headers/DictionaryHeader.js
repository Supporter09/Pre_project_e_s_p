import React from "react";

// reactstrap components
// import { Button, Container } from "reactstrap";
import {
  Button,
  Label,
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
  CustomInput,
} from "reactstrap";

// Others components

// core components

function DictionaryHeader() {
  let pageHeader = React.createRef();

  React.useEffect(() => {
    if (window.innerWidth < 991) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        pageHeader.current.style.transform =
          "translate3d(0," + windowScrollTop + "px,0)";
      };
      window.addEventListener("scroll", updateScroll);
      return function cleanup() {
        window.removeEventListener("scroll", updateScroll);
      };
    }
  });

  return (
    <>
      <div
        style={{
          backgroundImage:
          
            "url(" + require("assets/img/alfons-morales.jpg").default + ")",
        }}
        className="page-header"
        data-parallax={true}
        ref={pageHeader}
      >
        <div className="filter" />
        <Container>
          <div className="motto text-center">
            <h1>The beautiful thing about learning is nobody can take it away from you.</h1>
            <h3>Finding animals data via one click.</h3>
            <br />
            
            <Button className="btn-round" color="neutral" type="button" outline>
              Get Started
            </Button>
          </div>
        </Container>
      </div>
    </>
  );
}

export default DictionaryHeader;
