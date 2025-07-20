"use client";

import { useParams } from "next/navigation";

function SingleUserPage() {
  const { userId } = useParams();
  console.log(userId);
  // get user data by id
  return <div>single user page</div>;
}

export default SingleUserPage;
