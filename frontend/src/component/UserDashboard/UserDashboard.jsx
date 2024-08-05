import React from 'react';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './UserDashboard.css';
import { Container, Row, Col, Button, Table } from 'react-bootstrap';
import { FaCheck } from 'react-icons/fa';
import Header from '../Header/Header.jsx' 
import axios from 'axios';

const AdminDashboard = () => {
  if(localStorage.getItem("position") !== "user" || localStorage.getItem("token") === null){
    window.location.href = "/";
  }
  const [onGoing, setOnGoing] = useState();
  const [completed, setCompleted] = useState();

  //Mark Task as Done
  const markDone = async (id) => {
    try{
      const response = await axios.patch(`${process.env.REACT_APP_API_URL}markdone/${id}`);
      if(response.status === 200){
        alert("Task marked as done");
        getTasks();
      }
    }catch(error){
      console.log(error);
    }
  }

  async function getTasks(){
    try{
      //Get all on-going tasks
      const onGoingresponse = await axios.post(`${process.env.REACT_APP_API_URL}gettask`,);
      const onGoingdata = onGoingresponse.data;
      setOnGoing(onGoingdata);
      console.log(onGoingdata);

      //Get all completed tasks
      const completedresponse = await axios.post(`${process.env.REACT_APP_API_URL}getcompletedtask`,);
      const completeddata = completedresponse.data;
      setCompleted(completeddata);
      console.log(completeddata);
    }catch(error){
      console.log(error);
    }
  }
  useEffect(() => {
    getTasks();
  }, []);
  return (
    <>
    <Header/>
    <Container>
      <Row className="align-items-center mb-3">
        <Col md={10}>
          <h3 className="text-center">Tasks</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Task</th>
                <th>Description</th>
                <th>Created By</th>
                <th>Assigned To</th>
                <th>Created Date</th>
                <th>Deadline</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {onGoing && onGoing.length > 0 ? (
                onGoing.map((task) => (
                  <tr key={task._id}>
                    <td>{task.title}</td>
                    <td>{task.description}</td>
                    <td>{task.adminName}</td>
                    <td>{task.assignedName}</td>
                    <td>{new Date(task.createdAt).toLocaleDateString()}</td>
                    <td>{new Date(task.dueDate).toLocaleDateString()}</td>
                    <td>
                      <Button variant="success" size="sm" className="mr-2" onClick={() => markDone(task._id)}>
                        <FaCheck />
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">No tasks found</td>
                </tr>
              )}
              {/* Additional rows can be added here */}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col>
          <h3 className="text-center mb-3">Completed Tasks</h3>
          <Table striped bordered hover>
            <thead>
            <tr>
                <th>Task</th>
                <th>Description</th>
                <th>Created By</th>
                <th>Assigned To</th>
                <th>Created Date</th>
                <th>Deadline</th>
              </tr>
            </thead>
            <tbody>
              {completed && completed.length > 0 ? (
                completed.map((task) => (
                  <tr key={task.id}>
                    <td>{task.title}</td>
                    <td>{task.description}</td>
                    <td>{task.adminName}</td>
                    <td>{task.assignedName}</td>
                    <td>{new Date(task.createdAt).toLocaleDateString()}</td>
                    <td>{new Date(task.dueDate).toLocaleDateString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">No tasks found</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
    </>
  );
};

export default AdminDashboard;