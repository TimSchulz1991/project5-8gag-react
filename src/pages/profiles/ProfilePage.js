import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";

import Asset from "../../components/Asset";
import NoResults from "../../assets/no-results.png";
import Post from "../posts/Post";

import styles from "../../styles/ProfilePage.module.css";
import appStyles from "../../App.module.css";

import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import { fetchMoreData } from "../../utils/utils";
import { ProfileEditDropdown } from "../../components/MoreDropdown";

import InfiniteScroll from "react-infinite-scroll-component";
import { useHistory } from "react-router-dom";

function ProfilePage() {
    const [hasLoaded, setHasLoaded] = useState(false);
    const [profilePosts, setProfilePosts] = useState({ results: [] });

    const { id } = useParams();
    const [profileData, setProfileData] = useState({
        pageProfile: { results: [] },
    });
    const [profile] = profileData.pageProfile.results;
    const history = useHistory();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [{ data: pageProfile }, { data: profilePosts }] =
                    await Promise.all([
                        axiosReq.get(`/profiles/${id}/`),
                        axiosReq.get(`/posts/?owner__profile=${id}`),
                    ]);
                setProfileData((prevState) => ({
                    ...prevState,
                    pageProfile: { results: [pageProfile] },
                }));
                setProfilePosts(profilePosts);
                setHasLoaded(true);
            } catch (err) {
                // console.log(err);
                if (err.response?.status !== 404) {
                    history.push("/");
                }
                if (err.response?.status !== 400) {
                    history.push("/");
                }
            }
        };
        fetchData();
    }, [id, setProfileData, history]);

    const mainProfile = (
        <>
            {profile?.is_owner && <ProfileEditDropdown id={profile?.id} />}
            <Row noGutters className="px-3 text-center">
                <Col lg={3} className="text-lg-left">
                    <Image
                        className={styles.ProfileImage}
                        roundedCircle
                        src={profile?.image}
                    />
                </Col>
                <Col lg={6}>
                    <h3 className="m-2">{profile?.owner}</h3>
                    <Row className="justify-content-center no-gutters">
                        <Col xs={3} className="my-2">
                            <div>{profile?.posts_count}</div>
                            <div>posts</div>
                        </Col>
                    </Row>
                </Col>
                <Col lg={3}></Col>

                {profile?.content && (
                    <Col className={`p-3 ${styles.Bio}`}>
                        Bio: <br></br> {profile.content}
                    </Col>
                )}
            </Row>
        </>
    );

    const mainProfilePosts = (
        <>
            <hr />
            <h4 className="text-center">{profile?.owner}'s posts</h4>
            <hr />
            {profilePosts.results.length ? (
                <InfiniteScroll
                    children={profilePosts.results.map((post) => (
                        <Post
                            key={post.id}
                            {...post}
                            setPosts={setProfilePosts}
                        />
                    ))}
                    dataLength={profilePosts.results.length}
                    loader={<Asset spinner />}
                    hasMore={!!profilePosts.next}
                    next={() => fetchMoreData(profilePosts, setProfilePosts)}
                />
            ) : (
                <Asset
                    src={NoResults}
                    message={`No results found, ${profile?.owner} hasn't posted yet.`}
                />
            )}
        </>
    );

    return (
        <Row>
            <Col className="py-2 p-0 p-lg-2" lg={{ span: 8, offset: 2 }}>
                <Container
                    className={`${appStyles.Content} ${appStyles.ContentBorder}`}
                >
                    {hasLoaded ? (
                        <>
                            {mainProfile}
                            {mainProfilePosts}
                        </>
                    ) : (
                        <Asset spinner />
                    )}
                </Container>
            </Col>
        </Row>
    );
}

export default ProfilePage;
