import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Form, Button } from 'react-bootstrap';

// Components
import Message from '../components/Message';
import LoadingSpinner from '../components/LoadingSpinner';
import FormContainer from '../components/UI/FormContainer';
import Meta from '../components/Meta';

// Redux actions
import { register } from '../redux/actions/userActions';

const RegisterScreen = (props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);

    const dispatch = useDispatch();
    const userRegister = useSelector(state => state.userRegister);
    const { loading, error, userInfo } = userRegister;

    // If there is a ?redirect or not (redirect to shipping for newly registered users who register after clicking checkout)
    const redirect = props.location.search ? props.location.search.split('=')[1] : '/';

    // If user is already logged in or got logged in after registration
    useEffect(() => {
        if(userInfo) {
            props.history.push(redirect);
        }
    }, [userInfo, props.history, redirect]);

    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
        }
        else {
            dispatch(register(name, email, password));
        }
    }


    return <FormContainer>
        <Meta title='Webay| Register' />
        <h1>Register</h1>
        {message && <Message message={message} />}
        {error && <Message message={error} />}
        {loading && <LoadingSpinner />}
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type='name'
                    placeholder='Enter your name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                ></Form.Control>
            </Form.Group>
            <Form.Group controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                    type='email'
                    placeholder='Enter email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type='password'
                    placeholder='Enter password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
            </Form.Group>
            <Form.Group controlId='confirmPassword'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                    type='password'
                    placeholder='Confirm your password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary' className='my-3'>Register</Button>
        </Form>

        <Row className='py-3'>
            <Col>
                Have an account?{' '}<Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Sign In</Link>
            </Col>
        </Row>
    </FormContainer>
}

export default RegisterScreen;