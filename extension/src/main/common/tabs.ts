import * as browser from 'webextension-polyfill'

export async function createTabWithUrl(url: string) {
    await browser.tabs.create({ url })
}
