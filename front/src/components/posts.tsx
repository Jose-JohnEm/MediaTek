import { Card } from "@mui/material";
import { Col, Container, Row } from "react-bootstrap";
import { cardStyle } from '../components/style'

export function ImagePost() {
    return (
        <div>
            <Card
                variant="outlined"
                sx={cardStyle}
            >
                <Container>
                    <Row>
                        <Col xs={12} md={8}>
                        xs=12 md=8
                        </Col>
                        <Col xs={6} md={4}>
                        xs=6 md=4
                        </Col>
                    </Row>
                </Container>
            </Card>
        </div>
    )
}
