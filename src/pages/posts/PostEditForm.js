import React, { useState, useRef, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Alert from "react-bootstrap/Alert";

import styles from "../../styles/PostCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

function PostEditForm() {
    const [errors, setErrors] = useState({});

    const [postData, setPostData] = useState({
        title: "",
        topic: "",
        image: "",
    });

    const { title, topic, image } = postData;

    const imageInput = useRef(null);
    const history = useHistory();
    const { id } = useParams();

    useEffect(() => {
        const handleMount = async () => {
            try {
                const { data } = await axiosReq.get(`/posts/${id}/`);
                const { title, topic, image, is_owner } = data;
                is_owner
                    ? setPostData({ title, topic: topic.toLowerCase(), image })
                    : history.push("/");
            } catch (err) {
                console.log(err);
            }
        };

        handleMount();
    }, [history, id]);

    // useEffect(() => {
    //     console.log("postData", postData);
    // }, [postData]);

    const handleChange = (e) => {
        console.log(e);
        setPostData({
            ...postData,
            [e.target.name]: e.target.value,
        });
    };

    const handleChangeImage = (e) => {
        if (e.target.files.length) {
            URL.revokeObjectURL(image);
            setPostData({
                ...postData,
                image: URL.createObjectURL(e.target.files[0]),
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", title);
        formData.append("topic", topic);
        if (imageInput?.current?.files[0]) {
            formData.append("image", imageInput.current.files[0]);
        }

        try {
            await axiosReq.put(`/posts/${id}/`, formData);
            history.push(`/posts/${id}`);
        } catch (err) {
            console.log(err);
            if (err.response?.status !== 401) {
                setErrors(err.response?.data);
            }
        }
    };

    const textFields = (
        <div className="text-center">
            <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control
                    type="text"
                    name="title"
                    value={title}
                    onChange={handleChange}
                />
            </Form.Group>
            {errors?.title?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}

            <Form.Group>
                <Form.Label>Topic</Form.Label>
                <Form.Control onChange={handleChange} as="select" name="topic">
                    <option value="">Choose a topic...</option>
                    <option value="funny" selected={topic === "funny"}>
                        Funny
                    </option>
                    <option value="wholesome" selected={topic === "wholesome"}>
                        Wholesome
                    </option>
                    <option value="wtf" selected={topic === "wtf"}>
                        WTF
                    </option>
                    <option
                        value="cryptocurrency"
                        selected={topic === "cryptocurrency"}
                    >
                        Cryptocurrency
                    </option>
                    <option value="animals" selected={topic === "animals"}>
                        Animals
                    </option>
                    <option value="awesome" selected={topic === "awesome"}>
                        Awesome
                    </option>
                    <option value="gaming" selected={topic === "gaming"}>
                        Gaming
                    </option>
                    <option value="meme" selected={topic === "meme"}>
                        Meme
                    </option>
                    <option
                        value="relationship"
                        selected={topic === "relationship"}
                    >
                        Relationship
                    </option>
                </Form.Control>
            </Form.Group>
            {errors?.topic?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}

            <Button
                className={`${btnStyles.Button} ${btnStyles.Blue}`}
                onClick={() => {
                    history.goBack();
                }}
            >
                cancel
            </Button>
            <Button
                className={`${btnStyles.Button} ${btnStyles.Blue}`}
                type="submit"
            >
                save
            </Button>
        </div>
    );

    return (
        <Form onSubmit={handleSubmit}>
            <Row>
                <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
                    <Container
                        className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
                    >
                        <Form.Group className="text-center">
                            <figure>
                                <Image
                                    className={appStyles.Image}
                                    src={image}
                                    rounded
                                />
                            </figure>
                            <div>
                                <Form.Label
                                    className={`${btnStyles.Button} ${btnStyles.Blue} btn`}
                                    htmlFor="image-upload"
                                >
                                    Change the image
                                </Form.Label>
                            </div>

                            <Form.File
                                id="image-upload"
                                accept="image/*"
                                onChange={handleChangeImage}
                                ref={imageInput}
                            />
                        </Form.Group>
                        {errors?.image?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>
                                {message}
                            </Alert>
                        ))}
                        <div className="d-md-none">{textFields}</div>
                    </Container>
                </Col>
                <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
                    <Container className={appStyles.Content}>
                        {textFields}
                    </Container>
                </Col>
            </Row>
        </Form>
    );
}

export default PostEditForm;
