"use client";
import React, { useEffect, useState } from "react";
import { Button, Divider, Flex } from "@aws-amplify/ui-react";
import Link from "next/link";
import { signOut } from "aws-amplify/auth";
import { useRouter } from "next/navigation";
import { Hub } from "aws-amplify/utils";
import { useTransition } from "react";

const NavBar = ({ isSignedIn }: { isSignedIn: boolean }) => {
  const [authCheck, setAuthCheck] = useState(isSignedIn);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  useEffect(() => {
    const hubListenerCancel = Hub.listen("auth", (data) => {
      switch (data.payload.event) {
        case "signedIn":
          setAuthCheck(true);
          startTransition(() => router.push("/"));
          startTransition(() => router.refresh());
          break;
        case "signedOut":
          setAuthCheck(false);
          startTransition(() => router.push("/"));
          startTransition(() => router.refresh());

          break;
      }
    });
    return () => hubListenerCancel();
  }, [router]);
  const defaultRoutes = [
    {
      href: "/",
      label: "Home",
    },

    {
      href: "/add",
      label: "Add Title",
      loggedIn: true,
    },
  ];

  const routes = defaultRoutes.filter(
    (route) => route.loggedIn === isSignedIn || route.loggedIn === undefined
  );
  const signInSignOut = async () => {
    if (isSignedIn) {
      await signOut();
    } else {
      router.push("/signin");
    }
  };
  return (
    <>
      <Flex
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        padding={"1rem"}
      >
        <Flex as="nav" alignItems={"center"} gap={"3rem"} margin={"0 2rem"}>
          {routes.map((route) => (
            <Link key={route.href} href={route.href}>
              {route.label}
            </Link>
          ))}
        </Flex>
        <Button
          variation="primary"
          borderRadius={"2rem"}
          className="mr -4"
          onClick={signInSignOut}
        >
          {authCheck ? "Sign Out" : "Sign In"}
        </Button>
      </Flex>
      <Divider size="small"></Divider>
    </>
  );
};

export default NavBar;
