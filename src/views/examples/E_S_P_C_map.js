import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
  CardImg, 
  CardText,
  CardSubtitle,
  CardDeck
} from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import LandingPageHeader from "components/Headers/LandingPageHeader.js";
import DictionaryHeader from "components/Headers/DictionaryHeader.js"
import DemoFooter from "components/Footers/DemoFooter.js";
import SectionCarousel from "../index-sections/SectionCarousel";
import SpeciesCardDeck from "../../components/Cards/SpeciesCardDeck.js"

function AnimalDictionary() {
  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("animals-dictionary");
    return function cleanup() {
      document.body.classList.remove("animals-dictionary");
    };
  });
  return (
    <>
      <ExamplesNavbar />
      <DictionaryHeader />
      <SectionCarousel />
      
      <div className="main">
        <div className="section text-center">
          <Container>
          <SpeciesCardDeck />
            <Row>
              <Col className="ml-auto mr-auto" md="10">
                <h2 className="title">Search your animals data here.<i aria-hidden={true} className="nc-icon nc-zoom-split" /></h2>
                
              </Col>
              <Col sm="6" md={{ size: 6, offset: 3 }}>
                <InputGroup>
                  <Input placeholder="Species" className="search_engine" type="text" />
                  <InputGroupAddon addonType="append">
                    <InputGroupText>
                     
                    </InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
              </Col>
            </Row>
            <br />
            <br />
            <br />
            <Row>
            <CardDeck className="all_species">
              <Card>
                <CardImg top width="100%" src="https://images.unsplash.com/photo-1544640808-32ca72ac7f37?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80" alt="Card image cap" />
                <CardBody>
                  <CardTitle tag="h5">Card title</CardTitle>
                  <CardSubtitle tag="h6" className="mb-2 text-muted">Card subtitle</CardSubtitle>
                  <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
                  <Button>Button</Button>
                </CardBody>
              </Card>
              <Card>
                <CardImg top width="100%" src="https://images.unsplash.com/photo-1568667256549-094345857637?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=658&q=80" alt="Card image cap" />
                <CardBody>
                  <CardTitle tag="h5">Card title</CardTitle>
                  <CardSubtitle tag="h6" className="mb-2 text-muted">Card subtitle</CardSubtitle>
                  <CardText>This card has supporting text below as a natural lead-in to additional content.</CardText>
                  <Button>Button</Button>
                </CardBody>
              </Card>
              <Card>
                <CardImg top width="100%" src="https://images.unsplash.com/photo-1555116505-38ab61800975?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80" alt="Card image cap" />
                <CardBody>
                  <CardTitle tag="h5">Card title</CardTitle>
                  <CardSubtitle tag="h6" className="mb-2 text-muted">Card subtitle</CardSubtitle>
                  <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</CardText>
                  <Button>Button</Button>
                </CardBody>
              </Card>
            </CardDeck>
            </Row>
            <br />
            <br />

          </Container>
        </div>
        
        <div className="section landing-section">
          <Container>
            <Row>
              <Col className="ml-auto mr-auto" md="8">
                <h2 className="text-center">Keep in touch?</h2>
                <Form className="contact-form">
                  <Row>
                    <Col md="6">
                      <label>Name</label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="nc-icon nc-single-02" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Name" type="text" />
                      </InputGroup>
                    </Col>
                    <Col md="6">
                      <label>Email</label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="nc-icon nc-email-85" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Email" type="text" />
                      </InputGroup>
                    </Col>
                  </Row>
                  <label>Message</label>
                  <Input
                    placeholder="Tell us your thoughts and feelings..."
                    type="textarea"
                    rows="4"
                  />
                  <Row>
                    <Col className="ml-auto mr-auto" md="4">
                      <Button className="btn-fill" color="danger" size="lg">
                        Send Message
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
      <DemoFooter />
    </>
  );
}

export default AnimalDictionary;
