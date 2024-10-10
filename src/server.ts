import { Application, Router, Context } from "@oak/oak";
import { Ratelimit } from "@unkey/ratelimit";

// Load environment variables from `.env`
const rootKey = Deno.env.get("UNKEY_ROOT_KEY");
const port = Deno.env.get("PORT") || 8000;

if (!rootKey) {
  throw new Error("UNKEY_ROOT_KEY is not set");
}

// Configure rate limiting with Unkey
const limiter = new Ratelimit({
  namespace: "deno-example",
  limit: 2,
  duration: "30s",
  rootKey: rootKey,
});

// Create a new Oak application
const app = new Application();
const router = new Router();

// Home route
router.get("/", (context: Context) => {
  context.response.body =
    "Welcome to Deno & Oak Server with rate limiting by unkey";
});

// Protected route with rate limiting
router.get("/secret", async (context: Context) => {
  const identifier = context.request.ip; // Replace with your own identifier logic

  const ratelimit = await limiter.limit(identifier);
  if (!ratelimit.success) {
    context.response.status = 429;
    context.response.body = "Please try again later";
    return;
  }

  context.response.status = 200;
  context.response.body = "ok";
});

// Use the router middleware
app.use(router.routes());
app.use(router.allowedMethods());

// Start the server
console.log(`Server is running on http://localhost:${port}`);
await app.listen({ port: Number(port) });
