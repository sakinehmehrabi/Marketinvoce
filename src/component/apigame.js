import { Component} from 'react';
import React from 'react';
import { Button, Card, Accordion, Container, Row, Col, ListGroup, Tab  } from 'react-bootstrap';

export default class ApiGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    fetch("https://www.anapioficeandfire.com/api/houses")
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          this.setState({
            isLoaded: true,
            items: result
          })
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }
render(){
  const { error, isLoaded, items } = this.state;
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
    <Container>
    <Row>
      <img src="somebackground.jpg" style={{height:'200px', width:'100%'}}/>
    </Row>
    <Row>
      <Tab.Container defaultActiveKey="#https://www.anapioficeandfire.com/api/houses/1">
        <Row>
          <Col sm={4}>
            <ListGroup >
            {items.map(item => (
                      <ListGroup.Item role="tab" key={item.url} action href={"#"+item.url}>
                        {item.name}
                      </ListGroup.Item>
              ))}
              </ListGroup>
            </Col>
            <Col sm={8}>
            <Tab.Content>
              {items.map(item=>(
                    <Tab.Pane eventKey={"#"+item.url}  role="tabpanel">
                      <Card>
                        <Card.Body>
                        <Card.Title>{item.name}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted" >{item.region}</Card.Subtitle>
                        <Card.Text>{item.coatOfArms}</Card.Text>
                        <Card.Body>
                        <Card.Link href={item.url}>{item.url}</Card.Link>
                        <Card.Text>{item.words}</Card.Text>
                        {item.titles.length>0 && <Card.Text>{item.titles}</Card.Text>}
                        {item.seats.length>0 && <Card.Text>{item.seats}</Card.Text>}
                        <Card.Text>{item.currentLord}</Card.Text>
                        <Card.Text>{item.heir}</Card.Text>
                        <Card.Text>{item.overlord}</Card.Text>
                        <Card.Text>{item.founded}</Card.Text>
                        <Card.Text>{item.founder}</Card.Text>
                        <Card.Text>{item.diedOut}</Card.Text>
                        {item.ancestralWeapons.length>0 && <Card.Text>{item.ancestralWeapons}</Card.Text>}
                        {item.cadetBranches.length>0 &&
                        <div>cadetBranches:<br/>
                          {
                            item.cadetBranches.map(
                              (cadetBranche)=>(
                                <div><Card.Link href={cadetBranche}>{cadetBranche}</Card.Link></div>
                              )
                            )
                          }
                        </div>
                      }
                        {
                          item.swornMembers.length>0 &&
                          <div>swornMembers:<br/>
                          {
                            item.swornMembers.map(
                              (swornMember)=>(
                                <div><Card.Link href={swornMember}>{swornMember}</Card.Link></div>
                              )
                            )
                          }
                          </div>
                        }
                        </Card.Body>
                        </Card.Body>
                      </Card>
                    </Tab.Pane>
              ))}
              </Tab.Content>

              </Col>
            </Row>
          </Tab.Container>
        </Row>
          <Row>
           Footer Goes here
          </Row>
      </Container>
  );}
 }
}
