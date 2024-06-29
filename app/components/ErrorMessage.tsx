import { Text } from "@radix-ui/themes";
import { PropsWithChildren } from "react";


const ErrorMessage = ({children }: PropsWithChildren) => {
  return (
    <>
      {children ? (
        <Text color="red" as="p">
          {children}
        </Text>
      ) : null}
    </>
  );
};

export default ErrorMessage;
