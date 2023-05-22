"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

import Profile from "@components/Profile";

const ProfileById = () => {
  const router = useRouter();
  const params = useParams();
  const userId = params.id;

  const [posts, setPosts] = useState([])
  const [user, setUser] = useState([])

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`/api/users/${params.user_id}`, {
        method: 'GET'
      })
      const data = await response.json();

      setUser({
        username: data.username,
        email: data.email
      })
    }

    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params.user_id}/posts`);
      const data = await response.json();

      setPosts(data);
    }

    if(params.user_id) {
      fetchUser();
      fetchPosts();
    }
  }, [params.user_id]);

  return (
    <Profile 
      name={user?.username}
      desc={`Welcome to ${user?.username}'s profile page`}
      data={posts}
    />
  )
}

export default ProfileById