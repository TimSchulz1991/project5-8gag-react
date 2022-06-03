import React, { useState, useEffect } from "react";
// the change of import shouldn't affect things, but this is just to keep inline with the lessons
// you can test it to see if using react-router-dom works again, now that the 'undefined' error is also removed
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import Post from "./Post";

function PostPage() {
    const { id } = useParams();
    const [post, setPost] = useState({ results: [] });

    useEffect(() => {
      const handleMount = async () => {
          try {
              const [{ data: post }] = await Promise.all([
                  axiosReq.get(`/posts/${id}`),
                  // axiosReq.get(`/comments/?post=${id}`),
              ]);
              setPost({ results: [post] });
              console.log(post);
              // setComments(comments);
          } catch (err) {
              console.log(err);
          }
      };
      handleMount();
  }, [id]);

    return (
        <Row className="h-100">
            <Col className="py-2 p-0 p-lg-2" lg={{ span: 8, offset: 2 }}>
                <Post {...post.results[0]} setPosts={setPost} postPage />
                <Container className={appStyles.Content}>Comments</Container>
            </Col>
        </Row>
    );
}

export default PostPage;
