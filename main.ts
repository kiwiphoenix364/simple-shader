//% icon="\uf185"
//% color="#224a7c"
//% block="Simple Shader"
//% groups='["Shader Pack","Shader","Attached Items","Lite Shader","Advanced"]'
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
    //% block="shader $shader layer image"
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
    //% block="shader $shader set shader layer image $layer"
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
    //% block="shader $shaderLayer attached image $image to sprite $sprite || offset x $xOffset offset y $yOffset"
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
    //% block="shader $shaderLayer attached circle to sprite $sprite with tint $tint radius $radius || flux $flux smoothness $smoothness | offset x $xOffset offset y $yOffset"
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
    //% block="shader $shaderLayer attached circle to map location x $x y $y with tint $tint radius $radius || flux $flux smoothness $smoothness"
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
    export function createLiteShader(singlePalette: number[], autoRefreshLayer: boolean, zLayer = 0) {
        return new SS_LiteShader(Buffer.fromArray(singlePalette), autoRefreshLayer, zLayer)
    }
    //% block="lite shader $shader layer image"
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
    //% block="lite shader $shader set shader layer image $layer"
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
class SS_ShaderPack {
    public colorNames: string[]
    public shaderColorSets: number[][]
    constructor(colorNames: string[], shaderColorSets: number[][]) {
        this.colorNames = colorNames
        this.shaderColorSets = shaderColorSets
    }
    public unpack() {
        //let buf = Buffer.create(16)
        //for (let i = 0; i < this.shaderColorSets.length; i++) {
        //    buf = buf.concat(this.shaderColorSets[i])
        //}
        let buf: Buffer = Buffer.fromArray([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15])
        for (let i = 0; i < this.shaderColorSets.length; i++) {
            buf = buf.concat(Buffer.fromArray(this.shaderColorSets[i]))
        }
        return buf
    }
    public getTintIdx(name: string) {
        return this.colorNames.indexOf(name) + 1
    }
    public getShaderShade(name: string) {
        return Buffer.fromArray(this.shaderColorSets[this.colorNames.indexOf(name)])
    }
    public destroy() {
        this.colorNames = this.shaderColorSets = null
    }
    static getShader(shader: string) {
        //reference for shader pack format
        //color sets and color set names are in respective orders in their arrays
        //shader arrays go in order of colors on the screen, so the fifth item in the array ([4]) will be color four
        let packNames = ["default"]
        let packs = [
            new SS_ShaderPack(
                ["light", "light2", "dark", "dark2", "yellow", "yellow2", "red", "green", "blue", "purple"],
                [
                    [0, 1, 4, 1, 5, 1, 7, 5, 9, 1, 11, 1, 10, 1, 2, 12],
                    [0, 1, 5, 1, 1, 1, 5, 1, 1, 1, 1, 1, 11, 1, 4, 10],
                    [0, 13, 14, 2, 2, 7, 8, 6, 12, 6, 12, 12, 15, 14, 15, 15],
                    [0, 14, 15, 14, 14, 6, 12, 8, 15, 8, 15, 15, 15, 15, 15, 15],
                    [0, 13, 4, 4, 5, 5, 7, 5, 6, 13, 11, 13, 11, 5, 13, 14],
                    [0, 5, 5, 5, 5, 5, 5, 5, 7, 5, 13, 5, 13, 5, 5, 13],
                    [0, 3, 2, 2, 2, 4, 11, 4, 10, 11, 2, 2, 10, 4, 2, 14],
                    [0, 5, 4, 13, 5, 7, 7, 7, 6, 6, 12, 7, 7, 7, 5, 8],
                    [0, 9, 10, 11, 12, 6, 8, 6, 8, 8, 12, 8, 8, 9, 12, 8],
                    [0, 11, 10, 10, 11, 4, 10, 12, 10, 11, 10, 10, 10, 11, 12, 12]
                ]
            )
        ]

        //for generating the "2" varients
        //let test = []
        //let sample = [0, 1, 4, 1, 5, 1, 7, 5, 9, 1, 11, 1, 10, 1, 2, 12]
        //for (let j = 0; j < 16; j++) {
        //    test.push(sample[sample[j]])
        //}
        return packs[packNames.indexOf(shader)]
    }
}
class SS_Shader {
    //Declare initial variables
    //lookup table
    //lkupx16: Buffer
    //Shader pack
    public refreshShaderLayer: boolean
    //Decompiled shader pack
    protected decompShader: Buffer
    //Shader augment image
    public shaderLayer: Image
    //zValue
    protected zValue: number
    //Renderable for shader
    private shader: scene.Renderable
    protected updater: control.FrameCallback
    constructor(currentPack: SS_ShaderPack, refreshShaderLayer = true, zValue = 0) {
        /*
        //build lookup table
        this.lkupx16 = Buffer.create(16)
        for (let i = 0; i < 16; i++) {
            this.lkupx16[i] = (i * 16)
        }
        */
        this.refreshShaderLayer = refreshShaderLayer
        this.zValue = zValue
        //Unpack SS_Shaderpack
        this.decompShader = currentPack.unpack()
        //create buffer image
        this.shaderLayer = image.create(scene.screenWidth(), scene.screenHeight())
        this.runShader()
        this.updateShaderLayer()
    }
    protected runShader() {
        this.shader = scene.createRenderable(this.zValue, (screenImg: Image, camera: scene.Camera) => {
            this.shadeImg(screenImg)
        })
    }
    protected shadeImg(img: Image) {
        let shaderBuf = Buffer.create(Math.imul(img.width, img.height))
        let renderBuf = Buffer.create(Math.imul(img.width, img.height))
        let decompShader = Buffer.create(0).concat(this.decompShader)
        img.getRows(0, renderBuf)
        this.shaderLayer.getRows(0, shaderBuf)
        let x = Math.imul(img.width, img.height)
        let y = 0
        while (y < x) {
            renderBuf[y] = decompShader[renderBuf[y] | shaderBuf[y] << 4];
            //this.renderBuf[y] = this.decompShader[this.renderBuf[y]];
            //this.renderBuf[x] = this.decompShader[this.renderBuf[x] | this.shaderBuf[x] << 4];
            //this.shaderBuf[x] ? this.renderBuf[x] = this.decompShader[this.renderBuf[x] | this.shaderBuf[x] << 4] : null;
            //use alternate compilation format
            //this.renderBuf[y] = (this.decompShader[this.renderBuf[y] + Math.imul(this.shaderBuf[y], 16)])
            //alt comp format + lookup table
            //this.renderBuf[y] = (this.decompShader[this.renderBuf[y] + this.lkupx16[this.shaderBuf[y]]])
            y++
        }
        img.setRows(0, renderBuf)
    }
    protected updateShaderLayer() {
        this.updater = game.currentScene().eventContext.registerFrameHandler(17, () => {
            if (this.refreshShaderLayer === true) {
                this.shaderLayer.fill(0)
            }
        })
    }
    public setNewShader(shader: SS_ShaderPack) {
        this.decompShader = shader.unpack()
    }
    /*
    //alt function
    directSetUnpackedShader(array: Buffer) {
        this.decompShader = shader
    }
    */
    public directSetUnpackedShader(shader: Buffer) {
        this.decompShader = shader
    }
    static toScreenX(x: number) {
        return x - scene.cameraProperty(CameraProperty.Left)
    }
    static toScreenY(y: number) {
        return y - scene.cameraProperty(CameraProperty.Top)
    }
    public destroy() {
        this.shader.destroy()
        game.currentScene().eventContext.unregisterFrameHandler(this.updater)
        this.refreshShaderLayer = this.decompShader = this.shaderLayer = this.zValue = this.updater = null
    }
}
class SS_ImgAttachSprite {
    public sprite: Sprite
    public image: Image
    public shaderLayer: Image
    public xOffset: number
    public yOffset: number
    protected x: number
    protected y: number
    protected left: number
    protected top: number
    protected right: number
    protected bottom: number
    protected updater: control.FrameCallback
    constructor(shaderLayer: Image, sprite: Sprite, image: Image, xOffset = 0, yOffset = 0) {
        this.sprite = sprite
        this.xOffset = xOffset
        this.yOffset = yOffset
        this.shaderLayer = shaderLayer
        this.image = image
        this.updateShaderPos()
        this.sprite.onDestroyed(() => {
            this.destroy()
        })
    }
    protected updateShaderPos() {
            this.updater = game.currentScene().eventContext.registerFrameHandler(24, () => {
                this.updateFunction()
            })
    }
    protected updateFunction() {
        this.x = this.sprite.x + this.xOffset
        this.y = this.sprite.y + this.yOffset
        this.left = this.x - (this.image.width >> 1)
        this.top = this.y - (this.image.height >> 1)
        this.right = this.left + this.image.width
        this.bottom = this.top + this.image.height
        if (SS_Shader.toScreenX(this.left) < scene.screenWidth() && SS_Shader.toScreenX(this.right) > 0 && SS_Shader.toScreenY(this.top) < scene.screenHeight() && SS_Shader.toScreenY(this.bottom) > 0) {
            this.shaderLayer.drawTransparentImage(this.image, SS_Shader.toScreenX(this.left), SS_Shader.toScreenY(this.top))
            //helpers.imageBlit(this.shader.shaderLayer, SS_Shader.toScreenX(this.left), SS_Shader.toScreenY(this.top), this.image.width, this.image.height, this.image, 0, 0, this.image.width, this.image.height, true, false)
        }
    }
    public destroy() {
        game.currentScene().eventContext.unregisterFrameHandler(this.updater)
        this.shaderLayer = this.sprite = this.image = this.x = this.y = this.left = this.top = this.right = this.bottom = this.xOffset = this.yOffset = this.updater = null
    }
}
class SS_CircleAttachSprite {
    public sprite: Sprite
    public shaderLayer: Image
    public tint: number
    public radius: number
    private currentRad: number
    public flux: number
    public smoothness: number
    public xOffset: number
    public yOffset: number
    protected updater: control.FrameCallback
    constructor(shaderLayer: Image, sprite: Sprite, xOffset = 0, yOffset = 0, tint = 1, radius = 5, flux = 0, smoothness = 1) {
        this.sprite = sprite
        this.xOffset = xOffset
        this.yOffset = yOffset
        this.shaderLayer = shaderLayer
        this.tint = tint
        this.radius = radius
        this.currentRad = this.radius
        this.flux = flux
        this.smoothness = smoothness
        this.updateLightSource()
        this.sprite.onDestroyed(() => {
            this.destroy()
        })
    }
    protected updateLightSource() {
        this.updateFunction()
    }
    protected updateFunction() {
        this.updater = game.currentScene().eventContext.registerFrameHandler(24, () => {
            if (SS_Shader.toScreenX(this.sprite.x - this.currentRad + this.xOffset) < scene.screenWidth() && SS_Shader.toScreenX(this.sprite.x + this.currentRad + this.xOffset) > 0 && SS_Shader.toScreenY(this.sprite.y - this.currentRad + this.yOffset) < scene.screenHeight() && SS_Shader.toScreenY(this.sprite.y + this.currentRad + this.yOffset) > 0) {
                if (this.smoothness != 0) {
                    this.updateFlux()
                }
                this.shaderLayer.fillCircle(SS_Shader.toScreenX(this.sprite.x) + this.xOffset, SS_Shader.toScreenY(this.sprite.y) + this.yOffset, Math.round(this.currentRad), this.tint)
            }
        })
    }
    protected updateFlux() {
        this.smoothness = Math.constrain(this.smoothness, Math.abs(this.flux) * -2, Math.abs(this.flux) * 2)
        this.currentRad += Math.randomRange(0 - this.smoothness, this.smoothness)
        //this.currentRad = Math.constrain(this.currentRad, this.radius + this.flux, this.radius - this.flux)
        if (this.currentRad > this.radius + this.flux || this.currentRad < this.radius - this.flux) {
            this.currentRad -= this.currentRad - (this.radius + this.flux)
        }
    }
    public destroy() {
        game.currentScene().eventContext.unregisterFrameHandler(this.updater)
        this.sprite = this.tint = this.radius = this.currentRad = this.flux = this.smoothness = this.xOffset = this.yOffset = this.updater = this.shaderLayer = null
    }
}
class SS_ImgAttachMap {
    public shaderLayer: Image
    public image: Image
    protected x: number
    protected y: number
    protected left: number
    protected top: number
    protected right: number
    protected bottom: number
    protected updater: control.FrameCallback
    constructor(shaderLayer: Image, image: Image, x: number, y: number) {
        this.x = x
        this.y = y
        this.shaderLayer = shaderLayer
        this.image = image
        this.left = this.x - this.image.width >> 1
        this.top = this.y - this.image.height >> 1
        this.right = this.left + this.image.width
        this.bottom = this.top + this.image.height
        this.updateTile()
    }
    public setX(x: number) {
        this.x = x
        this.left = this.x - (this.image.width >> 1)
        this.right = this.left + this.image.width
    }
    public setY(y: number) {
        this.y = y
        this.top = this.y - (this.image.height >> 1)
        this.bottom = this.top + this.image.height
    }
    public setPos(x: number, y: number) {
        this.x = x
        this.left = this.x - (this.image.width >> 1)
        this.right = this.left + this.image.width
        this.y = y
        this.top = this.y - (this.image.height >> 1)
        this.bottom = this.top + this.image.height
    }
    public setLeft(left: number) {
        this.left = left
        this.x = this.left + (this.image.width >> 1)
        this.right = this.left + this.image.width
    }
    public setTop(top: number) {
        this.top = top
        this.y = this.top + (this.image.height >> 1)
        this.bottom = this.top + this.image.height
    }
    public setRight(right: number) {
        this.right = right
        this.left = this.right - this.image.width
        this.x = this.left + (this.image.width >> 1)
    }
    public setBottom(bottom: number) {
        this.bottom = bottom
        this.top = this.bottom - this.image.height
        this.y = this.top + (this.image.height >> 1)
    }
    protected updateTile() {
        this.updater = game.currentScene().eventContext.registerFrameHandler(23, () => {
            this.updateFunction()
        })
    }
    protected updateFunction() {
        if (SS_Shader.toScreenX(this.left) < scene.screenWidth() && SS_Shader.toScreenX(this.right) > 0 && SS_Shader.toScreenY(this.top) < scene.screenHeight() && SS_Shader.toScreenY(this.bottom) > 0) {
            this.shaderLayer.drawTransparentImage(this.image, SS_Shader.toScreenX(this.left), SS_Shader.toScreenY(this.top))
            //helpers.imageBlit(this.shader.shaderLayer, SS_Shader.toScreenX(this.left), SS_Shader.toScreenY(this.top), this.image.width, this.image.height, this.image, 0, 0, this.image.width, this.image.height, true, false)
        }
    }
    public destroy() {
        game.currentScene().eventContext.unregisterFrameHandler(this.updater)
        this.image = this.x = this.y = this.left = this.top = this.right = this.bottom = this.updater = this.shaderLayer = null
    }
}
class SS_CircleAttachMap {
    public shaderLayer: Image
    public tint: number
    public radius: number
    private currentRad: number
    public flux: number
    public smoothness: number
    public x: number
    public y: number
    protected updater: control.FrameCallback
    constructor(shaderLayer: Image, x: number, y: number, tint = 1, radius = 5, flux = 0, smoothness = 1) {
        this.x = x
        this.y = y
        this.shaderLayer = shaderLayer
        this.tint = tint
        this.radius = radius
        this.currentRad = this.radius
        this.flux = flux
        this.smoothness = smoothness
        this.updateLightSource()
    }
    protected updateLightSource() {
        this.updateFunction()
    }
    protected updateFunction() {
        this.updater = game.currentScene().eventContext.registerFrameHandler(24, () => {
            if (SS_Shader.toScreenX(this.x - this.currentRad) < scene.screenWidth() && SS_Shader.toScreenX(this.x + this.currentRad) > 0 && SS_Shader.toScreenY(this.y - this.currentRad) < scene.screenHeight() && SS_Shader.toScreenY(this.y + this.currentRad) > 0) {
                if (this.smoothness != 0) {
                    this.updateFlux()
                }
                this.shaderLayer.fillCircle(SS_Shader.toScreenX(this.x), SS_Shader.toScreenY(this.y), Math.round(this.currentRad), this.tint)
            }
        })
    }
    protected updateFlux() {
        this.smoothness = Math.constrain(this.smoothness, Math.abs(this.flux) * -2, Math.abs(this.flux) * 2)
        this.currentRad += Math.randomRange(0 - this.smoothness, this.smoothness)
        //this.currentRad = Math.constrain(this.currentRad, this.radius + this.flux, this.radius - this.flux)
        if (this.currentRad > this.radius + this.flux || this.currentRad < this.radius - this.flux) {
            this.currentRad -= this.currentRad - (this.radius + this.flux)
        }
    }
    public destroy() {
        game.currentScene().eventContext.unregisterFrameHandler(this.updater)
        this.tint = this.radius = this.currentRad = this.flux = this.smoothness = this.x = this.y = this.updater = this.shaderLayer = null
    }
}
class SS_LiteShader {
    //Declare initial variables
    //Shader pack
    public refreshShaderLayer: boolean
    //Shader augment image
    public shaderLayer: Image
    //zValue
    protected zValue: number
    //Renderable for shader
    public shade: Buffer
    protected shader: scene.Renderable
    protected updater: control.FrameCallback
    public unusedColor: number
    constructor(singleShade: Buffer, refreshShaderLayer = true, zValue = 0) {
        this.refreshShaderLayer = refreshShaderLayer
        this.zValue = zValue
        this.shade = singleShade
        //create buffer image
        this.shaderLayer = image.create(scene.screenWidth(), scene.screenHeight())
        this.runShader()
        this.updateShaderLayer()
        this.setUnusedColor()
    }
    protected runShader() {
        this.shader = scene.createRenderable(this.zValue, (screenImg: Image, camera: scene.Camera) => {
            this.shadeImg(screenImg)
        })
    }
    protected shadeImg(img: Image) {
        let tempImg = image.create(scene.screenWidth(), scene.screenHeight())
        tempImg.copyFrom(img)
        tempImg.drawTransparentImage(this.shaderLayer, 0, 0)
        tempImg.replace(this.unusedColor, 0)
        img.mapRect(0, 0, scene.screenWidth(), scene.screenHeight(), this.shade)
        img.drawTransparentImage(tempImg, 0, 0)
    }
    protected updateShaderLayer() {
        this.updater = game.currentScene().eventContext.registerFrameHandler(17, () => {
            if (this.refreshShaderLayer === true) {
                this.shaderLayer.fill(0)
            }
        })
    }
    public setshaderLayer(shaderLayer: Image) {
        this.shaderLayer = shaderLayer
        this.shaderLayer.replace(1, this.unusedColor)
    }
    public setNewShade(shade: Buffer) {
        this.shade = shade
    }
    static toScreenX(x: number) {
        return x - scene.cameraProperty(CameraProperty.Left)
    }
    static toScreenY(y: number) {
        return y - scene.cameraProperty(CameraProperty.Top)
    }
    public setUnusedColor() {
        for (let j = 1; j < 16; j++) {
            this.shade[j] == j ? this.unusedColor = j : null;
        }
    }
    public destroy() {
        this.shader.destroy()
        game.currentScene().eventContext.unregisterFrameHandler(this.updater)
        this.refreshShaderLayer = this.shaderLayer = this.zValue = this.updater = this.shade = this.unusedColor = this.shader = null
    }
}
class SS_LiteShaderX2 extends SS_LiteShader {
    public shaderLayer2: Image
    public shade2: Buffer
    public unusedColor2: number
    public refreshShaderLayer2: boolean
    constructor(singleShade: Buffer, secondShade: Buffer, refreshShaderLayer = true, refreshShaderLayer2 = true, zValue = 0) {
        super(singleShade, refreshShaderLayer, zValue)
        this.shade2 = secondShade
        this.refreshShaderLayer2 = refreshShaderLayer
        //create buffer image
        this.shaderLayer2 = image.create(scene.screenWidth(), scene.screenHeight())
        this.setUnusedColor2()
        this.updateShaderLayer()
    }
    protected runShader() {
        this.shader = scene.createRenderable(this.zValue, (screenImg: Image, camera: scene.Camera) => {
            this.shadeImg(screenImg)
        })
    }
    protected shadeImg(img: Image) {
        let tempImg2 = image.create(scene.screenWidth(), scene.screenHeight())
        tempImg2.copyFrom(img)
        tempImg2.drawTransparentImage(this.shaderLayer, 0, 0)
        tempImg2.replace(this.unusedColor, 0)
        img.mapRect(0, 0, scene.screenWidth(), scene.screenHeight(), this.shade)
        img.drawTransparentImage(tempImg2, 0, 0)

        tempImg2.copyFrom(img)
        tempImg2.drawTransparentImage(this.shaderLayer2, 0, 0)
        tempImg2.replace(this.unusedColor2, 0)
        img.mapRect(0, 0, scene.screenWidth(), scene.screenHeight(), this.shade2)
        img.drawTransparentImage(tempImg2, 0, 0)

    }
    protected updateShaderLayer() {
        this.updater = game.currentScene().eventContext.registerFrameHandler(17, () => {
            if (this.refreshShaderLayer === true) {
                this.shaderLayer.fill(0)
            }
            if (this.refreshShaderLayer2 === true) {
                this.shaderLayer2.fill(0)
            }
        })
    }
    public setshaderLayer2(shaderLayer: Image) {
        this.shaderLayer2 = shaderLayer
        this.shaderLayer2.replace(1, this.unusedColor2)
    }
    public setNewShade2(shade2: Buffer) {
        this.shade2 = shade2
        this.setUnusedColor2()
    }
    public setUnusedColor2() {
        for (let k = 1; k < 16; k++) {
            this.shade2[k] == k ? this.unusedColor2 = k : null;
        }
    }
    public destroy() {
        this.shader.destroy()
        game.currentScene().eventContext.unregisterFrameHandler(this.updater)
        this.refreshShaderLayer = this.refreshShaderLayer2 = this.unusedColor2 = this.shaderLayer2 = this.shaderLayer = this.zValue = this.updater = this.shade = this.unusedColor = this.shader = null
    }
}
