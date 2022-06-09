import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

import Post from "./Post";
import Asset from "../../components/Asset";

import appStyles from "../../App.module.css";
import styles from "../../styles/PostsPage.module.css";
import { useLocation } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

import NoResults from "../../assets/no-results.png";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import { useCurrentUser } from "../../context/CurrentUserContext";

function PostsPage({ message, filter = "" }) {
    const [posts, setPosts] = useState({ results: [] });
    const [topic, setTopic] = useState(null);
    const [hasLoaded, setHasLoaded] = useState(false);
    const { pathname } = useLocation();
    const currentUser = useCurrentUser();
    const [query, setQuery] = useState("");

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const { data } = await axiosReq.get(
                    `/posts/?${filter}search=${query}${
                        topic !== null ? `&topic=${topic}` : ""
                    }`
                );
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
    }, [filter, query, pathname, currentUser, topic]);

    return (
        <Row className="h-100">
            <Col className="py-2 p-0 p-lg-2 mx-4" lg={8}>
                <i className={`fas fa-search ${styles.SearchIcon}`} />
            
                <Form
                    className={styles.SearchBar}
                    onSubmit={(event) => event.preventDefault()}
                >
                    <div style={{ position: "relative" }}>
                        <Form.Control
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                            type="text"
                            className="mr-sm-2"
                            placeholder="Search posts"
                        />
                        <div
                            style={{
                                position: "absolute",
                                top: "10px",
                                right: "14px",
                                fontSize: "0.9rem",
                                color: "black",
                                cursor: "pointer",
                            }}
                            onClick={() => setQuery("")}
                        >
                            CLEAR
                        </div>
                    </div>
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
                                dataLength={posts.results.length}
                                loader={<Asset spinner />}
                                hasMore={!!posts.next}
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
                <h3 className="text-center my-3">Topics</h3>
                <Button
                    variant="info"
                    className={`${styles.Button} py-0 mr-2 mb-2`}
                    onClick={() => setTopic(null)}
                >
                    All topics
                </Button>
                <Button
                    variant="info"
                    className={`${styles.Button} py-0 mr-2 mb-2`}
                    onClick={() => setTopic("funny")}
                >
                    Funny
                </Button>
                <Button
                    variant="info"
                    className={`${styles.Button} py-0 mr-2 mb-2`}
                >
                    Wholesome
                </Button>
                <Button
                    variant="info"
                    className={`${styles.Button} py-0 mr-2 mb-2`}
                >
                    WTF
                </Button>
                <Button
                    variant="info"
                    className={`${styles.Button} py-0 mr-2 mb-2`}
                >
                    Cryptocurrency
                </Button>
                <Button
                    variant="info"
                    className={`${styles.Button} py-0 mr-2 mb-2`}
                >
                    Animals
                </Button>
                <Button
                    variant="info"
                    className={`${styles.Button} py-0 mr-2 mb-2`}
                >
                    Awesome
                </Button>
                <Button
                    variant="info"
                    className={`${styles.Button} py-0 mr-2 mb-2`}
                >
                    Gaming
                </Button>
                <Button
                    variant="info"
                    className={`${styles.Button} py-0 mr-2 mb-2`}
                >
                    Meme
                </Button>
                <Button
                    variant="info"
                    className={`${styles.Button} py-0 mr-2 mb-2`}
                >
                    Relationship
                </Button>
            </Col>
        </Row>
    );
}

export default PostsPage;
