"use client";
import React from "react";
import { Amplify } from "aws-amplify";
import config from "@/../amplify_outputs.json";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

Amplify.configure(config, { ssr: true });

const Auth = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Authenticator.Provider>{children}</Authenticator.Provider>
    </>
  );
};

export default Auth;
