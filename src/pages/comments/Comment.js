import React, { useState } from "react";
import { Media } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import styles from "../../styles/Comment.module.css";
import { useCurrentUser } from "../../context/CurrentUserContext";
import { MoreDropdown } from "../../components/MoreDropdown";
import CommentEditForm from "./CommentEditForm";
import { axiosRes } from "../../api/axiosDefaults";

const Comment = (props) => {
    const {
        profile_id,
        profile_image,
        owner,
        updated_at,
        content,
        id,
        setPost,
        setComments,
    } = props;

    const currentUser = useCurrentUser();
    const isOwner = currentUser?.username === owner;
    const [showEditForm, setShowEditForm] = useState(false);

    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/comments/${id}/`);
            setPost((prevPost) => ({
                results: [
                    {
                        ...prevPost.results[0],
                        comments_count: prevPost.results[0].comments_count - 1,
                    },
                ],
            }));

            setComments((prevComments) => ({
                ...prevComments,
                results: prevComments.results.filter(
                    (comment) => comment.id !== id
                ), // ???
            }));
        } catch (err) {}
    };

    return (
        <div>
            <hr />
            <Media>
                <Link to={`/profiles/${profile_id}`}>
                    <Avatar src={profile_image} />
                </Link>
                
                <Media.Body className="align-self-center ml-2">
                    <div className="d-flex align-items-center">
                        <span className={styles.Owner}>{owner}</span>
                        <span className={`${styles.Date} ml-auto`}>{updated_at}</span>
                        <span>
                            {isOwner && !showEditForm && (
                                <MoreDropdown
                                    handleEdit={() => setShowEditForm(true)}
                                    handleDelete={handleDelete}
                                />
                            )}
                        </span>
                    </div>
                    {showEditForm ? (
                        <CommentEditForm
                            id={id}
                            profile_id={profile_id}
                            content={content}
                            profileImage={profile_image}
                            setComments={setComments}
                            setShowEditForm={setShowEditForm}
                        />
                    ) : (
                        <p>{content}</p>
                    )}
                </Media.Body>
            </Media>
        </div>
    );
};

export default Comment;
