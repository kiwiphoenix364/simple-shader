//% icon="\uf042"
//% color="#224a7c"
//% block="Simple Shader"
//% groups='["Shader Pack","Shader","Attached Items","Lite Shader","Advanced"]'
//% weight=5
namespace SS_ShaderBlocks {
    // Shader Packs
    /*
    export function getDefaultShader(shader: string) {
        return SS_ShaderPack.getShader(shader)
    }
    */
    //% block="default shader pack"
    //% weight=128
    //% group="Shader Pack"
    export function getDefaultShader() {
        return SS_ShaderPack.getShader("default")
    }
    //% block="default shader palette $palette"
    //% weight=127
    //% group="Shader Pack"
    //% picker=DefaultPalettes
    export function getDefaultPalette(palette: DefaultPalettes) {
        return SS_ShaderPack.getShader("default").shaderColorSets[palette]
    }
    //% block="custom shader with pallete names $paletteNames shader palettes $shaderPalettes"
    //% weight=126
    //% group="Shader Pack"
    //% blockSetVariable=myShaderPack
    export function newShader(paletteNames: string[], shaderPalettes: number[][]) {
        return new SS_ShaderPack(paletteNames, shaderPalettes)
    }
    export function unpackShader(shader: SS_ShaderPack) {
        return shader.unpack()
    }
    /*
    //% block="shader pack $shader get tint location from name $name"
    //% weight=90
    //% group="Advanced"
    export function tintLocFromName(shader: SS_ShaderPack, name: string) {
        return shader.getTintIdx(name)
    }
    */
    //% block="shader pack $shader get tint palette from name $name"
    //% weight=89
    //% group="Advanced"
    export function shaderPaletteFromName(shader: SS_ShaderPack, name: string) {
        return shader.shaderColorSets[shader.colorNames.indexOf(name)]
    }
    //% block="shader pack $shader get tint palette from location $loc"
    //% weight=88
    //% group="Advanced"
    export function shaderPaletteFromLoc(shader: SS_ShaderPack, loc: number) {
        return shader.shaderColorSets[loc]
    }
    export function arrayToPalette(array: number[]) {
        return Buffer.fromArray(array)
    }
    //% block="destroy shader pack $shader"
    //% weight=120
    //% group="Shader Pack"
    export function destroyShaderPack(shader: SS_ShaderPack) {
        shader.destroy()
    }

    // Shader Layers
    //% block="shader with pack $pack || auto refresh $autoRefreshLayer depth $zLayer"
    //% weight=119
    //% group="Shader"
    //% blockSetVariable=myShader
    export function newShaderLayer(pack: SS_ShaderPack, autoRefreshLayer = true, zLayer = 0) {
        return new SS_Shader(pack, autoRefreshLayer, zLayer)
    }
    //% block="shader $shader shademap"
    //% weight=118
    //% group="Shader"
    export function getShaderLayer(shader: SS_Shader) {
        return shader.shaderLayer
    }
    //% block="set shader $shader refresh $active"
    //% weight=92
    //% group="Advanced"
    export function setRefresh(shader: SS_Shader, active: boolean) {
        shader.refreshShaderLayer = active
    }
    //% block="shader $shader set new pack $pack"
    //% weight=91
    //% group="Advanced"
    export function setNewPack(shader: SS_Shader, pack: SS_ShaderPack) {
        shader.setNewShader(pack)
    }
    export function directSetNewPack(shader: SS_Shader, pack: Buffer) {
        shader.directSetUnpackedShader(pack)
    }
    //% block="shader $shader set shademap $layer"
    //% weight=115
    //% group="Shader"
    //% layer.shadow=screen_image_picker
    export function setShaderLayer(shader: SS_Shader, layer: Image) {
        shader.shaderLayer = layer
    }
    //% block="x $x to shader x"
    //% weight=94
    //% group="Advanced"
    export function mapToScreenX(x: number) {
        return SS_Shader.toScreenX(x)
    }
    //% block="y $y to shader y"
    //% weight=93
    //% group="Advanced"
    export function mapToScreenY(y: number) {
        return SS_Shader.toScreenY(y)
    }
    //% block="destroy shader $shader"
    //% weight=112
    //% group="Shader"
    export function destroyShader(shader: SS_Shader) {
        shader.destroy()
    }

    // SS_ImgAttachSprite
    //% block="shader $shaderLayer attached image $image to sprite $sprite||offset x $xOffset offset y $yOffset"
    //% weight=111
    //% group="Attached Items"
    //% blockSetVariable=myAttachedItem
    //% image.shadow=screen_image_picker
    export function imgAttachSprite(shaderLayer: SS_Shader | SS_LiteShader, sprite: Sprite, image: Image, xOffset = 0, yOffset = 0) {
        return new SS_ImgAttachSprite(shaderLayer.shaderLayer, sprite, image, xOffset, yOffset)
    }
    export function imgAttachSpriteChangeImg(imgAttachSprite: SS_ImgAttachSprite, image: Image) {
        imgAttachSprite.image = image
    }
    export function imgAttachSpriteChangeSprite(imgAttachSprite: SS_ImgAttachSprite, sprite: Sprite) {
        imgAttachSprite.sprite = sprite
    }
    /*
    export function destroyImgAttachSprite(imgAttachSprite: SS_ImgAttachSprite) {
        imgAttachSprite.destroy()
    }
    */

    // SS_CircleAttachSprite
    //% block="shader $shaderLayer attached circle to sprite $sprite with tint $tint radius $radius||flux $flux smoothness $smoothness offset x $xOffset offset y $yOffset"
    //% weight=110
    //% group="Attached Items"
    //% blockSetVariable=myAttachedItem
    export function circleAttachSprite(shaderLayer: SS_Shader | SS_LiteShader, sprite: Sprite, xOffset = 0, yOffset = 0, tint = 1, radius = 5, flux = 0, smoothness = 1) {
        return new SS_CircleAttachSprite(shaderLayer.shaderLayer, sprite, xOffset, yOffset, tint, radius, flux, smoothness)
    }
    export function setCircleAttachSpriteTint(circleAttachSprite: SS_CircleAttachSprite, tint: number) {
        circleAttachSprite.tint = tint
    }
    export function setCircleAttachSpriteRadius(circleAttachSprite: SS_CircleAttachSprite, radius: number) {
        circleAttachSprite.radius = radius
    }
    export function setCircleAttachSpriteFlux(circleAttachSprite: SS_CircleAttachSprite, flux: number) {
        circleAttachSprite.flux = flux
    }
    export function setCircleAttachSpriteSmoothness(circleAttachSprite: SS_CircleAttachSprite, smoothness: number) {
        circleAttachSprite.smoothness = smoothness
    }
    /*
    export function destroyCircleAttachSprite(circleAttachSprite: SS_CircleAttachSprite) {
        circleAttachSprite.destroy()
    }
    */

    // SS_ImgAttachMap
    //% block="shader $shaderLayer attached image $image to map location x $x y $y"
    //% weight=109
    //% group="Attached Items"
    //% blockSetVariable=myAttachedItem
    //% image.shadow=screen_image_picker
    export function imgAttachMap(shaderLayer: SS_Shader | SS_LiteShader, image: Image, x: number, y: number) {
        return new SS_ImgAttachMap(shaderLayer.shaderLayer, image, x, y)
    }
    export function imgAttachMapChangeImg(imgAttachSprite: SS_ImgAttachMap, image: Image) {
        imgAttachSprite.image = image
    }
    export function imgAttachSpriteChangeX(imgAttachSprite: SS_ImgAttachMap, xLoc: number) {
        imgAttachSprite.setX(xLoc)
    }
    export function imgAttachSpriteChangeY(imgAttachSprite: SS_ImgAttachMap, yLoc: number) {
        imgAttachSprite.setY(yLoc)
    }
    /*
    export function destroyImgAttachMap(imgAttachMap: SS_ImgAttachMap) {
        imgAttachMap.destroy()
    }
    */

    // SS_CircleAttachMap
    //% block="shader $shaderLayer attached circle to map location x $x y $y with tint $tint radius $radius||flux $flux smoothness $smoothness"
    //% weight=108
    //% group="Attached Items"
    //% blockSetVariable=myAttachedItem
    export function circleAttachMap(shaderLayer: SS_Shader | SS_LiteShader, sprite: Sprite, x: number, y: number, tint = 1, radius = 5, flux = 0, smoothness = 1) {
        return new SS_CircleAttachMap(shaderLayer.shaderLayer, x, y, tint, radius, flux, smoothness)
    }
    export function setCircleAttachMapTint(circleAttachMap: SS_CircleAttachMap, tint: number) {
        circleAttachMap.tint = tint
    }
    export function setCircleAttachMapRadius(circleAttachMap: SS_CircleAttachMap, radius: number) {
        circleAttachMap.radius = radius
    }
    export function setCircleAttachMapFlux(circleAttachMap: SS_CircleAttachMap, flux: number) {
        circleAttachMap.flux = flux
    }
    export function setCircleAttachMapSmoothness(circleAttachMap: SS_CircleAttachMap, smoothness: number) {
        circleAttachMap.smoothness = smoothness
    }
    /*
    export function destroyCircleAttachMap(circleAttachMap: SS_CircleAttachMap) {
        circleAttachMap.destroy()
    }
    */

    // Destroy
    //% block="destroy attached item $itemAttachMap"
    //% weight=107
    //% group="Attached Items"
    export function destroyAttachedItem(itemAttachMap: SS_CircleAttachMap | SS_CircleAttachSprite | SS_ImgAttachMap | SS_ImgAttachSprite) {
        itemAttachMap.destroy()
    }

    // SS_LiteShader
    //% block="lite shader with palette $singlePalette || auto refresh $autoRefreshLayer depth $zLayer"
    //% weight=106
    //% group="Lite Shader"
    //% blockSetVariable=myLiteShader
    export function createLiteShader(singlePalette: number[], autoRefreshLayer = true, zLayer = 0) {
        return new SS_LiteShader(Buffer.fromArray(singlePalette), autoRefreshLayer, zLayer)
    }
    //% block="lite shader $shader shademap"
    //% weight=105
    //% group="Lite Shader"
    export function liteGetShaderLayer(lShader: SS_LiteShader) {
        return lShader.shaderLayer
    }
    //% block="lite shader $shader uc"
    //% weight=104
    //% group="Lite Shader"
    export function liteGetUnusedColor(lShader: SS_LiteShader) {
        return lShader.unusedColor
    }
    //% block="image $image replace color $color with uc of shader $lShader"
    //% weight=103
    //% group="Lite Shader"
    //% image.shadow=screen_image_picker
    export function liteReplaceWithUnusedColor(image: Image, color = 1, lShader: SS_LiteShader) {
        let clone = image.clone()
        clone.replace(color, lShader.unusedColor)
        return clone
    }
    //% block="lite shader $shader refresh $active"
    //% weight=85
    //% group="Advanced"
    export function liteSetRefresh(lShader: SS_LiteShader, active: boolean) {
        lShader.refreshShaderLayer = active
    }
    //% block="lite shader $lShader set new palette $palette"
    //% weight=84
    //% group="Advanced"
    export function liteSetNewSinglePalette(lShader: SS_LiteShader, palette: number[]) {
        lShader.setNewShade(Buffer.fromArray(palette))
        lShader.setUnusedColor()
    }
    //% block="lite shader $shader set shademap $layer"
    //% weight=101
    //% group="Lite Shader"
    //% layer.shadow=screen_image_picker
    export function liteSetShaderLayer(lShader: SS_LiteShader, layer: Image) {
        lShader.shaderLayer = layer
    }
    export function liteSetUnusedColor(lShader: SS_LiteShader) {
        lShader.setUnusedColor()
    }
    //% block="destroy lite shader $lShader"
    //% weight=100
    //% group="Lite Shader"
    export function liteDestroyShader(lShader: SS_LiteShader) {
        lShader.destroy()
    }

    // SS_LiteShaderX2
    export function createLiteShaderX2(singlePalette: number[], singlePalette2: number[], autoRefreshLayer = true, autoRefreshLayer2 = true, zLayer = 0) {
        return new SS_LiteShaderX2(Buffer.fromArray(singlePalette), Buffer.fromArray(singlePalette2), autoRefreshLayer, autoRefreshLayer2, zLayer)
    }
    export function liteGetShaderLayer2(lShaderX2: SS_LiteShaderX2) {
        return lShaderX2.shaderLayer2
    }
    export function liteGetUnusedColor2(lShaderX2: SS_LiteShaderX2) {
        return lShaderX2.unusedColor2
    }
    export function liteSetNewSinglePalette2(lShaderX2: SS_LiteShaderX2, palette2: Buffer) {
        lShaderX2.setNewShade2(palette2)
    }
    export function liteSetShaderLayer2(lShaderX2: SS_LiteShaderX2, layer2: Image) {
        lShaderX2.shaderLayer2 = layer2
    }
    export function liteSetUnusedColor2(lShaderX2: SS_LiteShaderX2) {
        lShaderX2.setUnusedColor2()
    }
    export function liteDestroyShaderX2(lShaderX2: SS_LiteShader) {
        lShaderX2.destroy()
    }
}
enum DefaultPalettes {
    //% block="light"
    Light,
    //% block="light2"
    Light2,
    //% block="dark"
    Dark,
    //% block="dark2"
    Dark2,
    //% block="yellow"
    Yellow,
    //% block="yellow2"
    Yellow2,
    //% block="red"
    Red,
    //% block="green"
    Green,
    //% block="blue"
    Blue,
    //% block="purple"
    Purple
}