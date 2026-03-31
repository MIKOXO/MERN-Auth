import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import FormContainer from '../components/FormContainer';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
  };

  return (
    <FormContainer>
      <h1 className='text-center'>Sign In</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group className='my-2' controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email address'
            value={email}
            onChange={(e) => setEmail(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}></Form.Control>
        </Form.Group>

        <div className='d-grid'>
          <Button type='submit' variant='primary' className='mt-3'>
            Sign In
          </Button>
        </div>

        <Row className='py-3'>
          <Col>
            Don't have an account <Link to='/register'>Register</Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
};

export default LoginPage;
