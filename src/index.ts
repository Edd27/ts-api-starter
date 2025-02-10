import { ENV } from "./config/env";
import { server } from "./config/http";

function bootstrap() {
  const PORT = ENV.PORT;
  const HOST = ENV.HOST;
  const NODE_ENV = ENV.NODE_ENV || "development";

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
