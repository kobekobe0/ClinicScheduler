import { GraphQLError } from "graphql";

const globalErrorHandling = (code, customMessage) => {
  switch (code) {
    case "TRYCATCHERROR":
      break;
    case "FORBIDDEN":
      throw new GraphQLError("You are not authorized to perform this action.", {
        extensions: {
          code: "FORBIDDEN",
        },
      });
      break;

    default:
      throw new GraphQLError("You are not authorized to perform this action.", {
        extensions: {
          code: "FORBIDDEN",
        },
      });
      break;
  }
};
