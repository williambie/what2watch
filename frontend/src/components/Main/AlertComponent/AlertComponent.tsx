import { Alert, AlertIcon, AlertTitle } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

// AlertComponent is a component that displays an alert message
const AlertComponent = () => {
  const { message, status } = useSelector((state: RootState) => state.alert);

  // If there is a message, display it
  return message ? (
    <Alert
      status={status}
      variant="solid"
      mb={4}
      borderRadius="md"
      position="fixed"
      top={0}
      left={0}
      width="100%"
      zIndex={9999}
    >
      <AlertIcon />
      <AlertTitle>{message}</AlertTitle>
    </Alert>
  ) : null;
};

export default AlertComponent;
