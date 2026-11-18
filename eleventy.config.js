import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";

export default function (eleventyConfig) {
    eleventyConfig.addPlugin(syntaxHighlight);
    
    eleventyConfig.addPassthroughCopy({ "src/lib/styles": "styles" });
    eleventyConfig.addPassthroughCopy({ "src/assets": "." });

    return {
        dir: {
            input: "src",
            includes: "_includes",
            output: "_site"
        },
        templateFormats: ["md", "njk"],
        markdownTemplateEngine: "njk",
        htmlTemplateEngine: "njk"
    };
}