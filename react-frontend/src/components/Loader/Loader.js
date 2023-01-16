import { CSSProperties } from "react";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
const override: CSSProperties = {
  textAlign: "center",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "100vh",
};

const Loader = () => {
  return (
    <div>
      <ClimbingBoxLoader color="#8672fb" cssOverride={override} />
    </div>
  );
};

export default Loader;
