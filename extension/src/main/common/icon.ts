import { action } from 'webextension-polyfill'
import { ExtensionResource, getResourceUrl } from './runtime'
import { getAppStatus } from './appStatus'
import { getJobCount } from '../popup/dataReader'
import { BadgeIconName } from '../shared/userProfile'

async function setBadgeText() {
    await action.setBadgeText({ text: 'x' })
}

async function setBadgeIcon(iconName: BadgeIconName) {
    await action.setIcon({
        path: {
            16: getResourceUrl(
                `assets/icons/${iconName}16.png` as ExtensionResource,
            ),
            32: getResourceUrl(
                `assets/icons/${iconName}32.png` as ExtensionResource,
            ),
            48: getResourceUrl(
                `assets/icons/${iconName}48.png` as ExtensionResource,
            ),
            128: getResourceUrl(
                `assets/icons/${iconName}128.png` as ExtensionResource,
            ),
        },
    })
}

export async function updateBadge(jobCount?: number) {
    if (!jobCount) {
        jobCount = await getJobCount()
    }
    const appStatus = await getAppStatus(jobCount)
    await setBadgeIcon(appStatus.badgeIcon)
}
