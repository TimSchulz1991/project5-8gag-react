import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Badge from "react-bootstrap/Badge";

import Post from "./Post";
import Asset from "../../components/Asset";

import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import styles from "../../styles/PostsPage.module.css";
import { useLocation } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

import NoResults from "../../assets/no-results.png";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import { useCurrentUser } from "../../context/CurrentUserContext";



function PostsPage({ message, filter = "" }) {
  const [posts, setPosts] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();
  const currentUser = useCurrentUser();

  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/?${filter}search=${query}`);
        setPosts(data);
        setHasLoaded(true);
      } catch (err) {
        // console.log(err);
      }
    };

    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchPosts();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [filter, query, pathname, currentUser]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2 mx-4" lg={8}>

        <i className={`fas fa-search ${styles.SearchIcon}`} />
        <Form
          className={styles.SearchBar}
          onSubmit={(event) => event.preventDefault()}
        >
          <Form.Control
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            type="text"
            className="mr-sm-2"
            placeholder="Search posts"
          />
        </Form>

        {hasLoaded ? (
          <>
            {posts.results.length ? (
              <InfiniteScroll
              children={posts.results.map((post) => (
                  <Post
                      key={post.id}
                      {...post}
                      setPosts={setPosts}
                  />
              ))}
              dataLength = {posts.results.length}
              loader = {<Asset spinner />}
              hasMore = {!!posts.next}
              next={() => fetchMoreData(posts, setPosts)}
          />  
            ) : (
              <Container className={appStyles.Content}>
                <Asset src={NoResults} message={message} />
              </Container>
            )}
          </>
        ) : (
          <Container className={appStyles.Content}>
            <Asset spinner />
          </Container>
        )}
      </Col>
      <Col lg={3} className="d-none d-lg-block">
        <h3 className="text-center mt-3">Topics</h3>
        <Badge variant="info" pill className={`${styles.Badge}`}>Funny</Badge>
        <Badge variant="info" pill className={`${styles.Badge}`}>Wholesome</Badge>
        <Badge variant="info" pill className={`${styles.Badge}`}>WTF</Badge>
        <Badge variant="info" pill className={`${styles.Badge}`}>Cryptocurrency</Badge>
        <Badge variant="info" pill className={`${styles.Badge}`}>Animals</Badge>
        <Badge variant="info" pill className={`${styles.Badge}`}>Awesome</Badge>
        <Badge variant="info" pill className={`${styles.Badge}`}>Gaming</Badge>
        <Badge variant="info" pill className={`${styles.Badge}`}>Meme</Badge>
        <Badge variant="info" pill className={`${styles.Badge}`}>Relationship</Badge>
      </Col>
    </Row>
  );
}

export default PostsPage;