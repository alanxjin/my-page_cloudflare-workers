class LinksTransformer {
    constructor(links) {
        this.links = links
    }

    async element(element) {
        const linksHtmlString = this.links
            .map(({ name, url }) => `<a href="${url}">${name}</a>`)
            .join('')
        element.setInnerContent(linksHtmlString, { html: true })
    }
}

class ProfileHandler {
    async element(element) {
        element.setAttribute('style', '')
    }
}
class AvatarHandler {
    async element(element) {
        element.setAttribute(
            'src',
            'https://avatars1.githubusercontent.com/u/12853691'
        )
    }
}

class UsernameHandler {
    async element(element) {
        element.setInnerContent('alanxjin')
    }
}

class SocialHandler {
    constructor() {
        this.socials = [
            {
                name: 'github',
                url: 'https://github.com/alanxjin',
                svg: 'https://simpleicons.org/icons/github.svg',
            },
            {
                name: 'linkedin',
                url: 'https://www.linkedin.com/in/alanxjin/',
                svg: 'https://simpleicons.org/icons/linkedin.svg',
            },
        ]
    }
    async element(element) {
        element.setAttribute('style', '')
        const socialsHtmlString = this.socials
            .map(
                ({ name, url, svg }) =>
                    `<a href="${url}"><img src=${svg} alt="${name}"/></a>`
            )
            .join('')

        element.setInnerContent(socialsHtmlString, { html: true })
    }
}

class TitleHandler {
    async element(element) {
        element.setInnerContent('Alan Jin')
    }
}

class BodyHandler {
    async element(element) {
        element.setAttribute('class', 'bg-teal-900')
    }
}

module.exports = {
    LinksTransformer,
    ProfileHandler,
    AvatarHandler,
    UsernameHandler,
    SocialHandler,
    TitleHandler,
    BodyHandler,
}
