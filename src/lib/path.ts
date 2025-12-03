import { getLogger } from "@logtape/logtape";
import logger from "./logging";

const getPath = async (pageFn: unknown): Promise<string> => (await pageFn()).url;

/**
 * filePath could be entered without extension
 * Extensions evaluated will be in this order:
 * astro, md, html, ts, js
 * 
 * @param pageFilePath FilePath of a page route
 * @returns Returns full path of route
 */
export const getPagePath = async (pageFilePath: string): Promise<string | undefined> => {

    const pages = Object.fromEntries(
        Object.entries(
            import.meta.glob("/src/pages/**/*"))
            .map(([key, val]: [string, object]) => [key.replace("/src/pages/", ''), val])
    );
    const extensions = [
        "astro",
        "md",
        "html",
        "ts",
        "js",
    ]
    // console.log((await pages[pageFilePath]()).url)

    if (pages[pageFilePath])
        return await getPath(pages[pageFilePath]);

    const regex = new RegExp(`\\.(${extensions.join("|")})$`);
    
    const pagesWithoutExtension = Object.keys(pages).map(e => e.replace(regex, ''));
    logger.debug`${{regex}}`
    logger.debug`${{pagesWithoutExtension}}`
    if (!pagesWithoutExtension.includes(pageFilePath)
    ) return undefined;


    const extension = extensions.find(e => pages[`${pageFilePath}.${e}`])
    logger.debug`${{extension}}`
    return await getPath(pages[`${pageFilePath}.${extension}`])
}

export const getPages = async (): Promise<string[]> => {

    const pages = await import.meta.glob("/src/pages/**/*");
    logger.debug`${await getPath(Object.values(pages)[0])}`
    return await Promise.all(Object.values(pages).map(async p => await getPath(p)))
}