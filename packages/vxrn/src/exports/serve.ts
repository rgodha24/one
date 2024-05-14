import { createServer } from 'node:http'
import sirv from 'sirv'
import type { VXRNConfig } from '../types'
import { getOptionsFilled } from '../utils/getOptionsFilled'
import { createApp, defineEventHandler, toNodeListener } from 'h3'

export const serve = async (optionsIn: VXRNConfig) => {
  const options = await getOptionsFilled(optionsIn)
  const app = createApp()
  // in prod default to 3000 not 8081
  const port = optionsIn.port ?? 3000

  const sirvStaticMiddleware = sirv('dist/static', {
    gzip: true,
  })

  if (options.serve) {
    options.serve(options, app)
  }

  app.use(
    defineEventHandler(async ({ node: { req, res } }) => {
      await new Promise<void>((response) => {
        sirvStaticMiddleware(req, res, () => {
          response()
        })
      })
    })
  )

  const sirvMiddleware = sirv('dist/client', {
    gzip: true,
  })

  app.use(
    defineEventHandler(async ({ node: { req, res } }) => {
      await new Promise<void>((response) => {
        sirvMiddleware(req, res, () => {
          response()
        })
      })
    })
  )

  const server = createServer(toNodeListener(app))
  server.listen(port)
  console.info(`Listening on http://localhost:${port}`)

  await new Promise<void>((res) => {
    server.on('close', () => {
      res()
    })
  })
}
