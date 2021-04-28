import React, { Component } from 'react'

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



export default class SpeciesCard extends React.Component {
  render(){
  return (
    <Col md="4" style={{marginTop:"10px"}}>
    <Card>

    <CardBody >
        <CardTitle tag="h5"><b>Scientific Name: </b> {this.props.scientificName}</CardTitle>
        <CardTitle tag="h5"><b>Vietnamese Name: </b> {this.props.VNName}</CardTitle>
        <CardSubtitle tag="h6" className="mb-2 text-muted">Status: {this.props.status}</CardSubtitle>
        {/* <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText> */}
        <Button>Button</Button>
    </CardBody>
    </Card>
    </Col>
        
  );
  }
}

