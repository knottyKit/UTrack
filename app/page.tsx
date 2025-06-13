import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const page = () => {
  const route = useRouter();

  useEffect(() => {
    route.push("/addActivity");
  }, []);
  return <div>Redirecting...</div>;
};

export default page;
