import React from "react";
import { AuthError } from "../Redux/User/action";
// "errors":{
//     "body": [
//       "can't be empty"
//     ]
//   }

interface Props {
  errors: AuthError;
}
export default function ErrorMessage(props: Props): JSX.Element {
  const { errors } = props;
  if (errors["email or password"]) {
    errors["email or password"].map((message, i) => (
      <li key={i}>{"email or password " + message}</li>
    ));
  }
  return (
    <ul className="error-messages">
      {errors.username?.map((message, i) => (
        <li key={i}>{"username " + message}</li>
      ))}
      {errors.email?.map((message, i) => (
        <li key={i}>{"email " + message}</li>
      ))}
      {errors.password?.map((message, i) => (
        <li key={i}>{"password " + message}</li>
      ))}
      {errors["email or password"]?.map((message, i) => (
        <li key={i}>{"email or password " + message}</li>
      ))}
    </ul>
  );
}
