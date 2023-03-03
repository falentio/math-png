import { serve } from "std/http/mod.ts"
import { Hono } from "hono"
import { render } from "resvg"

const app = new Hono()
app.get("/health", c => c.text("ok"))
app.get("/", async c => {
	const { tex } = c.req.query()
	const url = new URL("https://math.vercel.app")
	url.searchParams.set("from", tex)
	const res = await fetch(url.href)
	const svg = await res.text()
	const png = await render(svg)
	return new Response(png, {
		headers: {
			"content-type": "image/png",
		}
	})
})
serve(app.fetch)