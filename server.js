// ESM
import Fastify from "fastify";
import FastifyVite from "@fastify/vite";
import { renderToString } from "vue/server-renderer";
import fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const main = async (dev) => {
  const fastify = Fastify({
    logger: true,
  });

  await fastify.register(FastifyVite, {
    dev: process.argv.includes("--dev"),
    root: import.meta.url,
    clientModule: path.join(__dirname, "src", "index.js"),
    createRenderFunction({ createApp }) {
      return () => {
        return {
          element: renderToString(createApp()),
        };
      };
    },
  });

  fastify.setErrorHandler((err, req, reply) => {
    console.error(err);
    reply.send(err);
  });

  await fastify.vite.ready();

  fastify.get("*", async (req, res) => {
    // const filename = path.join(__dirname, "src", "index.html");
    // fs.readFile(filename, (err, template) => {
    //   if (err) {
    //     return res.send(err);
    //   } else {
    //     return res.type("text/html").send(template);
    //   }
    // });
    res.html(await res.render());
  });

  return fastify;
};

const start = async () => {
  const server = await main();

  try {
    await server.listen({ port: 3000 });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
start();
