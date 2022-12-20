import { useContext } from "react";
import { Navigate, Route } from "react-router-dom";

import AuthContext from "./store/auth-context";

const PrivateRoute = (props) => {
  const authCtx = useContext(AuthContext);

  return (
    <Route path={props.path} exact>
        {authCtx.isLoggedIn ? props.children : <Navigate to='/auth' replace/>}
    </Route>
  );
};

export default PrivateRoute;