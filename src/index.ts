import "./config/env";
import { server } from "./config/http";

function bootstrap() {
  const PORT = process.env.PORT || 3000;
  const HOST = process.env.HOST || "localhost";
  const NODE_ENV = process.env.NODE_ENV || "development";

  const onCloseSignal = () => {
    server.close(() => {
      process.exit();
    });
    setTimeout(() => process.exit(1), 10000).unref();
  };

  server.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server (${NODE_ENV}) running on port http://${HOST}:${PORT}`);
  });

  process.on("SIGINT", onCloseSignal);
  process.on("SIGTERM", onCloseSignal);
}

bootstrap();
