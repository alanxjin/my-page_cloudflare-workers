const Router = require('./router')
const {
    LinksTransformer,
    ProfileHandler,
    AvatarHandler,
    UsernameHandler,
    SocialHandler,
    TitleHandler,
    BodyHandler,
} = require('./elementHandlers')

const links = [
    { name: 'Github', url: 'https://github.com/alanxjin' },
    { name: 'Linkedin', url: 'https://www.linkedin.com/in/alanxjin/' },
    { name: 'Instagram', url: 'https://www.instagram.com/alanxjin/' },
]

addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})

function linksHandler() {
    const init = {
        headers: { 'content-type': 'application/json' },
    }
    const body = JSON.stringify(links)
    return new Response(body, init)
}

async function pageHandler() {
    const init = {
        headers: { 'content-type': 'text/html' },
    }
    const response = await fetch(
        'https://static-links-page.signalnerve.workers.dev'
    )
    return new HTMLRewriter()
        .on('div#links', new LinksTransformer(links))
        .on('div#profile', new ProfileHandler())
        .on('img#avatar', new AvatarHandler())
        .on('h1#name', new UsernameHandler())
        .on('div#social', new SocialHandler())
        .on('title', new TitleHandler())
        .on('body', new BodyHandler())
        .transform(response)
}

async function handleRequest(request) {
    const r = new Router()
    r.get('.*/links', () => linksHandler())
    r.get('.*/*', () => pageHandler()) // return a html page for other path
    const resp = await r.route(request)
    return resp
}
