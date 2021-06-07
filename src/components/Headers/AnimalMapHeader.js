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

function AnimalMapHeader() {
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
          
            "url(" + require("assets/img/pexels-aaditya-arora.jpg").default + ")",
        }}
        className="page-header"
        data-parallax={true}
        ref={pageHeader}
      >
        <div className="filter" />
        <Container>
          <div className="motto text-center">
            <h1>FIND, READ and PROTECT</h1>
            <h3>Finding animals around you</h3>
            <br />
            
            <a href={"#section1"}>
              <Button className="btn-round" color="neutral" type="button" outline>
                Get Started
              </Button>              
            </a>

          </div>
        </Container>
      </div>
    </>
  );
}

export default AnimalMapHeader;
