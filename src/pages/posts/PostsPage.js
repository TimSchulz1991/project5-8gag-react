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
            <Col className="py-2 p-0 p-lg-2 mx-4" md={8}>
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
                            className={styles.Clear}
                            onClick={() => setQuery("")}
                        >
                            CLEAR
                        </div>
                    </div>
                </Form>
                <div>
                    <Col className="d-md-none mb-4">
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
                            onClick={() => setTopic("wholesome")}
                        >
                            Wholesome
                        </Button>
                        <Button
                            variant="info"
                            className={`${styles.Button} py-0 mr-2 mb-2`}
                            onClick={() => setTopic("wtf")}
                        >
                            WTF
                        </Button>
                        <Button
                            variant="info"
                            className={`${styles.Button} py-0 mr-2 mb-2`}
                            onClick={() => setTopic("cryptocurrency")}
                        >
                            Cryptocurrency
                        </Button>
                        <Button
                            variant="info"
                            className={`${styles.Button} py-0 mr-2 mb-2`}
                            onClick={() => setTopic("animals")}
                        >
                            Animals
                        </Button>
                        <Button
                            variant="info"
                            className={`${styles.Button} py-0 mr-2 mb-2`}
                            onClick={() => setTopic("awesome")}
                        >
                            Awesome
                        </Button>
                        <Button
                            variant="info"
                            className={`${styles.Button} py-0 mr-2 mb-2`}
                            onClick={() => setTopic("gaming")}
                        >
                            Gaming
                        </Button>
                        <Button
                            variant="info"
                            className={`${styles.Button} py-0 mr-2 mb-2`}
                            onClick={() => setTopic("meme")}
                        >
                            Meme
                        </Button>
                        <Button
                            variant="info"
                            className={`${styles.Button} py-0 mr-2 mb-2`}
                            onClick={() => setTopic("relationship")}
                        >
                            Relationship
                        </Button>
                    </Col>
                </div>
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
            <Col md={3} className="d-none d-md-block">
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
                    onClick={() => setTopic("wholesome")}
                >
                    Wholesome
                </Button>
                <Button
                    variant="info"
                    className={`${styles.Button} py-0 mr-2 mb-2`}
                    onClick={() => setTopic("wtf")}
                >
                    WTF
                </Button>
                <Button
                    variant="info"
                    className={`${styles.Button} py-0 mr-2 mb-2`}
                    onClick={() => setTopic("cryptocurrency")}
                >
                    Cryptocurrency
                </Button>
                <Button
                    variant="info"
                    className={`${styles.Button} py-0 mr-2 mb-2`}
                    onClick={() => setTopic("animals")}
                >
                    Animals
                </Button>
                <Button
                    variant="info"
                    className={`${styles.Button} py-0 mr-2 mb-2`}
                    onClick={() => setTopic("awesome")}
                >
                    Awesome
                </Button>
                <Button
                    variant="info"
                    className={`${styles.Button} py-0 mr-2 mb-2`}
                    onClick={() => setTopic("gaming")}
                >
                    Gaming
                </Button>
                <Button
                    variant="info"
                    className={`${styles.Button} py-0 mr-2 mb-2`}
                    onClick={() => setTopic("meme")}
                >
                    Meme
                </Button>
                <Button
                    variant="info"
                    className={`${styles.Button} py-0 mr-2 mb-2`}
                    onClick={() => setTopic("relationship")}
                >
                    Relationship
                </Button>
            </Col>
        </Row>
    );
}

export default PostsPage;
