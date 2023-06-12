import $ from 'jquery'
import { ExtensionResource, getResourceUrl } from '../common/runtime'
import { getLocalStorage, getSyncStorage } from '../common/storage'
import {
    LocalStorageMetadataKeys,
    UserSyncStorageKeys,
} from '../shared/userProfile'
import { getJobCount } from '../popup/dataReader'

async function main() {
    const jobCount = await getJobCount()
    const lastSuccessfulScrapeAt = (
        await getLocalStorage(LocalStorageMetadataKeys.SCRAPE_AT)
    )[LocalStorageMetadataKeys.SCRAPE_AT]
    const lastScrapeAt = (
        await getSyncStorage(UserSyncStorageKeys.LAST_SCRAPE_INITIATED_AT)
    )[UserSyncStorageKeys.LAST_SCRAPE_INITIATED_AT]
    if (
        !lastSuccessfulScrapeAt &&
        lastScrapeAt === undefined &&
        jobCount <= 0
    ) {
        $.get(
            getResourceUrl(ExtensionResource.HelperContainer),
            function (data) {
                $($.parseHTML(data)).insertAfter($('main .orbisModuleHeader'))

                // not using dashboard anymore in favour of setup screen
                // $.get(getResourceUrl(ExtensionResource.Dashboard), function (data_content) {
                //     const html = $.parseHTML(data_content)
                //     const node = $(html)
                //     // @ts-ignore
                //     $('#ck_content_container').replaceWith(node) // ts thinks node is an array of nodes but it isn't
                // })

                $.get(
                    getResourceUrl(ExtensionResource.Setup),
                    function (data_content) {
                        const html = $.parseHTML(data_content)
                        const node = $(html)
                        // @ts-ignore
                        $('#ck_content_container').replaceWith(node) // ts thinks node is an array of nodes but it isn't

                        $('#ck_wave-logo-img').attr(
                            'src',
                            getResourceUrl(ExtensionResource.WaveLogo),
                        )
                        $('#ck_wave-logo-toolbar-img').attr(
                            'src',
                            getResourceUrl(ExtensionResource.WaveLogoToolbar),
                        )

                        $('#ck_outer').on('click', async function () {
                            $('#ck_outer').hide()
                        })

                        $('#ck_display').on('click', async function (e) {
                            e.stopPropagation()
                        })
                    },
                )
            },
        )
    }
}

main().then()
