import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AddTask.css';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { useState , useEffect} from 'react';
import axios from 'axios';

const AddTasks = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [userList, setUserList] = useState();
    const [assignedTo, setAssignedTo] = useState("");

    const getUsers = async () => {
        try {
            //Get all non-admin users
            const userresponse = await axios.post(`${process.env.REACT_APP_API_URL}getnonadmin`,);
            const userList = userresponse.data;
            setUserList(userList);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getUsers();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (title === "" || description === "" || dueDate === "" ) {
                alert("Please enter all details");
                return;
            }
            const response = await axios.post(`${process.env.REACT_APP_API_URL}tasks`, {
                id : localStorage.getItem("userId"),
                title: title,
                description: description,
                dueDate: dueDate,
                assignedTo: assignedTo,
            });
            if (response.status === 200) {
                alert("Task Created Successfully");
                window.location.href = "/admindashboard";
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleButton = (e) => {
        e.preventDefault();
        window.location.href = "/admindashboard";
    };

    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={4}>
                    <Card>
                        <Card.Header className="text-center">
                            <h3>Add Task</h3>
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="formBasicTitle">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Title"
                                        onChange={(e) => setTitle(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="formBasicDescription">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        placeholder="Enter Description"
                                        rows={3}
                                        onChange={(e) => setDescription(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="formBasicDueDate">
                                    <Form.Label>Due Date</Form.Label>
                                    <Form.Control
                                        type="date"
                                        onChange={(e) => setDueDate(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="formBasicAssignedTo">
                                    <Form.Label>Assign To</Form.Label>
                                    <Form.Control
                                    as="select"
                                    value={assignedTo}
                                    onChange={(e) => setAssignedTo(e.target.value)}
                                    required
                                    >
                                    <option value="">Select a user</option>
                                    {userList?.map((user) => (
                                        <option key={user._id} value={user._id}>
                                        {user.name}
                                        </option>
                                    ))}
                                    </Form.Control>
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Add Task
                                </Button>
                                <Button variant="secondary" type="button" onClick={handleButton}>
                                    Cancel
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default AddTasks;
