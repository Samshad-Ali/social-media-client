import React from "react";
import Avatar from "../avatar/Avatar";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { likeAndDislikeThunk } from "../../redux/slices/potsSlice";
import { useNavigate } from "react-router-dom";
import { showToast } from "../../redux/slices/appConfigSlice";
import { TOAST_SUCCESS } from "../../App";
const Post = ({ post }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLikeBtn = async () => {
    dispatch(
      likeAndDislikeThunk({
        postId: post._id,
      })
    );
    dispatch(showToast({
      type:TOAST_SUCCESS,
      message:"like or unlike"
    }));
  };
  return (
    <div className="post">
      <header
        className="heading cursor"
        onClick={() => {
          navigate(`/profile/${post?.owner?._id}`);
        }}
      >
        <Avatar imgSrc={post?.owner?.avatar?.url} />
        <h4 className="name-heading">{post?.owner?.name}</h4>
      </header>
      <main className="content">
        <img src={post?.image?.url} alt="post-photo" />
      </main>
      <footer className="footer">
        <div className="like cursor" onClick={handleLikeBtn}>
          {post?.isLike ? (
            <AiFillHeart style={{ color: "red" }} className="like-icons" />
          ) : (
            <AiOutlineHeart className="like-icons" />
          )}
          <h4>{`${post?.likesCount} likes`}</h4>
        </div>
        <p className="caption">{post?.caption}</p>
        <h6 className="time-ago">{post?.timeAgo}</h6>
      </footer>
    </div>
  );
};

export default Post;
